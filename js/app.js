/**
 * Created by yy on 2016/5/30.
 */
(function ($) {
    //默认参数
    var defaults = {};

    $.fn.doFun = function (options) {
        var options = $.extend(defaults, options);

        var _this=$(this);
    }
})(jQuery);