/* ===================================================================
 * Transcend - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {
	'use strict';

	var cfg = {
			scrollDuration: 800, // smoothscroll duration
			mailChimpURL: ''
		},
		$WIN = $(window);

	// Add the User Agent to the <html>
	// will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	/* Preloader
	 * -------------------------------------------------- */
	var clPreloader = function() {
		$('html').addClass('cl-preload');

		$WIN.on('load', function() {
			//force page scroll position to top at page refresh
			// $('html, body').animate({ scrollTop: 0 }, 'normal');

			// will first fade out the loading animation
			$('#loader').fadeOut('slow', function() {
				// will fade out the whole DIV that covers the website.
				$('#preloader')
					.delay(300)
					.fadeOut('slow');
			});

			// for hero content animations
			$('html').removeClass('cl-preload');
			$('html').addClass('cl-loaded');
		});
	};

	/* Menu on Scrolldown
	 * ------------------------------------------------------ */
	var clMenuOnScrolldown = function() {
		var menuTrigger = $('.header-menu-toggle');

		$WIN.on('scroll', function() {
			if ($WIN.scrollTop() > 150) {
				menuTrigger.addClass('opaque');
			} else {
				menuTrigger.removeClass('opaque');
			}
		});
	};

	/* OffCanvas Menu
	 * ------------------------------------------------------ */
	var clOffCanvas = function() {
		var menuTrigger = $('.header-menu-toggle'),
			nav = $('.header-nav'),
			closeButton = nav.find('.header-nav__close'),
			siteBody = $('body'),
			mainContents = $('section, footer');

		// open-close menu by clicking on the menu icon
		menuTrigger.on('click', function(e) {
			e.preventDefault();
			siteBody.toggleClass('menu-is-open');
		});

		// close menu by clicking the close button
		closeButton.on('click', function(e) {
			e.preventDefault();
			menuTrigger.trigger('click');
		});

		// close menu clicking outside the menu itself
		siteBody.on('click', function(e) {
			if (
				!$(e.target).is(
					'.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span'
				)
			) {
				siteBody.removeClass('menu-is-open');
			}
		});
	};

	/* photoswipe
	 * ----------------------------------------------------- */
	var clPhotoswipe = function() {
		var items = [],
			$pswp = $('.pswp')[0],
			$folioItems = $('.item-folio');

		// get items
		$folioItems.each(function(i) {
			var $folio = $(this),
				$thumbLink = $folio.find('.thumb-link'),
				$title = $folio.find('.item-folio__title'),
				$caption = $folio.find('.item-folio__caption'),
				$titleText = '<h4>' + $.trim($title.html()) + '</h4>',
				$captionText = $.trim($caption.html()),
				$href = $thumbLink.attr('href'),
				$size = $thumbLink.data('size').split('x'),
				$width = $size[0],
				$height = $size[1];

			var item = {
				src: $href,
				w: $width,
				h: $height
			};

			if ($caption.length > 0) {
				item.title = $.trim($titleText + $captionText);
			}

			items.push(item);
		});

		// bind click event
		$folioItems.each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				var options = {
					index: i,
					showHideOpacity: true
				};

				// initialize PhotoSwipe
				var lightBox = new PhotoSwipe(
					$pswp,
					PhotoSwipeUI_Default,
					items,
					options
				);
				lightBox.init();
			});
		});
	};

	/* Stat Counter
	 * ------------------------------------------------------ */
	var clStatCount = function() {
		var statSection = $('.s-stats'),
			stats = $('.stats__count');

		statSection.waypoint({
			handler: function(direction) {
				if (direction === 'down') {
					stats.each(function() {
						var $this = $(this);

						$({ Counter: 0 }).animate(
							{ Counter: $this.text() },
							{
								duration: 4000,
								easing: 'swing',
								step: function(curValue) {
									$this.text(Math.ceil(curValue));
								}
							}
						);
					});
				}

				// trigger once only
				this.destroy();
			},

			offset: '90%'
		});
	};

	/* Masonry
	 * ---------------------------------------------------- */

	var clMasonryFolio = function() {
		var containerBricks = $('.masonry');

		containerBricks.imagesLoaded(function() {
			containerBricks.masonry({
				itemSelector: '.masonry__brick',
				resize: true
			});
		});

		// layout Masonry after each image loads
		containerBricks.imagesLoaded().progress(function() {
			containerBricks.masonry('layout');
		});
	};

	/* slick slider
	 * ------------------------------------------------------ */
	var clSlickSlider = function() {
		$('.testimonials__slider').slick({
			arrows: false,
			dots: true,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			pauseOnFocus: false,
			autoplaySpeed: 1500,
			responsive: [
				{
					breakpoint: 900,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	};

	/* Smooth Scrolling
	 * ------------------------------------------------------ */
	var clSmoothScroll = function() {
		$('.smoothscroll').on('click', function(e) {
			var target = this.hash,
				$target = $(target);

			e.preventDefault();
			e.stopPropagation();

			$('html, body')
				.stop()
				.animate(
					{
						scrollTop: $target.offset().top
					},
					cfg.scrollDuration,
					'swing'
				)
				.promise()
				.done(function() {
					// check if menu is open
					if ($('body').hasClass('menu-is-open')) {
						$('.header-menu-toggle').trigger('click');
					}

					window.location.hash = target;
				});
		});
	};

	/* Placeholder Plugin Settings
	 * ------------------------------------------------------ */
	var clPlaceholder = function() {
		$('input, textarea, select').placeholder();
	};

	/* Alert Boxes
	 * ------------------------------------------------------ */
	var clAlertBoxes = function() {
		$('.alert-box').on('click', '.alert-box__close', function() {
			$(this)
				.parent()
				.fadeOut(500);
		});
	};

	/* Animate On Scroll
	 * ------------------------------------------------------ */
	var clAOS = function() {
		AOS.init({
			offset: 200,
			duration: 600,
			easing: 'ease-in-sine',
			delay: 300,
			once: true,
			disable: 'mobile'
		});
	};

	/* AjaxChimp
	 * ------------------------------------------------------ */
	var clAjaxChimp = function() {
		$('#mc-form').ajaxChimp({
			language: 'es',
			url: cfg.mailChimpURL
		});

		// Mailchimp translation
		//
		//  Defaults:
		//	 'submit': 'Submitting...',
		//  0: 'We have sent you a confirmation email',
		//  1: 'Please enter a value',
		//  2: 'An email address must contain a single @',
		//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
		//  4: 'The username portion of the email address is invalid (the portion before the @: )',
		//  5: 'This email address looks fake or invalid. Please enter a real email address'

		$.ajaxChimp.translations.es = {
			submit: 'Submitting...',
			0: '<i class="fas fa-check"></i> We have sent you a confirmation email',
			1: '<i class="fas fa-exclamation-circle"></i> You must enter a valid e-mail address.',
			2: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
			3: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
			4: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
			5: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.'
		};
	};

	/* Back to Top
	 * ------------------------------------------------------ */
	var clBackToTop = function() {
		var pxShow = 500, // height on which the button will show
			fadeInTime = 400, // how slow/fast you want the button to show
			fadeOutTime = 400, // how slow/fast you want the button to hide
			scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
			goTopButton = $('.cl-go-top');

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};

	/* Initialize
	 * ------------------------------------------------------ */
	(function clInit() {
		clPreloader();
		clMenuOnScrolldown();
		clOffCanvas();
		clPhotoswipe();
		clStatCount();
		clMasonryFolio();
		clSlickSlider();
		clSmoothScroll();
		clPlaceholder();
		clAlertBoxes();
		clAOS();
		clAjaxChimp();
		clBackToTop();
	})();
})(jQuery);

/*Start of slider*/
$('.slider').each(function() {
	var $this = $(this);
	var $group = $this.find('.slide_group');
	var $slides = $this.find('.slide');
	var bulletArray = [];
	var currentIndex = 0;
	var timeout;

	function move(newIndex) {
		var animateLeft, slideLeft;

		advance();

		if ($group.is(':animated') || currentIndex === newIndex) {
			return;
		}

		bulletArray[currentIndex].removeClass('active');
		bulletArray[newIndex].addClass('active');

		if (newIndex > currentIndex) {
			slideLeft = '100%';
			animateLeft = '-100%';
		} else {
			slideLeft = '-100%';
			animateLeft = '100%';
		}

		$slides.eq(newIndex).css({
			display: 'block',
			left: slideLeft
		});
		$group.animate(
			{
				left: animateLeft
			},
			function() {
				$slides.eq(currentIndex).css({
					display: 'none'
				});
				$slides.eq(newIndex).css({
					left: 0
				});
				$group.css({
					left: 0
				});
				currentIndex = newIndex;
			}
		);
	}

	function advance() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			if (currentIndex < $slides.length - 1) {
				move(currentIndex + 1);
			} else {
				move(0);
			}
		}, 4000);
	}

	$('.next_btn').on('click', function() {
		if (currentIndex < $slides.length - 1) {
			move(currentIndex + 1);
		} else {
			move(0);
		}
	});

	$('.previous_btn').on('click', function() {
		if (currentIndex !== 0) {
			move(currentIndex - 1);
		} else {
			move(3);
		}
	});

	$.each($slides, function(index) {
		var $button = $('<a class="slide_btn">&bull;</a>');

		if (index === currentIndex) {
			$button.addClass('active');
		}
		$button
			.on('click', function() {
				move(index);
			})
			.appendTo('.slide_buttons');
		bulletArray.push($button);
	});

	advance();
});
/*End of slider*/
/*Start of text anim*/
var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
} // ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————
var TextScramble = (function() {
	function TextScramble(el) {
		_classCallCheck(this, TextScramble);
		this.el = el;
		this.chars = '!<>-_\\/[]{}—=+*^?#________';
		this.update = this.update.bind(this);
	}
	_createClass(TextScramble, [
		{
			key: 'setText',
			value: function setText(newText) {
				var _this = this;
				var oldText = this.el.innerText;
				var length = Math.max(oldText.length, newText.length);
				var promise = new Promise(function(resolve) {
					return (_this.resolve = resolve);
				});
				this.queue = [];
				for (var i = 0; i < length; i++) {
					var from = oldText[i] || '';
					var to = newText[i] || '';
					var start = Math.floor(Math.random() * 40);
					var end = start + Math.floor(Math.random() * 40);
					this.queue.push({
						from: from,
						to: to,
						start: start,
						end: end
					});
				}
				cancelAnimationFrame(this.frameRequest);
				this.frame = 0;
				this.update();
				return promise;
			}
		},
		{
			key: 'update',
			value: function update() {
				var output = '';
				var complete = 0;
				for (var i = 0, n = this.queue.length; i < n; i++) {
					var _queue$i = this.queue[i],
						from = _queue$i.from,
						to = _queue$i.to,
						start = _queue$i.start,
						end = _queue$i.end,
						char = _queue$i.char;
					if (this.frame >= end) {
						complete++;
						output += to;
					} else if (this.frame >= start) {
						if (!char || Math.random() < 0.28) {
							char = this.randomChar();
							this.queue[i].char = char;
						}
						output += '<span class="dud">' + char + '</span>';
					} else {
						output += from;
					}
				}
				this.el.innerHTML = output;
				if (complete === this.queue.length) {
					this.resolve();
				} else {
					this.frameRequest = requestAnimationFrame(this.update);
					this.frame++;
				}
			}
		},
		{
			key: 'randomChar',
			value: function randomChar() {
				return this.chars[
					Math.floor(Math.random() * this.chars.length)
				];
			}
		}
	]);
	return TextScramble;
})();

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

