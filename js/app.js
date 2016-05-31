/**
 * Created by yy on 2016/5/30.
 * 利用图片个数写法
 */
(function ($) {
    //默认参数
    var defaults = {

    };

    $.fn.doFun = function (options) {
        var options = $.extend(defaults, options);
        var _this = $(this);
        _this.append(_this.html());
        var liLength = _this.find('div').length;
        var sum=liLength/2;
        var liWidth = _this.find('div').outerWidth(true);
        _this.width(liWidth * liLength).css('left', -liWidth * liLength / 2 + 'px');

        // 左右切换按钮
        _this.next().children().on('click', function () {
            var index = $(this).index();
            if (_this.is(':animated')) {

                return;

            }
            if (!index) {
                //上一张
                sum--;
                _this.animate({'left': sum * -liWidth}, 500, function () {
                    if (sum === 0) {
                        _this.css('left', -liWidth * (liLength / 2));
                        sum = liLength/2;
                    }
                })

            } else {
                //下一张
                sum++;
                _this.animate({'left': sum * -liWidth}, 500, function () {
                    if (sum === liLength - 1) {
                        _this.css('left', -liWidth * (liLength / 2 - 1));
                        sum = liLength/2-1;
                    }
                });
            }
        });


    }
})(jQuery);