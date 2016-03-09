var mouse_down = "click";

var time = 500;

var transitions_av = true;
var min_window_h = 650;
var navbar = $('.navbar-custom'),
	navHeight   = navbar.height(),
    modules = $('.module---hero, .module, .module---small'),
    windowWidth = Math.max($(window).width(), window.innerWidth),
    navbatTrans;



var visual = {
    init: function() {
        visual.initColorNavbar(navbar);
        visual.navbarCheck(navbar);
        visual.navbarAnimation(navbar);
        visual.moduleInit(); //
        visual.scaleContent();
        
       // document.ontouchmove = function(event) {
            // event.preventDefault();
        //}
        if (!Modernizr.csstransitions || !Modernizr.cssanimations) {
            transitions_av = false;
            $.fn.transition = $.fn.animate;
            $.fn.transitionStop = $.fn.stop;
        }

        if (mobile) {
            mouse_down = "touchstart";
        }
		/* ---------------------------------------------- */
		$(document).on(mouse_down,'.section-scroll',function(e){
			e.preventDefault();
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);

		});
        $(document).on(mouse_down,'.dropdown-toggle',function(e){
            e.preventDefault();

        });
        
        if($('#filter').length >0){
            $('#filter').on('affix.bs.affix', function () {
              console.log('affix.bs.affix');
              $('#filter').addClass('col-sm-4').addClass('col-md-3');
            });
             $('#filter').on('affix-top.bs.affix', function () {
              console.log('affix-top.bs.affix');
              $('#filter').removeClass('col-sm-4').removeClass('col-md-3');
            });
        }
        


    },
    scrolling: function() {
        visual.navbarAnimation(navbar);
    },
    resize: function() {
        visual.moduleResize();
        visual.scaleContent();
    },
    moduleInit: function() {
        modules.each(function() {
        	/* ---------------------------------------------- /*
			 * Set module backgrounds
			/* ---------------------------------------------- */
            if ($(this).attr('data-background')) {
                $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
            }
            /* ---------------------------------------------- /*
			 * Set height module
			/* ---------------------------------------------- */
            if ($(this).hasClass('module--hero')) {
                if ($(window).height() > min_window_h) {
                    $(this).height($(window).height() *0.6);
                } else {
                    $(this).height(min_window_h *0.6);
                }
            }
            /* ---------------------------------------------- /*
			 * Set full-height module
			/* ---------------------------------------------- */
            if ($(this).hasClass('module--full-height')) {
                if ($(window).height() > min_window_h) {
                    $(this).height($(window).height() - 120);
                } else {
                    $(this).height(min_window_h - 120);
                }
            }
             /* ---------------------------------------------- /*
			 * Set parallax module
			/* ---------------------------------------------- */
            if (mobile === true) {
                if ($(this).hasClass('.module--parallax')) {
                    $(this).css({
                        'background-attachment': 'scroll'
                    });
                }
            } else {
                if ($(this).hasClass('.module--parallax')) {
                    $(this).css({
                        'background-attachment': 'fixed'
                    });
                }
            }
        });
    },
    moduleResize: function() {
        modules.each(function() {
            if ($(this).hasClass('module--hero')) {
                if ($(window).height() > min_window_h) {
                    $(this).height($(window).height() *0.6);
                } else {
                    $(this).height(min_window_h *0.6);
                }
            }
            if ($(this).hasClass('module--full-height')) {
                if ($(window).height() > min_window_h) {
                    $(this).height($(window).height() - 120);
                } else {
                    $(this).height(min_window_h - 120);
                }
            }
        });

    },
    initColorNavbar:function(navbar){
        if ($('.module--initnavbar').attr('data-navbar')) {
            navbar.addClass($('.module--initnavbar').attr('data-navbar'));
        }
    },
    navbarAnimation: function(navbar) {
    	/* ---------------------------------------------- /*
		 * Transparent navbar animation
		/* ---------------------------------------------- */
        var topScroll = $(window).scrollTop();
        if (navbar.length > 0 && navbatTrans !== false) {
            if (topScroll >= navHeight) {
                navbar.removeClass('navbar-transparent');
            } else {
                navbar.addClass('navbar-transparent');
            }
        }

    },
    navbarCheck: function() {
        if (navbar.length > 0 && navbar.hasClass('navbar-transparent')) {
            navbatTrans = true;
        } else {
            navbatTrans = false;
        }
    },
    preloader: function() {
        console.log('preload');
        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    },


    scaleContent: function() {}
};