var phrases = [
	'Aarohan 2018',
	'Coding',
	'Robotics',
	'Science',
	'Mathematics',
	'Electronics'
];

var el = document.querySelector('.text');
var fx = new TextScramble(el);

var counter = 0;
var next = function next() {
	fx.setText(phrases[counter]).then(function() {
		setTimeout(next, 800);
	});
	counter = (counter + 1) % phrases.length;
};

next();
/*End of text anim*/
/*Start of Countdown*/
/**************************
	COUNTDOWN COMPONENT
 **************************/
Vue.component('countdown', {
	template: `
	<section class="countdown">
		
		<div v-show="!expired" class="timer">
			<div class="box">
				<div class="spacer"></div>
				<p class="value">{{ theTime.days }}</p>
				<p class="label">days</p>
			</div>
			<div class="box">
				<div class="spacer"></div>
				<p class="value">{{ theTime.hours }}</p>
				<p class="label">hours</p>
			</div>
			<div class="box">
				<div class="spacer"></div>
				<p class="value">{{ theTime.minutes }}</p>
				<p class="label">mins</p>
			</div>
			<div class="box">
				<div class="spacer"></div>
				<p class="value">{{ theTime.seconds }}</p>
				<p class="label">secs</p>
			</div>
			<p class="text">Fun begins in</p>
		</div>

		<div v-show="expired" class="expired-timer timer">
			<div class="box">
				<div class="spacer"></div>
				<p class="value">Aarohan 2018 is finally here</p>
				<p class="label">See you there!!</p>
			</div>
		</div>
	 
	</section>
`,

	data() {
		return {
			deadline: 'Oct 29, 2018 06:0:00',
			days: 'HI',
			hours: 'TH',
			minutes: 'ER',
			seconds: 'E!',
			expired: false
		};
	},

	computed: {
		theTime() {
			var ctx = this;

			// Countdown loop
			var x = setInterval(function() {
				// Difference between the 2 dates
				var countDownDate = new Date(ctx.deadline).getTime(),
					now = new Date().getTime(),
					diff = countDownDate - now,
					// Time conversion to days, hours, minutes and seconds
					tdays = Math.floor(diff / (1000 * 60 * 60 * 24)),
					thours = Math.floor(
						(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					),
					tminutes = Math.floor(
						(diff % (1000 * 60 * 60)) / (1000 * 60)
					),
					tseconds = Math.floor((diff % (1000 * 60)) / 1000);

				// Keep 2 digits
				ctx.days = tdays < 10 ? '0' + tdays : tdays;
				ctx.hours = thours < 10 ? '0' + thours : thours;
				ctx.minutes = tminutes < 10 ? '0' + tminutes : tminutes;
				ctx.seconds = tseconds < 10 ? '0' + tseconds : tseconds;

				// Check for time expiration
				if (diff < 0) {
					clearInterval(x);
					ctx.expired = true;
				}
			}, 1000);

			// Return data
			return {
				days: ctx.days,
				hours: ctx.hours,
				minutes: ctx.minutes,
				seconds: ctx.seconds
			};
		}
	}
});

/**************************
	ROOT COMPONENT
 **************************/
var app = new Vue({
	el: '#app'
});
/*End of Countdown*/
