$(document).ready(function(){
	class Slider{
		constructor(sliderEl, options = {
			slidesToShow: 1,
			slidesToChange: 1,
			animate: false,
			animationDelay: 1
		}){
			let self = this;
			this.sliderView = sliderEl;
			this.options = options,
			this.currentDot = 1;
			this.slideLeft = 0;
			this.prevDot = 1;
			this.slidesNum = this.options.slidesToShow;
			this.dotsNum = Math.ceil($(this.sliderView).find('.slide').length / this.options.slidesToChange);
			$(this.sliderView).width((parseInt($(this.sliderView).find('.slide').width()) + parseInt($(this.sliderView).find('.slide').css('margin-right'))) * this.options.slidesToShow + this.options.slidesToShow - 1 - parseInt($(this.sliderView).find('.slide').css('margin-right')));
			this.maxLeft = ($($(this.sliderView).find('.slide')[$(this.sliderView).find('.slide').length - 1]).offset().left + parseInt($($(this.sliderView).find('.slide')[$(this.sliderView).find('.slide').length - 1]).width()) - parseInt($(this.sliderView).width())) * (-1);
			if (this.options.dots) {
				this.dots = [];
				$(this.sliderView).children('.dots').remove();
				$(this.sliderView).append('<div class="dots"></div>');
				for (let i = 0; i < this.dotsNum; i++) {
					$(this.sliderView).children('.dots').append('<div class="dot"></div>');
				}
				$(this.sliderView).find('.dot').each(this.dotDeclare.bind(this));
				this.slide_change();
				$(this.dots[0]).addClass('active-dot');
				this.dots.forEach(function(item, i) {
					$(item).click(function(){
						this.prevDot = this.currentDot;
						this.currentDot = i + 1;
						this.slide_change();
					}.bind(self));
				});
			}
			$(this.sliderView).find('.left-arrow').click(this.slideToLeft.bind(this));
			$(this.sliderView).find('.right-arrow').click(this.slideToRight.bind(this));

			$(this.sliderView).find('.slider-viewport').on('touchstart', function(e){
				this.touched = true;
				this.initialD = (parseInt($(this.sliderView).offset().left) + parseInt($(this.sliderView).width())) - e.changedTouches[e.changedTouches.length - 1].pageX;
				this.initialL = parseInt($(this.sliderView).find('.slider-viewport').css('left'));
				$(this.sliderView).find('.slider-viewport').css('transition', 'none');
			}.bind(this));	

			$(this.sliderView).find('.slider-viewport').on('touchmove', function(e){
				let left = 0;
				if (this.touched) {
					let mouseX = parseInt(e.changedTouches[e.changedTouches.length - 1].pageX);
					let parentOffset = $(this.sliderView).offset();
					if (mouseX >= parseInt($(this.sliderView).offset().left) && mouseX <= parseInt($(this.sliderView).offset().left) + parseInt($(this.sliderView).width())) {
						let currentD = (parseInt($(this.sliderView).offset().left) + parseInt($(this.sliderView).width())) - e.changedTouches[e.changedTouches.length - 1].pageX;
						this.difference = this.initialD - currentD;
						left =	this.initialL + this.difference;
						if (left <= 8 && left >= this.maxLeft) {
							$(this.sliderView).find('.slider-viewport').css('left', left + 'px');
							let txc = Math.abs(parseInt($(this.sliderView).find('.slider-viewport').css('left')));
							let c = Math.round((txc + 1) / (((parseInt($(this.sliderView).find('.slide').width()) + parseInt($(this.sliderView).find('.slide').css('margin-right'))) * this.options.slidesToChange)));
							this.prevDot = this.currentDot;
							this.currentDot = c + 1;
							if (this.options.dots) {
								this.dots[this.prevDot - 1].removeClass('active-dot');
								this.dots[this.currentDot - 1].addClass('active-dot');
							}
						}
						else{
							left = 0;
						}
					}
				}
			}.bind(this));

			$(this.sliderView).find('.slider-viewport').on('touchend', function(){
				this.touched = false;
				$(this.sliderView).find('.slider-viewport').css('transition', 'left .5s ease-in-out');
			}.bind(this));
			if (this.options.animate) {
				setInterval(function(){
					if (!self.touched) {
						self.slideToRight();
					}
				}, this.options.animationDelay * 1000)
			}
		}
		dotDeclare(index, item){
			this.dots[index] = $(item);
		}
		slideToLeft(){
			if (this.currentDot == 1) {
				this.prevDot = this.currentDot;
				this.currentDot = this.dotsNum;
			}
			else{
				this.prevDot = this.currentDot;
				this.currentDot--;
			}
			this.slide_change();
		}
		slideToRight(){
			if (this.currentDot == this.dotsNum) {
				this.prevDot = this.currentDot;
				this.currentDot = 1;
			}
			else{
				this.prevDot = this.currentDot;
				this.currentDot++;
			}
			this.slide_change();
		}
		slide_change(){
			this.slideLeft = (this.currentDot - 1) * (((parseInt($(this.sliderView).find('.slide').width()) + parseInt($(this.sliderView).find('.slide').css('margin-right')) + 1) * this.options.slidesToChange) * (-1));
			if (this.options.dots) {
				this.dots[this.prevDot - 1].removeClass('active-dot');
				this.dots[this.currentDot - 1].addClass('active-dot');
			}
			$(this.sliderView).find('.slider-viewport').css('left', this.slideLeft + 'px');
		}
	}
	let slider3 = new Slider(document.querySelector('.slider3'), {
		slidesToShow: 3,
		slidesToChange: 3,
		dots: true,
		animate: true,
		animationDelay: 3
	});
});