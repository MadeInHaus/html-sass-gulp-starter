const dest = "./build";
const src = "./src";

module.exports = {
    browserSync: {
        server: {
            // Serve up our build folder
            baseDir: dest
        }
    },
    browserify: {
        /*
         * A separate bundle will be generated for each
         * bundle config in the list below
         */
        src,
        bundleConfigs: [
            {
                entries: `${src}/javascript/client.js`,
                dest: `${dest}/js`,
                outputName: "client.js",
                // Additional file extentions to make optional
                extensions: [".js", ".jsx"]

                /*
                 * List of modules to make require-able externally
                 *require: ['some-module', 'another-module']
                 */
            }
        ]
    },
    assets: {
        src: `${src}/assets/**`,
        dest
    },
    images: {
        src: `${src}/images/**`,
        dest: `${dest}/images`
    },
    markup: {
        src: `${src}/html/**/*.html`,
        dest
    },
    sass: {
        src: `${src}/sass/**/*.{sass,scss}`,
        dest: `${dest}/css`,
        settings: {
            /*
             * Required if you want to use SASS syntax
             * See https://github.com/dlmanning/gulp-sass/issues/81
             */
            sourceComments: "map",
            imagePath: "/images" // Used by the image-url helper
        }
    },
    production: {
        cssSrc: `${dest}/css/*.css`,
        jsSrc: `${dest}/js/*.js`,
        dest
    }
};
