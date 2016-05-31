/**
 * Created by yy on 2016/5/31.
 */
(function ($) {
    var defaults = {
        count: 2
    };
    $.fn.doFun = function (options) {
        var options = $.extend(defaults, options);

        var _this = $(this);
        var liLength = _this.children().length * options.count;
        var liWidth = _this.find('div').outerWidth(true);
        _this.append(_this.html());
        _this.width(liWidth * liLength).css('left',-(liWidth*liLength/2));
    }
})(jQuery)