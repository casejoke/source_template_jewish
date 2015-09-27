$(document).ready(function() {
	console.log('ready document');
	visual.init();
});
$(window).on('resize', function(){
	visual.resize();
});
$(window).on('load', function(){
  	visual.preloader();
  	
});
$(window).on('scroll', function(){
    visual.scrolling();
});