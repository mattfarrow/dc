$(document).ready(function(){
  // This is the minimum viewport width at which overlays will be enabled. This is viewport width, not device width
  var minOverlayWidth = 800;
  loadLargeThumbnails(minOverlayWidth);  
  zoomSetup(minOverlayWidth);
  });

function loadLargeThumbnails(w){
  // Small thumbnails are loaded by default. If the viewport is above the threshold supplied in the w argument, these are replaced by larger thumbnails
  // This involves double loading, but it should be only on larger (assume desktop) devices where bandwidth may not be at such a premium
  var viewportWidth = document.documentElement.clientWidth;  
  if(viewportWidth > w){
	$('figure img').each(function(i){
	  if($(this).attr('data-full-thumbnail')){
		var tempImage = new Image();
		var fullThumbnail = $(this).attr('data-full-thumbnail');
		tempImage.src = fullThumbnail;
	    this.src = tempImage.src;
		}
	  });
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
	  $(gallery).find('.zoom').empty().append('<img style="width: 100%;" src="' + $(this).attr('href') + '" />');
	  $(gallery).find('.zoom').append('<div class="zoom-close">Close</div>');
	  $(gallery).find('.zoom').append('<p class="zoom-caption">' + $(this).attr('title') + '</p>').bind('click', function(a){
	    $(this).empty();
	    });
	  e.preventDefault();
	  });
    });
  }