$(window).scroll(function() {
	console.log(($(window).scrollTop()))
	if($(window).scrollTop() >= 100 && !$("#page-header").hasClass("page-header--scroll")) {
		$("#page-header").addClass("page-header--scroll")
	} else if($(window).scrollTop() < 100 && $("#page-header").hasClass("page-header--scroll")) {
		$("#page-header").removeClass("page-header--scroll")
	}
});