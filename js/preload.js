
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
	isPage = document.getElementsByTagName('html')[0].getAttribute('data-page'),
	preload,
	
	supportsTouch = 'touchend' in document,
	touchEvent = 'touchend',

	w,
	html,

	desktopCheck = false,
	tabletPortraitCheck = false,
	tabletLandscapeCheck = false,
	mobilePortraitCheck = false,  
	mobileLandscapeCheck = false, 

	desktopLoad = false,
	tabletPortraitLoad = false,
	tabletLandscapeLoad = false,
	mobilePortraitLoad = false,
	mobileLandscapeLoad = false,

	imgCont,
	loadingGif,
	imagesArray,

	scrollPos = 'top',
	content,
	scrollCheck,

	checkwheel = false,
	noTransition = false,
	noBackgroundSize = false,

	mainNav,
	menuToggle,
	wrapper,
	contentCont,
	mainBg,

	firstLoad = false,
	preloadImg,

	data = {
		"bg": {
			"desktop": [
				{
					"cdn": "http://d2lhauywih9yae.cloudfront.net/img/desktop/bg.jpg",
					"local": "/img/desktop/bg.jpg",
					"valideUrl": ""
				}
			],
			"tablet": {
				"portrait": [
					{
						"cdn": "http://d2lhauywih9yae.cloudfront.net/img/tablet/portrait/bg.jpg",
						"local": "/img/tablet//portraitbg.jpg",
						"valideUrl": ""
					}
				],
				"landscape": [
					{
						"cdn": "http://d2lhauywih9yae.cloudfront.net/img/tablet/landscape/bg.jpg",
						"local": "/img/tablet/landscape/bg.jpg",
						"valideUrl": ""
					}
				]
			},
			"mobile": {
				"portrait": [
					{
						"cdn": "http://d2lhauywih9yae.cloudfront.net/img/mobile/portrait/bg.jpg",
						"local": "/img/mobile/portrait/bg.jpg",
						"valideUrl": ""
					}
				],
				"landscape": [
					{
						"cdn": "http://d2lhauywih9yae.cloudfront.net/img/mobile/landscape/bg.jpg",
						"local": "/img/mobile/landscape/bg.jpg",
						"valideUrl": ""
					}
				]
			}
		}	
	};

function preloadImgs(preload){
	for (var i = 0; i < preload.length; i++) {
		preloadImg = new Image(); 
		preloadImg.onerror = errorImg;
		preloadImg.src = ''+preload[i].cdn+'';
		preloadImg.className = i;
		preload[i].valideUrl = preload[i].cdn;
	}
}

function errorImg() {
	var idx = this.className;
	this.src = ''+preload[idx].local+'';
	preload[idx].valideUrl = preload[idx].local;
	if (firstLoad) {
		imageLoad(imgCont, loadingGif, isPage);
	}
}

if (!supportsTouch) { 
	touchEvent = 'click';
}

// FIRST RES CHECK

if ( width > 1024 ) {
	preload = data[''+isPage+'']['desktop'];
	preloadImgs(preload);
	desktopCheck = true;
} 
if ( width <= 1024 && width > 767) {
	if ( width < height) {
		preload = data[''+isPage+'']['tablet']['portrait'];
		preloadImgs(preload);
		tabletPortraitCheck = true;
	} else {
		preload = data[''+isPage+'']['tablet']['landscape'];
		preloadImgs(preload);
		tabletLandscapeCheck = true;
	}
} 
if ( width <= 767 ) {
	if ( width < height) {
		preload = data[''+isPage+'']['mobile']['portrait'];
		preloadImgs(preload);
		mobilePortraitCheck = true;
	} else {
		preload = data[''+isPage+'']['mobile']['landscape'];
		preloadImgs(preload);
		mobileLandscapeCheck = true;
	}
}