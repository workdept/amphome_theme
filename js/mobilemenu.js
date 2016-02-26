(function($, Drupal, window, document, undefined) {


    Drupal.behaviors.my_custom_behavior = {
        attach: function(context, settings) {
            //Toggle the sub menu navigation
            $("#block-block-2 button").click(function() {
                $('#block-block-2').toggleClass("closed");
                $(".main-container section.block-menu-block nav").toggle();
                $('#block-block-2 span').toggleClass("hidden");
            });
            
            $("#block-block-3 button").click(function() {
                $('#block-block-3').toggleClass("closed");
                $(".main-container section.block-menu-block nav").toggle();
                $('#block-block-3 span').toggleClass("hidden");
            });

        }
    };


})(jQuery, Drupal, this, this.document);