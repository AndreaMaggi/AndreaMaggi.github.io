
function showImg(loadingGif, imgCont) {
	loadingGif.fadeOut(0);
	imgCont.fadeIn(800);
	window.scrollTo(0, 1);
}

function imageLoad(imgCont, loadingGif, isPage, check) {
	imgCont.fadeOut(0);
	loadingGif.fadeIn(0);
	var imgLoaded;
	if (desktopCheck) {
		imagesArray = data[''+isPage+'']['desktop'];
		desktopLoad = true;
		tabletPortraitLoad = false;
		tabletLandscapeLoad = false;
		mobilePortraitLoad = false;
		mobileLandscapeLoad = false;
	}
	if (tabletPortraitCheck) {
		imagesArray = data[''+isPage+'']['tablet']['portrait'];
		desktopLoad = false;
		tabletPortraitLoad = true;
		tabletLandscapeLoad = false;
		mobilePortraitLoad = false;
		mobileLandscapeLoad = false;
	}
	if (tabletLandscapeCheck) {
		imagesArray = data[''+isPage+'']['tablet']['landscape'];
		desktopLoad = false;
		tabletPortraitLoad = false;
		tabletLandscapeLoad = true;
		mobilePortraitLoad = false;
		mobileLandscapeLoad = false;
	}
	if (mobilePortraitCheck) {
		imagesArray = data[''+isPage+'']['mobile']['portrait'];
		desktopLoad = false;
		tabletPortraitLoad = false;
		tabletLandscapeLoad = false;
		mobilePortraitLoad = true;
		mobileLandscapeLoad = false;
	} 
	if (mobileLandscapeCheck) {
		imagesArray = data[''+isPage+'']['mobile']['landscape'];
		desktopLoad = false;
		tabletPortraitLoad = false;
		tabletLandscapeLoad = false;
		mobilePortraitLoad = false;
		mobileLandscapeLoad = true;
	} 
	
	imgCont.css('background-image', 'url('+imagesArray[0].valideUrl+')');
	if (noBackgroundSize) {
		imgCont.css({
			'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+imagesArray[0].valideUrl+', sizingMethod=\'scale\')',
			'-ms-filter': '\"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+imagesArray[0].valideUrl+', sizingMethod=\'scale\')\"'
		});
	}
	imgLoaded = new Image();
	imgLoaded.onload = function(){
		setTimeout( function(){
			showImg(loadingGif, imgCont);
		}, 1000);
	}
	imgLoaded.src = ''+imagesArray[0].valideUrl+'';
}

function imgCheckLoad() {
	width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	if ( width > 1024 ) {
		if (!desktopLoad) {
			preload = data[''+isPage+'']['desktop'];
			preloadImgs(preload);
			desktopCheck = true;
			tabletPortraitCheck = false;
			tabletLandscapeCheck = false;
			mobilePortraitCheck = false;  
			mobileLandscapeCheck = false; 
			imageLoad(imgCont, loadingGif, isPage);
		}
	} 
	if ( width <= 1024 && width > 767) {
		if ( width < height && !tabletPortraitLoad) {
			preload = data[''+isPage+'']['tablet']['portrait'];
			preloadImgs(preload);
			desktopCheck = false;
			tabletPortraitCheck = true;
			tabletLandscapeCheck = false;
			mobilePortraitCheck = false;  
			mobileLandscapeCheck = false; 
	        imageLoad(imgCont, loadingGif, isPage);
		}
		if ( width > height && !tabletLandscapeLoad) {
			preload = data[''+isPage+'']['tablet']['landscape'];
			preloadImgs(preload);
			desktopCheck = false;
			tabletPortraitCheck = false;
			tabletLandscapeCheck = true;
			mobilePortraitCheck = false;  
			mobileLandscapeCheck = false;  
	        imageLoad(imgCont, loadingGif, isPage);
		}
	}
	if ( width <= 767 ) {
		if ( width < height && !mobilePortraitLoad) {
			preload = data[''+isPage+'']['mobile']['portrait'];
			preloadImgs(preload);
			desktopCheck = false;
			tabletPortraitCheck = false;
			tabletLandscapeCheck = false;
			mobilePortraitCheck = true;  
			mobileLandscapeCheck = false;    
	        imageLoad(imgCont, loadingGif, isPage);
		}
		if ( width > height && !mobileLandscapeLoad) {
			preload = data[''+isPage+'']['mobile']['landscape'];
			preloadImgs(preload);
	    	desktopCheck = false;
			tabletPortraitCheck = false;
			tabletLandscapeCheck = false;
			mobilePortraitCheck = false;  
			mobileLandscapeCheck = true;     
	        imageLoad(imgCont, loadingGif, isPage);
		}
	}
}

function scrollDown(e) {
	window.scrollTo(0, 1);
	if ( !html.hasClass('show-content') ) {
		html.addClass('show-content');
		if (noTransition) {
			openContentIE(contentCont, mainBg);
		}
		e.stopImmediatePropagation();
	}
}

