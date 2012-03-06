var standardImagesLoaded = false;
var deviceClass = 'small';

html5elements();

$(document).ready(function(){  
  setDeviceClassIndicators();
  setLastChild();
  setupCaptions();
  setDeviceClass(checkDeviceClass());
  loadLargeThumbnails();
  zoomSetup();
  //$('#homepage-main-image').cycle({
  //  timeout: 7000,speed: 1500});
  //$('#homepage-main-image').cycle();
  homepageSlideshow();
  $(window).resize(function(){
    handleResize();
    });
  });


function html5elements(){
  // Tells IE that new HTML5 elements are real
  var elements = new Array('article','aside','figure','figcaption','footer','header','nav','section');
  for(var i=0; i<elements.length; i++){
    document.createElement(elements[i]);
	}
  }
  


function setDeviceClassIndicators(){
  // Inserts a couple of empty spans into the DOM so that they can be used to determine when a media query has been triggered
  // The 'standard' span is hidden when the small device stylesheet is in use and vice-versa
  // This avoids necessity to set breakpoints in JavaScript and CSS and also gets around problems associated with scrollbars and the width of the viewport
  $('body').append('<span class="decvice-class" id="standard"></span>');
  $('body').append('<span class="decvice-class" id="small"></span>');
  }

function setupCaptions(){
  // Add the captions to the title attribute of the links to be picked up by fancybox
  $('figure').find('figcaption').each(function(i){
	var captionElement = this;
	var caption = $(this).text();
	$(captionElement).parent().find('a').attr('title', caption);
	});	
  }
  
function setDeviceClass(dc){
  deviceClass = dc;
  }
  
function checkDeviceClass(){
  //console.log($('#main-content').css('text-align'));
  //if($('#test').css('text-align') == 'right'){
  if($('#standard').css('display') == 'inline'){
    //deviceClass = 'standard';
	return 'standard';
	}
  else{
    //deviceClass = 'small';
	return 'small';
	}
  }  

function loadLargeThumbnails(){
  // Small thumbnails are loaded by default. If the viewport is above the threshold supplied in the w argument, these are replaced by larger thumbnails
  // This involves double loading, but it should be only on larger (assume desktop) devices where bandwidth may not be at such a premium
  if(deviceClass == 'standard'){
    if(!standardImagesLoaded){
	  $('figure img').each(function(i){
	    if($(this).attr('data-standard-image')){
		  var tempImage = new Image();
		  var fullThumbnail = $(this).attr('data-standard-image');
		  $(this).attr('data-thumbnail-image', $(this).attr('src'));
		  tempImage.src = fullThumbnail;
	      this.src = tempImage.src;		
		  }
	    });
	  standardImagesLoaded = true;
	  }
	else{
	  $('figure img').each(function(i){
	    $(this).attr('src', $(this).attr('data-standard-image'));
		});
	  }
	}
  else{
	if(standardImagesLoaded){
	  $('figure img').each(function(i){
	    if($(this).attr('data-thumbnail-image')){
		  var smallThumbnailSource = $(this).attr('data-thumbnail-image');
		  this.src = smallThumbnailSource;
		  }
		});
	  }
	}
  }  

function zoomSetup(){
  if(deviceClass == 'standard'){
    lightboxSetup();
    }
  else{
    smallZoomSetup();
    }
  }

function lightboxSetup(){
  // Apply the right rel attribute to gallery links to make fancybox recognise they're a gallery
  $('.gallery').each(function(){
    var gallery = this;
	var galleryId = $(this).attr('id');
	$(gallery).find('a').each(function(){
	  $(this).attr('rel', galleryId);
	  });
	});  
  // Initialise fancybox
  //$('.gallery').find('a').fancybox({'titlePosition'	:	'over','transitionIn' : 'elastic', 'transitionOut' : 'elastic'});
  //$('.gallery').find('a').fancybox();
  $('.enlarge').fancybox({'titlePosition'	:	'over','transitionIn' : 'elastic', 'transitionOut' : 'elastic'});  
  }
  
  
function smallZoomSetup(){
  $('.gallery').each(function(i){
    var gallery = this;
	// Create a placeholder for the zoomed image
	//$(gallery).find('.zoom').remove();
	$(gallery).prepend('<div class="zoom"></div>');
	$(gallery).find('a').bind('click', function(e){
	  var zoom = $(gallery).find('.zoom');
      zoom.append('<div class="zoom-close"><span>Close</span></div>').bind('click', function(e){
	    zoom.hide('medium');
	    });
 	  var cacheImage = document.createElement('img');
	  var caption = $(this).attr('title');
	  cacheImage.onload = function(){
	    zoom.find('img').addClass('tester');
 	    zoom.get(0).appendChild(cacheImage);
	    zoom.find('.tester').hide();
		zoom.find('.zoom-caption').remove();
		zoom.append('<p class="zoom-caption">' + caption + '</p>');
		}
	  cacheImage.src = $(this).attr('href');
	  if(zoom.is(':hidden')){
	    zoom.show('medium');
		}
	  e.preventDefault();
	  });
    });
  }
  
  
function handleResize(){
  if(deviceClass != checkDeviceClass()){
	$('.enlarge').unbind();
    $('.zoom').remove();
	setLastChild();
	setDeviceClass(checkDeviceClass());
    loadLargeThumbnails();
    zoomSetup();
	}
  }
  
function setLastChild(){
  // Older versions of IE (<9) don't support the nth-child CSS3 selector, so for these, use JavaScript instead
  //if ($.browser.msie && parseInt($.browser.version, 10) < 9){
    $('.gallery figure:nth-child(4n+4)').addClass('last'); 
   // }	
  }
  
  
  
function homepageSlideshow(){
  if($('body').attr('id') == 'homepage'){
    //if(deviceClass == 'standard'){
      $('#homepage-main-image').cycle({
        timeout: 7000,speed: 1500
	    });
	  //}
    }
  }  
  
  
  
  
 	
  /* 
  var imageDuration = 7000;
  var fadeInTime = 1500;
  var imgs, totalImages, currentImage = 0;  
  $(document).ready(function(){  
    totalImages = $('#homepage-main-image img').size();
    if(totalImages > 1){	  
	  $('#homepage-main-image img:gt(0)').hide();
	  $('#homepage-main-image img').addClass('fader');
	  $('#homepage-main-image').addClass('fadeContainer');
	  animateImages();
	  }
	});
	
  function animateImages(){
    var timer = setTimeout('showImage()', imageDuration);  
    }
	
  function showImage(){
    $('#homepage-main-image img:eq('+currentImage+')').fadeOut(1000);
	if(currentImage < totalImages -1)currentImage += 1;
    else currentImage = 0;
	$('#homepage-main-image img:eq('+currentImage+')').fadeIn(fadeInTime);  
    animateImages();
    }
 

  function showImage(){
    $('#homepage-main-image img:eq('+currentImage+')').fadeOut(500, function(){
	  if(currentImage < totalImages -1)currentImage += 1;
      else currentImage = 0;
	  $('#homepage-main-image img:eq('+currentImage+')').fadeIn(fadeInTime);  
      animateImages();	
	  });
    }
 */	