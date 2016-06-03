/**
 * Created by yy on 2016/5/31.
 */
(function ($) {
    var defaults = {
        transit: 500,
        num: 5,
        count: 0
    };
    $.fn.doFun = function (options) {
        var options = $.extend(defaults, options);

        /*
         * 基本配置
         * 获得内容个数、单个内容宽度、设置显示区域的总宽度和默认偏移
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


        $('.next').on('click', function () {
            if (!_this.is(':animated')) {
                if (liLength % options.num !== 0) {
                    //成倍数,跑五个
                    ulLeft -= liWidth * options.num;

                } else {
                    //不是倍数，跑一个
                    ulLeft -= liWidth;
                }
                _this.animate({'left': ulLeft}, options.transit, function () {
                    if (ulLeft === (liLength - options.num) * liWidth * -1) {
                        ulLeft = -liWidth * options.num;
                        _this.css('left', ulLeft)
                    }
                });
            }

        })

        $('.prev').on('click', function () {
            if (!_this.is(':animated')) {
                ulLeft += liWidth;
                _this.animate({'left': ulLeft}, options.transit, function () {
                    if (ulLeft === 0) {
                        ulLeft = -liWidth * options.count;
                        _this.css('left', ulLeft)
                    }
                });
            }

        })
    }
})(jQuery)