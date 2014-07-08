$(document).ready(function(){

	/*-----------------------------------------------------------------------------*/

	var sections = new Array(20);
	var value = 5;
	$.each(sections, function(index, item){		
		$('.statistic-box-percentage').append('<span title="'+value+'%"></span>');
		value = value + 5;
	});	

	$.each($('.statistic-box-percentage'), function(index, item){
	
		var porc = $(this).data('percentage');
		var cant = porc / 5;
		var color = $(this).data('color');
	
		$.each($(this).find('span'),function(index, item){
			if(index < cant){
				$(this).addClass(color);
			}
		});
	})

	/*-----------------------------------------------------------------------------*/

	$('.nav-mobile-link').on('click', function(){
		$(this).hide();	
		$('nav').addClass('active');
		$('nav ul.nav-left li').addClass('active');
		$('.nav-mobile-close').css('display','inline-block');
		$('.nav-right').show();
	});

	$('.nav-mobile-close').on('click', function(){
		$(this).hide();	
		$('nav').removeClass('active');
		$('nav ul.nav-left li').removeClass('active');
		$('.nav-mobile-link').css('display','inline-block');
		$('.nav-right').hide();
	});

	$('.nav-link-home > span').on('click',function(){

		if($(window).width() < 640 && $('.nav-right').is(':visible')) {
			$('.nav-mobile-close').click();
		}

		$('html, body').stop().animate({
			'scrollTop': 0
		}, 600, 'swing');
	})

	/*-----------------------------------------------------------------------------*/

	var nav_height = $('nav').outerHeight();
	var section_height = $(window).height() - nav_height;
	$('section').each(function(index, element){
		$(element).css('min-height',section_height);
	});
	$('.footer-content').css({
		'height' : (section_height - $('.footer-copyright').outerHeight())+'px'
	});

	var section_top = new Array();
	$('section').each(function(index, element){
		var name = $(element).attr('id');
		section_top[index] = parseInt($(element).offset().top - nav_height);
	});
	
	$('.nav-right li').each(function(index, element){
		var self = this;
		$(element).on('click', function(){

			$('.nav-right li').removeClass('selected');
			$(element).addClass('selected');

			$('html, body').stop().animate({
				'scrollTop': section_top[index]
			}, 600, 'swing');

			if($(window).width() < 640 && $('.nav-right').is(':visible')) {
				$('.nav-mobile-close').click();
			}
		})
	});

	var footer_top = $('footer').offset().top - nav_height;
	$(window).on('scroll', function(){
		var window_top = $(window).scrollTop();

		if($(window).width() < 640 && $('.nav-right').is(':visible')){
			$('nav').addClass('active');
		}else{
			if( window_top >= section_top[0]){
				$('nav').addClass('active');
			}else{
				$('nav').removeClass('active');
			}
		}
		
		if( window_top >= section_top[0] &&
			window_top < section_top[1] ){
			
			$('.nav-right li').removeClass('selected');
			$($('.nav-right li')[0]).addClass('selected');


		}else if( window_top >= section_top[1] &&
				  window_top < section_top[2]){

			$('.nav-right li').removeClass('selected');
			$($('.nav-right li')[1]).addClass('selected');

		}else if(window_top >= section_top[2] &&
				 window_top < footer_top){

			$('.nav-right li').removeClass('selected');
			$($('.nav-right li')[2]).addClass('selected');

		}else{
			$('.nav-right li').removeClass('selected');
		}
	});

	/*-----------------------------------------------------------------------------*/

});