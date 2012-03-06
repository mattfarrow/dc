var currentView = 'small';
var largeThumbnailsLoaded = false;

$(document).ready(function(){
  // This is the minimum viewport width at which overlays will be enabled. This is viewport width, not device width
  var minOverlayWidth = 800;
  loadLargeThumbnails(minOverlayWidth);
  zoomSetup(minOverlayWidth);
  $(window).resize(function(){
    loadLargeThumbnails(minOverlayWidth);
    zoomSetup(minOverlayWidth);
    });
  });

function loadLargeThumbnails(w){
  // Small thumbnails are loaded by default. If the viewport is above the threshold supplied in the w argument, these are replaced by larger thumbnails
  // This involves double loading, but it should be only on larger (assume desktop) devices where bandwidth may not be at such a premium
  var viewportWidth = document.documentElement.clientWidth;  
  if(viewportWidth > w){
    if(!largeThumbnailsLoaded){
	  $('figure img').each(function(i){
	    if($(this).attr('data-full-thumbnail')){
		  var tempImage = new Image();
		  var fullThumbnail = $(this).attr('data-full-thumbnail');
		  $(this).attr('data-small-thumbnail', $(this).attr('src'));
		  tempImage.src = fullThumbnail;
	      this.src = tempImage.src;		
		  }
	    });
	  largeThumbnailsLoaded = true;
	  //console.log('Loaded the large thumbnails: ' + largeThumbnailsLoaded);
	  }
	}
  else{
	if(largeThumbnailsLoaded){
	  $('figure img').each(function(i){
	    if($(this).attr('data-small-thumbnail')){
		  var smallThumbnailSource = $(this).attr('data-small-thumbnail');
		  this.src = smallThumbnailSource;
		  }
		});
	  }
	}	
  }
  
function zoomSetup(w){
  if(document.documentElement.clientWidth > w){
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

  // Add the captions to the title attribute of the links to be picked up by fancybox
  $('.gallery').find('figcaption').each(function(i){
	var captionElement = this;
	var caption = $(this).text();
	$(captionElement).parent().find('a').attr('title', caption);
	});
  
  // Initialise fancybox
  $('.gallery').find('a').fancybox({'titlePosition'	:	'over','transitionIn' : 'elastic', 'transitionOut' : 'elastic'});
  //$('.gallery').find('a').fancybox();
  }
  
  
function smallZoomSetup(){
  // Add the captions to the title attribute of the links to be picked up by fancybox
  $('.gallery').find('figcaption').each(function(i){
	var captionElement = this;
	var caption = $(this).text();
	$(captionElement).parent().find('a').attr('title', caption);
	});
  $('.gallery').each(function(i){
    var gallery = this;
	// Create a placeholder for the zoomed image
	$(gallery).prepend('<div class="zoom"></div>');
	$(gallery).find('a').bind('click', function(e){
	  //$(gallery).find('.zoom').empty().append('<img style="width: 100%;" src="' + $(this).attr('href') + '" />');
	  //$(gallery).find('.zoom').append('<div class="zoom-close"><span>Close</span></div>');
	  //$(gallery).find('.zoom').append('<p class="zoom-caption">' + $(this).attr('title') + '</p>').bind('click', function(a){
	    //$(this).empty();
	    //});
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