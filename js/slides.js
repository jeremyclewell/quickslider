
  (function($) {
    return $.fn.slides = function(src, duration) {
      var index, move, slides, srcCall, stage,
        _this = this;
      this.src = src;
      this.duration = duration != null ? duration : 5000;
      slides = [];
      index = 0;
      stage = $("<div id='" + (($(this)).attr("id") + "Stage") + "'></div>");
      move = function(direction) {
        _this.transitioning = true;
        clearTimeout(_this.tick);
        index += direction;
        stage.append(slides[index % slides.length]);
        return stage.find('div').last().hide().fadeIn(400, function() {
          stage.find('div').first().remove();
          _this.transitioning = false;
          return _this.tick = setTimeout(move, _this.duration, 1);
        });
      };
      (this.find('.previousBtn')).on("click", function(evt) {
        if (!_this.transitioning) return move(-1);
      });
      (this.find('.nextBtn')).on("click", function(evt) {
        if (!_this.transitioning) return move(1);
      });
      srcCall = $.ajax(this.src, {
        cache: false,
        complete: function() {
          return typeof console !== "undefined" && console !== null ? console.log("complete") : void 0;
        },
        success: function(data) {
          var slide, _i, _len;
          slides = ($(data)).filter("div.slide");
          for (_i = 0, _len = slides.length; _i < _len; _i++) {
            slide = slides[_i];
            ($(slide)).css("position", "absolute");
          }
          index = slides.length * 500;
          _this.prepend(($(data)).filter("style"));
          _this.append(stage);
          stage.append(slides[0]);
          return _this.tick = setTimeout(move, _this.duration, 1);
        },
        err: function(message) {
          return typeof console !== "undefined" && console !== null ? console.log(message) : void 0;
        }
      });
      return this;
    };
  })(jQuery);

