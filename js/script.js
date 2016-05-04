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

    Drupal.behaviors.sponsoredprojectsmenu = {
        attach: function(context, settings) {
            //Special style for the donate button
            $("a:contains(Donate)").parent().addClass("donate");

            // Move the menu title into the ul
            var textToInsert = $('#block-menu-block-1 h2 a');
            $('#block-menu-block-1 .navbar-nav').prepend(textToInsert);
            $('#block-menu-block-1 .navbar-nav > a').text('Home').addClass('home-link');

            $('.section-sponsoredprojects #block-menu-block-1 span').each(function() {
                $(this)
                    .removeAttr('data-target')
                    .removeAttr('data-toggle');
            });

            if ($('.section-sponsoredprojects #block-menu-block-1 .navbar-nav').find('li li').length > 0) {
                $('.section-sponsoredprojects #block-menu-block-1').addClass('subheadings');
            }
        }
    };

    Drupal.behaviors.toggledonations = {
         attach: function(context, settings) {

            $(".btn.donate-monthly").click(function() {
                $(".btn").not(this).removeClass("active");
                $(this).addClass("active");
                $(".donate-once-form").removeClass("open");
                $(".donate-monthly-form").addClass("open");
            });

            $(".btn.donate-once").click(function() {
                $(".btn").not(this).removeClass("active");
                $(this).addClass("active");
                $(".donate-monthly-form").removeClass("open");
                $(".donate-once-form").addClass("open");
            });

         }
     };

})(jQuery, Drupal, this, this.document);