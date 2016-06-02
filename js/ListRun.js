/**
 * Created by yy on 2016/5/31.
 */
(function ($) {
    var defaults = {
        num: 5,
        count:7
    };
    $.fn.doFun = function (options) {
        var options = $.extend(defaults, options);

        /*
        * 基本配置
        * 获得内容个数、单个内容宽度、设置显示区域的总宽度和默认偏移
        */
        var _this = $(this);
        var liLength = _this.children().length;
        insert();
        var liWidth = _this.find('div').outerWidth(true);
        _this.width(liWidth * liLength).css('left', -liWidth * options.num);
        var ulLeft = parseInt(_this.css('left'));

        function insert(num){
            var str="";
            for(var i=0;i<options.num;i++){
                str+=_this.children().eq(i).html();
            }
            _this.append(str);
        }


        $('.next').on('click', function () {
            if (!_this.is(':animated')) {
                ulLeft -= liWidth;
                _this.animate({'left': ulLeft}, 500, function () {
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
                _this.animate({'left': ulLeft}, 500, function () {
                    if (ulLeft === 0) {
                        ulLeft = -liWidth * options.count;
                        _this.css('left', ulLeft)
                    }
                });
            }

        })
    }
})(jQuery)