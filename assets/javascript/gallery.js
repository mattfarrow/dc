var standardImagesLoaded = false;
var deviceClass = 'small';

$(document).ready(function(){
  //setLastChild();
  //setupCaptions();
  //setDeviceClass(checkDeviceClass());
  //loadLargeThumbnails();
  zoomSetup();
  $(window).resize(function(){
    handleResize();
    });
  });

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
  
function setLastChild(){
  // Older versions of IE (<9) don't support the nth-child CSS3 selector, so for these, use JavaScript instead
  //if ($.browser.msie && parseInt($.browser.version, 10) < 9){
    $('.gallery figure:nth-child(4n+4)').addClass('last'); 
   // }	
  }
  
  
function handleResize(){
  if(deviceClass != checkDeviceClass()){
    //$('.gallery').find('a').unbind();
	$('.enlarge').unbind();
    $('.zoom').remove();
	setLastChild();
	setDeviceClass(checkDeviceClass());
    loadLargeThumbnails();
    zoomSetup();
	}
  }
  
function setupCaptions(){
  // Add the captions to the title attribute of the links to be picked up by fancybox
  $('.gallery').find('figcaption').each(function(i){
	var captionElement = this;
	var caption = $(this).text();
	$(captionElement).parent().find('a').attr('title', caption);
	});	
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
  //$('.gallery').find('a').unbind();
  //$('.zoom').remove();


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
	  //$(gallery).find('.zoom').append('<p class="zoom-caption">' + caption + '</p>').bind('click', function(a){
	  if(zoom.is(':hidden')){
	    zoom.show('medium');
		}
	  e.preventDefault();
	  });
    });
  }