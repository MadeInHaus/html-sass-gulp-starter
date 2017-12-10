const gulp = require('gulp');
let settings = require('../config').settings;
const s3 = require('s3');
const _ = require('lodash');
const Slack = require('node-slack');

const gitUserInfo = require('../util/gitUserInfo');

const flags = require('minimist')(process.argv.slice(2));
const isProd = flags.production || flags.prod || false;
const isQA = flags.qa || false;
const isStaging = flags.staging || flags.stage || false;
const isDev = flags.development || flags.dev || false;

const env = _.find([
    isDev && 'development',
    isQA && 'qa',
    isStaging && 'staging',
    isProd && 'production',
]);
settings = settings[env];
console.log('Using these settings:\nenv: ', env, '\n\nsettings: ', settings);

gulp.task('s3', ['production'], () => {
    // Keep sensitive credentials outside the repo
    const s = settings.slack;
    const aws = settings.aws;
    let folder;

    if (isProd) {
        folder = 'production';
    } else if (isQA) {
        folder = 'qa';
    } else if (isStaging) {
        folder = 'staging';
    } else if (isDev) {
        folder = 'dev';
    } else {
        console.error(
            '\nError! Please specify an `--[environment]` when running the "deploy" task\n'
        );
        return;
    }

    const client = s3.createClient({
        maxAsyncS3: 20, // This is the default
        s3RetryCount: 3, // This is the default
        s3RetryDelay: 1000, // This is the default
        multipartUploadThreshold: 20971520, // This is the default (20 MB)
        multipartUploadSize: 15728640, // This is the default (15 MB)
        s3Options: aws,
    });

    const params = {
        localDir: settings.dest,
        deleteRemoved: false, // Do not remove files on S3 if they are not present on local FS
        s3Params: {
            Bucket: aws.bucket,
            Prefix: `${aws.basePath}/${folder}/`,
            ACL: 'public-read',
        },
    };

    console.log('\n\n*** Deploying to AWS S3 ***\n\n');

    const uploader = client.uploadDir(params);

    uploader.on('error', err => {
        console.error('unable to upload:', err.stack);
    });

    uploader.on('progress', () => {
        console.log(
            'progress',
            uploader.progressMd5Amount,
            uploader.progressAmount,
            uploader.progressTotal
        );
    });

    uploader.on('end', () => {
        console.log('done uploading');
        const slack = new Slack(s.hook_url, {});

        gitUserInfo(user => {
            slack.send({
                text: `${s.message + folder} <http://${
                    aws.basePath
                }.${folder}.haus.la>`,
                username: user.name || user.email || 'Anonymous',
            });
        });
    });
});