function scrollUp(e) {
    if ( html.hasClass('show-content') && scrollPos == 'top' ) {
		html.removeClass('show-content');
		if (noTransition) {
			closeContentIE(contentCont, mainBg);
		}
		e.stopImmediatePropagation();
	}
}

function openMenu() {
	if (!html.hasClass('open-menu')) {
		html.addClass('open-menu');
		if (noTransition) {
			openNavIE(mainNav, menuToggle, contentCont, mainBg);
		}
	}
}

function closeMenu() {
	if (html.hasClass('open-menu')) {
		html.removeClass('open-menu');
		if (noTransition) {
			closeNavIE(mainNav, menuToggle, contentCont, mainBg);
		}
	}
}

function chkScroll(e) {
    var elem = $(e.currentTarget),
    	elemScroll = ( elem[0].scrollHeight - elem.scrollTop())-2;
    	elemHeight = elem.outerHeight();
    if ( elemScroll < elemHeight ) {
        scrollPos = 'bottom';
        return false;
    } 
    if ( elem.scrollTop() == 0) {
		scrollPos = 'top';
		return false;
    }
    scrollPos = 'scrolling';
}

function animateIE(el, dir, value, time) {
	var direction;
	if ( dir == 'top' ) {
		direction = { top: value }
	}
	if ( dir == 'bottom' ) {
		direction = { bottom: value }
	}
	if ( dir == 'left' ) {
		direction = { left: value }
	}
	if ( dir == 'right' ) {
		direction = { right: value }
	}
	el.stop().animate(direction, time, 'linear');
}

function closeContentIE(contentCont, mainBg) {
	animateIE(contentCont, 'top', '100%', 400);
	animateIE(mainBg, 'bottom', '0%', 400);
}

function openContentIE(contentCont, mainBg) {
	animateIE(contentCont, 'top', '80px', 400);
	animateIE(mainBg, 'bottom', '100%', 400);
}

function openNavIE(mainNav, menuToggle, contentCont, mainBg) {
	animateIE(mainNav, 'right', '0px', 400);
	animateIE(menuToggle, 'left', '15px', 400);
	animateIE(contentCont, 'left', '-94px', 400);
	animateIE(mainBg, 'left', '-94px', 400);
}

function closeNavIE(mainNav, menuToggle, contentCont, mainBg) {
	animateIE(mainNav, 'right', '-80px', 400);
	animateIE(menuToggle, 'left', '-59px', 400);
	animateIE(contentCont, 'left', '0px', 400);
	animateIE(mainBg, 'left', '0px', 400);
}

