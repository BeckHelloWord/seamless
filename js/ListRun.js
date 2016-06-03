/**
 * Created by yy on 2016/5/31.
 */
(function ($) {
    var defaults = {
        transit: 500,
        num: 5, //显示区域显示图片的个数
        count: 0    //保存原始图片的个数
    };
    $.fn.doFun = function (options) {
        var options = $.extend(defaults, options);

        /*
         * 基本配置
         * 1、获得原始图片的个数、取得但个图片的宽度包含其内外边距和边框
         * 2、复制图片，前后各插入显示区域的图片个数
         * 3、设置复制图片后的总宽度和偏移（偏移到原始图片的前5张）
         */
        var _this = $(this);
        options.count = _this.children().length;  //原始图片个数
        insertChild();
        var liWidth = _this.find('div').outerWidth(true);
        var liLength = _this.children().length; //复制后图片个数
        _this.width(liWidth * liLength).css('left', -liWidth * options.num);
        var ulLeft = parseInt(_this.css('left'));

        //复制，插入前后
        function insertChild() {
            for (var i = 0; i < 2; i++) {
                var arr = [];
                for (var j = 0; j < options.num; j++) {
                    if (i === 0) {
                        arr.push(_this.children().eq(j).get(0).outerHTML);
                    } else {
                        arr.push(_this.children().eq(options.count - j - 1).get(0).outerHTML)
                    }
                }
                if (i === 0) {
                    _this.append(arr);
                } else {
                    _this.prepend(arr.reverse());
                }
            }
        }

        /*
         * 切换代码
         * 1、判断动画是否执行，如果在执行的话就取消操作
         * 2、判断复制图片后个数是否是显示区域的倍数，如果是倍数按照显示个数滚动，如果不是按照一个滚动
         * （经研究和参考别的插件发现：当是复制后的图片总个数是显示区域图片个数的倍数的话可以多个跑动，不会有bug,否则会有bug）
         * 3、滚动晚后判断目前left的值是否为为0（为0时，通过css瞬间改为原始图片个数的宽度）或是最后五个的值（到最后五个值的时候，通过css瞬间改为（赋值后图片总个数-默认显示区域显示个数）的宽度），
         */

        $('.next').on('click', function () {
            if (!_this.is(':animated')) {
                if (liLength % options.num === 0) {
                    //成倍数,跑五个
                    ulLeft -= liWidth * options.num;

                } else {
                    //不是倍数，跑一个
                    ulLeft -= liWidth;
                }
                _this.animate({'left': ulLeft}, options.transit, function () {
                    if (ulLeft === (liLength - options.num) * liWidth * -1) {
                        ulLeft = -liWidth * options.num;
                        _this.css('left', ulLeft);
                    }
                });
            }

        })

        $('.prev').on('click', function () {
            if (!_this.is(':animated')) {
                if (liLength % options.num === 0) {
                    //成倍数,跑五个
                    ulLeft += liWidth * options.num;

                } else {
                    //不是倍数，跑一个
                    ulLeft += liWidth;
                }

                _this.animate({'left': ulLeft}, options.transit, function () {
                    if (ulLeft === 0) {
                        ulLeft = -liWidth * options.count;
                        _this.css('left', ulLeft);
                    }
                });
            }

        })
    }
})(jQuery)