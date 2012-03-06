  var imageDuration = 7000;
  var fadeInTime = 1500;
  var imgs, totalImages, currentImage = 0;  
  $(document).ready(function(){  
    totalImages = $('#mainImage img').size();
    if(totalImages > 1){	  
	  $('#mainImage img:gt(0)').hide();
	  $('#mainImage img').addClass('fader');
	  $('#mainImage').addClass('fadeContainer');
	  animateImages();
	  }
	});
	
  function animateImages(){
    var timer = setTimeout('showImage()', imageDuration);  
    }
	
  function showImage(){
    $('#mainImage img:eq('+currentImage+')').fadeOut(1000);
	if(currentImage < totalImages -1)currentImage += 1;
    else currentImage = 0;
	$('#mainImage img:eq('+currentImage+')').fadeIn(fadeInTime);  
    animateImages();
    }