$(document).ready( function(){

	w = $(window);
	html = $('html');

	wrapper = $('#wrapper');
	imgCont = $('#bg', wrapper);
	loadingGif = $('#main-loading', wrapper);

	menuToggle = $('.menu-toggle');
	content = $('#content', wrapper);
	scrollCheck = $('#scroll-check', wrapper);

	if ( html.hasClass('no-csstransforms3d') ) {
		noTransition = true;
	}

	if ( html.hasClass('no-backgroundsize') ) {
		noBackgroundSize = true;
	}

	if (noTransition) {
		mainNav = $('#main-nav');
		mainBg = $('#bg', wrapper);
		contentCont = $('#content-cont', wrapper);
		animateIE(contentCont, 'top', '100%', 0);
		contentCont.css('display', 'block');
	}

	menuToggle.on(touchEvent, function(e){
		if ( html.hasClass('open-menu') ) {
			html.removeClass('open-menu');
			$('ul', '#main-nav').find('a').removeClass('active');
			if (noTransition) {
				closeNavIE(mainNav, menuToggle, contentCont, mainBg);
			}
		} else {
			html.addClass('open-menu');
			if (noTransition) {
				openNavIE(mainNav, menuToggle, contentCont, mainBg);
			}
		}
		e.preventDefault();
	});

	wrapper.on(touchEvent, '.next-link', function(){
		html.addClass('show-content');
		if (noTransition) {
			openContentIE(contentCont, mainBg);
		}
	});

	scrollCheck.on('scroll',chkScroll);

	w.on('resize', function(){
		imgCheckLoad();
	});

	w.on('orientationchange', function(){
		imgCheckLoad();
	});

	var openSection = width - 150,
		start;

	html.on('movestart', function(e) {
		start = e.startX;
		
		if ( html.hasClass('show-content') ) {
	    	if (scrollPos == 'top') {
	    		if ((e.distX > e.distY && e.distX < -e.distY)) {
					e.preventDefault();
				}
		    } 
		   	if (scrollPos == 'bottom') {
		        if ((e.distX < e.distY && e.distX > -e.distY)) {
					e.preventDefault();
				}
		    }
		   if ( scrollPos == 'scrolling' ) {
		   		window.scrollTo(0, 1);
				if ((e.distX < e.distY && e.distX > -e.distY) || (e.distX > e.distY && e.distX < -e.distY)) {
					$('.content-block').find('h2').removeClass('active');
					$('ul', '#main-nav').find('a').removeClass('active');
					e.preventDefault();
				}
		    }
		} 
		else {
			if ((e.distX < e.distY && e.distX > -e.distY)) {
				if ( !html.hasClass('show-content') ) {
					e.preventDefault();
				}
			}
			html.on('swipedown', function(e){
				scrollUp(e);
			});
			html.on('swipeup', function(e){
				scrollDown(e);
			});
		}
	});

	html.on('swipeleft', function(){
		if ( start > openSection) {
			openMenu();
		}
	});

	html.on('swiperight', function(){
		closeMenu();
		$('ul', '#main-nav').find('a').removeClass('active');
	});

	html.mousewheel( function(event, delta) {
		$('.content-block').find('h2').removeClass('active');
		$('ul', '#main-nav').find('a').removeClass('active');
		clearTimeout($.data(this, 'timer'));
		$.data(this, 'timer', setTimeout(function() {
			checkwheel = false;
		}, 150));
		
		if (!checkwheel) {
			checkwheel = true;
			if (delta == -1) {			
		    	scrollDown(event);
		    }
		    if (delta == 1) {
		    	if (scrollPos == 'top') {
			    	scrollUp(event);
			    }
		    }    
		}
	});

	$(document).keydown(function(e) {
	    switch(e.keyCode) { 
	        case 37:
	            if ( !html.hasClass('open-menu') ) {
					html.addClass('open-menu');
					if (noTransition) {
						openNavIE(mainNav, menuToggle, contentCont, mainBg);
					}
				}
	        break;
	        case 39:
		        if ( html.hasClass('open-menu') ) {
					html.removeClass('open-menu');
					$('ul', '#main-nav').find('a').removeClass('active');
					if (noTransition) {
						closeNavIE(mainNav, menuToggle, contentCont, mainBg);
					}
				}
	        break;
	        case 9:
		        if ( menuToggle.is(':focus') ) {
		        	if ( !html.hasClass('open-menu') ) {
						html.addClass('open-menu');
						if (noTransition) {
							openNavIE(mainNav, menuToggle, contentCont, mainBg);
						}
					}
		        }
		        if ( $('.icon-contacts').is(':focus') ) {
		        	if ( html.hasClass('open-menu') ) {
						html.removeClass('open-menu');
						if (noTransition) {
							closeNavIE(mainNav, menuToggle, contentCont, mainBg);
						}
					} 
					if ( !html.hasClass('show-content') && !html.hasClass('open-menu') ) {
						e.preventDefault();
						html.addClass('show-content');
						if (noTransition) {
							openContentIE(contentCont, mainBg)
						}
					}
		        }  	
	        break;
	        case 13:
	        	if ( $('.more-details').is(':focus') ) {
	        		$('.more-details:focus').trigger(touchEvent);
	        	}
	    }
	});

	$('.project').on( touchEvent, '.more-details', function(e){
		e.preventDefault();
		var el = $(this);
		if (noTransition) {
			var moreDetailsIE = el.parent('.project').find('.details');
		}
		if ( el.parent('.project').hasClass('show-details') ) {
			el.parent('.project').removeClass('show-details');
			if (noTransition) {
				animateIE(moreDetailsIE, 'left', '100%', 600);
			}
			el.find('.rotate-img').rotate({animateTo: 0}, 600);
		} else {
			el.parent('.project').addClass('show-details');
			el.find('.rotate-img').rotate({animateTo:-45}, 600);
			if (noTransition) {
				animateIE(moreDetailsIE, 'left', '0%', 600);
			}
		}
	});

	$('ul', '#main-nav').find('a').on( touchEvent, function(){

		$('ul', '#main-nav').find('a').removeClass('active');
		
		var el = $(this),
			elTarget = el.data('target'),
			target = $('#'+elTarget),
			contentBlock = $('.content-block'),
			margin = 40;

		el.addClass('active');

		contentBlock.find('h2').removeClass('active');
		target.find('h2').addClass('active');

		if ( elTarget == 'about-me' ) {
			margin = 0;
		}

		if ( elTarget == 'home' ) {
			if ( !html.hasClass('show-content') ) {
				return false;
			}
			scrollCheck.stop().animate({scrollTop: $('#about-me').position().top}, 600);
			setTimeout( function(){
				html.removeClass('show-content');
				if (noTransition) {
					closeContentIE(contentCont, mainBg);
				}
			}, 800);
		} else {
			if ( html.hasClass('show-content') ) {
				scrollCheck.stop().animate({scrollTop: target.position().top+margin}, 600);
			} else {
				html.addClass('show-content');
				if (noTransition) {
					openContentIE(contentCont, mainBg);
				}
				setTimeout( function(){
					scrollCheck.stop().animate({scrollTop: target.position().top+margin}, 600);
				}, 800);
			}
		}
	});
});

$(window).load( function(){
	imageLoad(imgCont, loadingGif, isPage);
	firstLoad = true;
	$('#reset').trigger(touchEvent);
});