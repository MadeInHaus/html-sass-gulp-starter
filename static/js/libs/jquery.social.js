(function($, document, window, undefined) {
    // Optional, but considered best practice by some
    "use strict";

    var twDefaults = {
        title: $("meta[name='twitter:title']").attr("content"),
        message: $("meta[name='twitter:description']").attr("content"),
        shareImg: $("meta[name='twitter:image']").attr("content"),
        windowName: 'twitter-share-dialog',
        width: 626,
        height: 260
    },
        pnDefaults = {
            description: $("meta[property='og:description']").attr("content"),
            windowName: 'pinterest-share-dialog',
            width: 626,
            height: 260,
            href: location.href,
            origin: location.origin,
            shareImg: $("meta[property='og:image']").attr("content")
        },
        fbDefaults = {
            shareurl: location.href,
            windowName: 'facebook-share-dialog',
            width: 626,
            height: 245
        },
        gpDefaults = {
            shareurl: location.href,
            windowName: 'google-share-dialog',
            width: 490,
            height: 245
        },
        socialMethodArray = {
            twitter: function(element, options) {
                var opts = $.extend({}, twDefaults, options);
                var socialOptions = {
                    url: 'https://twitter.com/intent/tweet?' + encodeURIComponent(location.href) + "&text=" + encodeURIComponent(opts.message),
                };
                opts = $.extend(opts, socialOptions);
                new SocialBase(element, opts);
            },
            facebook: function(element, options) {
                var opts = $.extend({}, fbDefaults, options);
                var socialOptions = {
                    url: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(opts.shareurl)
                };
                opts = $.extend(opts, socialOptions);
                new SocialBase(element, opts);
            },
            gplus: function(element, options) {
                var opts = $.extend({}, gpDefaults, options);
                var socialOptions = {
                    url: 'https://plus.google.com/share?url=' + encodeURIComponent(opts.shareurl)
                };
                opts = $.extend(opts, socialOptions);
                new SocialBase(element, opts);
            },
            pinterest: function(element, options) {
                var opts = $.extend({}, pnDefaults, options);
                var href = encodeURIComponent(opts.href);
                var shareImg = encodeURIComponent(opts.shareImg);
                var description = encodeURIComponent(opts.description);
                var socialOptions = {
                    url: "http://pinterest.com/pin/create/button/?url=" + href + "&media=" + shareImg + "&description=" + description,
                };
                opts = $.extend(opts, socialOptions);
                new SocialBase(element, opts);
            },
        };

    function SocialBase(element, options) {
        this.options = options;
        var self = this;

        function init() {
            var that = this;
            $(element).bind('click', function() {
                onElementClick($(this));
                return false;
            });
        }

        function onElementClick(e) {
            window.open(
                self.options.url,
                self.options.windowName,
                'width=' + self.options.width + ',height=' + self.options.height
            );
        }
        init();
    }

    for (var item in socialMethodArray) {
        //had to wrap this or it would grab the last variable set in the for loop
        (function(item, Share) {
            $.fn[item] = function(options) {
                this.each(function() {
                    var fnKey = 'plugin_' + item;
                    if (!$.data(this, fnKey)) {
                        $.data(this, fnKey, new Share(this, options));
                    }
                });
            };
        })(item, socialMethodArray[item]);
    }
    $.social = function() {
        $('.fb').facebook();
        $('.tw').twitter();
        $('.pt').pinterest();
        $('.gp').gplus();
    };

})($, document, window);
