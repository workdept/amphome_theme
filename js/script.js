(function($, Drupal, window, document, undefined) {


    Drupal.behaviors.shorten = {
        attach: function(context, settings) {
            //Shorten people bio on person page
            $(".view-people .views-field-body").expander({
                slicePoint: 610,
                expandEffect: 'slideDown',
                expandSpeed: 0,
                collapseEffect: 'slideUp',
                collapseSpeed: 0,
            });
        }
    };

    Drupal.behaviors.sponsoredprojects = {
        attach: function(context, settings) {
            //Move the donate button from the menu
            $('a:contains("Donate")').addClass.("donate");
        }
    };

})(jQuery, Drupal, this, this.document);