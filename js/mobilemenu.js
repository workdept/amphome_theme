(function($, Drupal, window, document, undefined) {


    Drupal.behaviors.my_custom_behavior = {
        attach: function(context, settings) {
            //Toggle the sub menu navigation
            $("#block-block-2 button").click(function() {
                $('#block-block-2').toggleClass("closed");
                $("section.block-menu-block nav").toggle();
                $('#block-block-2 span').toggleClass("hidden");
            });

        }
    };


})(jQuery, Drupal, this, this.document);