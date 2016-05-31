/**
 * Created by yuwei on 2016/5/31.
 * 利用left值加减写法
 * 思路：
 * 复制一份追加到末尾，初始将left定位在第二份的第一张
 * 右点击：当显示到第二份的最后一张图时，将left值定位到第一份图的最后一张
 * 左点击：当显示到第一份图的第一张图时，将left值定位到第二份图的第一张
 */
(function ($) {
    //默认配置
    var defaults = {
        time: 1000,  //定时时间
        transit: 500, //过渡时间
        copyNum: 2
    };
    $.fn.doFun = function (options) {
        var options = $.extend(defaults, options);

        //复制一份，设置总宽度,设置偏移默认显示第二份图片的第一张（解决一开始就点击左按钮）
        var _this = $(this), timer;
        var liLength = _this.children().length * options.copyNum;
        var liWidth = _this.find('div').width();
        _this.append(_this.html());
        _this.width(liLength * liWidth).css('left', -(liWidth * liLength) / 2);
        var ulLeft = parseInt(_this.css('left'));

        //核心
        function play(val) {
            /*
             * 注意:本来我们将‘解决连续点击bug’代码放在这里做判断，但在测试当中发现加在这里时没有任何效果
             * 不是因为代码失效，而是在我们执行这个函数前，代码已经将left值累加了，虽然在这里‘解决连续点击bug’的判断起了作用
             * 但是当不满足时，下面的left使用了我们累加的ulLeft值
             * */
            _this.animate({'left': val}, options.transit, function () {
                if (val === liWidth * (1 - liLength)) {
                    //当过渡到第二份最后一张时，将left值初始化为第一份最后一张
                    ulLeft = liWidth * (1 - liLength / options.copyNum);
                } else if (val === 0) {
                    //当过渡到第一份第一张时，将left值初始化为第二份第一张
                    ulLeft = -liWidth * liLength / options.copyNum;
                }
                _this.css('left', ulLeft);
            })
        }

        //定时方法
        var autoPlay = function () {
            $('.next').trigger('click');
        }

        //下一张
        $('.next').on('click', function () {
            //解决连续点击BUG
            if (!_this.is(':animated')) {
                play(ulLeft -= liWidth);
            }
        });

        //上一张
        $('.prev').on('click', function () {
            //解决连续点击BUG
            if (!_this.is(':animated')) {
                play(ulLeft += liWidth);
            }
        });

        //鼠标进入，离开
        $(_this.selector + ",.next,.prev").hover(function () {
            clearInterval(timer)
        }, function () {
            timer = setInterval(autoPlay, options.time);
        });


        //定时器
        clearInterval(timer);
        timer = setInterval(autoPlay, options.time);


    }
})(jQuery)