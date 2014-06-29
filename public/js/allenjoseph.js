$(document).ready(function(){

	var sections = new Array(20);

	$.each(sections, function(index, item){
		$('.statistic-box-percentage').append("<span></span>");
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
});