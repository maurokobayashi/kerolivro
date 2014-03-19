var ajax_form = true;

$( document ).ready(function() { // Document ready

/*-----------------------------------------------------------------------------------*/
/*	01. PARALLAX SETTING
/*-----------------------------------------------------------------------------------*/


  	$(document).ready(function(){
		//.parallax(xPosition, speedFactor, outerHeight) options:
		//xPosition - Horizontal position of the element
		//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
		//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
		$('#header').parallax("center", 0.5, false);
	})

	trackPageView();
	setupMailChimp();



/*-----------------------------------------------------------------------------------*/
/*	02. NAVBAR STICKY + SELECTED
/*-----------------------------------------------------------------------------------*/



var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.cbp-af-header' ),
		didScroll = false,
		changeHeaderOn = 200;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 0 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'cbp-af-header-shrink' );
		}
		else {
			classie.remove( header, 'cbp-af-header-shrink' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();



/*-----------------------------------------------------------------------------------*/
/*	03. FADE IN EFFECTS
/*-----------------------------------------------------------------------------------*/


		$('.fade1').delay(400).fadeIn(2000);

		$('.fade2').delay(700).fadeIn(1500);

		$('.fade3').delay(1000).fadeIn(1500);



/*-----------------------------------------------------------------------------------*/
/*	04. Get the CBPSCROLLER
/*-----------------------------------------------------------------------------------*/


			new cbpScroller( document.getElementById( 'scroll-to-vantagens' ) );


/*-----------------------------------------------------------------------------------*/
/*	05. SMOOTH SCROLLING ON BUTTON
/*-----------------------------------------------------------------------------------*/


$('.button').click(function(e){
    $('html,body').scrollTo(this.hash,this.hash);
    e.preventDefault();
});


/*-----------------------------------------------------------------------------------*/
/*	06. FORM SENDER
/*-----------------------------------------------------------------------------------*/


	/* Form Submission */
	$('form').submit(function() {

		var form_data = $(this).serialize();

		if (validateEmail($('input[name=email]').attr('value')))
		{

			if (typeof ajax_form !== "undefined" && ajax_form === true)
			{

				$.post($(this).attr('action'), form_data, function(data) {
					$('form').show('slow', function() { $(this).after('<div class="clear"></div> <p class="msg-ok">'+ data + '</p>'); });
	  				$('.spam').hide();
	  				$('.msg-ok').delay(300).effect("pulsate", { times:1 }, 1000);
				});

				return false;

			}

		}

		else
		{
			$('p.spam').text('Please enter a valid e-mail').effect("pulsate", { times:3 }, 1000);
			return false;
		}

	});


/* Validate E-Mail */

function validateEmail(email) {
  // http://stackoverflow.com/a/46181/11236

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


/*-----------------------------------------------------------------------------------*/
/*	07. FLEXSLIDER - TESTIMONIAL
/*-----------------------------------------------------------------------------------*/


	$('#slider1').flexslider({
		animation: "fade",
		directionNav:false,
		controlNav:false,
		smoothHeight: true,
		animationLoop:true,
		slideshowSpeed: 3000,
		slideToStart: 0,
	});

	$('#slider2').flexslider({
		animation: "slide",
		directionNav:true,
		controlNav:false,
		smoothHeight: true,
		animationLoop:true,
		sync: "#slider1",
		slideshowSpeed: 3000,
		slideToStart: 0,
	});




/*-----------------------------------------------------------------------------------*/
/*	08. RESPONSIVE MENU
/*-----------------------------------------------------------------------------------*/

	jQuery("#collapse").hide();
	jQuery("#collapse-menu").on("click", function () {

	    jQuery("#collapse").slideToggle(300);
	    return false;

	}, function () {

	    jQuery("#collapse").slideToggle(300);
	    return false;
	});



/*-----------------------------------------------------------------------------------*/
/*	09. SUBSCRIPTION DIMMER
/*-----------------------------------------------------------------------------------*/

	$('#call-to-action-basico').click(function() {
		showSubscriptionForm("basico");
	});

	$('#call-to-action-premium').click(function() {
		showSubscriptionForm("premium");
	});

	function showSubscriptionForm(chosenPlan) {
		window.location.href = "#planos"
		$('.page.dimmer').dimmer('show');
		$('#mce-EMAIL').focus();
		$('#chosen-plan').val(chosenPlan);
		trackChoosePlan(chosenPlan);
	}

	$('#mc-embedded-subscribe').click(function() {
		var chosenPlan = $('#chosen-plan').val();
		trackSubscriptionSubmit(chosenPlan);
	})


/*-----------------------------------------------------------------------------------*/
/*	10. MIXPANEL TRACKING EVENTS
/*-----------------------------------------------------------------------------------*/

	function trackPageView() {
        console.log("page view tracked");
        mixpanel.register();
        mixpanel.track('page_view');
    }

    function trackChoosePlan(chosenPlan){
    	console.log("choose plan tracked: plan => " + chosenPlan);
        mixpanel.register({'plan': chosenPlan});
        mixpanel.track('choose_plan');
    }

    function trackSubscriptionSubmit(chosenPlan) {
    	console.log("subscription submit tracked: plan => " + chosenPlan);
        mixpanel.register({'plan': chosenPlan});
        mixpanel.track('subscription_submit');
    }

    function trackSubscriptionResponse(response) {
        mixpanel.register({'plan': 'blablabla'});
        if (response.result === 'success') {
            mixpanel.track("subscription_success");
       }
    }

/*-----------------------------------------------------------------------------------*/
/*	11. MAILCHIMP SETUP
/*-----------------------------------------------------------------------------------*/

    function setupMailChimp(){
		$.ajaxChimp.translations.pt = {
		    1: 'Parabéns! Enviamos para você um email de confirmação.',
		    2: 'Informe o seu endereço de email.',
		    3: 'Verifique o seu endereço de email.',
		    4: 'Verifique o seu endereço de email.',
		    5: 'Verifique o seu endereço de email.',
		    6: 'Houve um problema desconhecido. Entre em contato com digaoi@kerolivro.com.br para solicitar o seu convite.'
		};
		$('#mc-embedded-subscribe-form').ajaxChimp({
		    url: 'http://lendo.us3.list-manage2.com/subscribe/post?u=f57b68c75f9b145d89a30c396&amp;id=45d8a9988c',
		    callback: trackSubscriptionResponse,
		    language: 'pt'
		});
	}



















});
