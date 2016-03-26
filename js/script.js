(function($, Drupal, window, document, undefined) {


    Drupal.behaviors.shorten = {
        attach: function(context, settings) {
            //Shorten people bio on person page
    	        $(".view-people .views-field-body").shorten({
    				moreText: 'read more',
    				lessText: 'read less',
    				showChars: 650
				});
            
        }
    };


})(jQuery, Drupal, this, this.document);