var stickyHeaders = (function() {

    var $window,
        $stickies,
        $headlines,
        $limit,
        $offset;

    var init = function(stickies, target) {
        $window = target || $(window);
        $offset = $("header").outerHeight() || 0;
        $limit = $("footer").offset().top-$offset || 0;

        if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {

            $headlines =  $("<ul></ul>").appendTo(".headline");

            $stickies = stickies.each(function() {

                var $thisSticky = $(this);
                $thisSticky.find("br").replaceWith(" ");

                $thisSticky
                    .data('originalPosition', $thisSticky.offset().top-$offset)
                    .data('originalHeight', $thisSticky.outerHeight());

                var $li = $("<li></li>").appendTo($headlines);
                $li.addClass($thisSticky.attr("class")).html($thisSticky.html());

            });

            target.off("scroll.stickies").on("scroll.stickies", function(event) {
                _whenScrolling(event);
            });

            $headlines = $(".headline li");
        }
    };

    var load = function(stickies, target) {
        $window = target || $(window);
        $offset = $("header").outerHeight() || 0;
        $limit = $("footer").offset().top-$offset || 0;

        if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {

            $stickies = stickies.each(function() {

                var $thisSticky = $(this);

                $thisSticky
                    .data('originalPosition', $thisSticky.offset().top-$offset)
                    .data('originalHeight', $thisSticky.outerHeight());
            });
            target.off("scroll.stickies").on("scroll.stickies", function(event) {
                _whenScrolling(event);
            });
        }
    };

    var _whenScrolling = function(event) {

        var $scrollTop = $(event.currentTarget).scrollTop()+$offset;

        $stickies.each(function(i) {
            var i = i | 0;

            var $thisSticky = $(this),
                $stickyTop = $thisSticky.data('originalPosition'),
                $stickyBottom = $thisSticky.data('originalPosition')+$thisSticky.data('originalHeight');

            if( $stickyTop <= $scrollTop && $scrollTop <= $stickyBottom ) {
                //영역 안에 들어와서 겹치는 경우
                $headlines.css("display", "none");
            }else if ($limit <= $scrollTop) {
                $headlines.css("display", "none");
            }else if ($stickyTop <= $scrollTop) {
                $headlines.css("display", "none");
                $headlines.eq(i).css("display", "block");
            } else {
                $headlines.eq(i).css("display","none");
            }
        });
    };

    return {
        init: init,
        load: load
    };
})();