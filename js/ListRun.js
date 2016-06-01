/**
 * Created by yy on 2016/5/31.
 */
(function ($) {
    var defaults = {
        num: 5
    };
    $.fn.doFun = function (options) {
        var options = $.extend(defaults, options);

        var _this = $(this);
        var nextChild=_this.children().slice(0,5);
        var prevChild=_this.children().slice(-5);
        _this.append(nextChild);
        _this.prepend(prevChild);
        var liLength = _this.children().length;
        var liWidth = _this.find('div').outerWidth(true);
        _this.width(liWidth * liLength).css('left', -liWidth * options.num);
        var ulLeft = parseInt(_this.css('left'));

        $('.next').on('click', function () {
            if (!_this.is(':animated')) {
                ulLeft -= liWidth;
                console.log(liLength);
                console.log((liLength - options.num) * liWidth * -1)
                _this.animate({'left': ulLeft}, 500, function () {
                    if (ulLeft === (liLength - options.num) * liWidth * -1) {
                        ulLeft = -liWidth * options.num;
                        _this.css('left', ulLeft)
                    }
                });
            }

        })

        $('.pev').on('click', function () {
            if (!_this.is(':animated')) {
                ulLeft -= liWidth;
                console.log(liLength);
                console.log((liLength - options.num) * liWidth * -1)
                _this.animate({'left': ulLeft}, 500, function () {
                    if (ulLeft === (liLength - options.num) * liWidth * -1) {
                        ulLeft = -liWidth * options.num;
                        _this.css('left', ulLeft)
                    }
                });
            }

        })
    }
})(jQuery)