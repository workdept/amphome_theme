(function($, Drupal, window, document, undefined) {


    Drupal.behaviors.my_custom_behavior = {
        attach: function(context, settings) {
            //Shorten people bio on person page
    	        $(".view-people .views-field-body").shorten({
    				moreText: 'read more',
    				lessText: 'read less',
    				showChars: 50
				});
            
        }
    };


})(jQuery, Drupal, this, this.document);