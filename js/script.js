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
            $("a:contains(Donate Once)").parent().addClass("donate-once-menu-link");

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

    Drupal.behaviors.homepagehoverslides = {
        attach: function(context, settings) {

            // Cycle homepage slideshow left
            $('#homepage .first-box .field-name-field-home-box-image .field-items').cycle({
                fx: 'none',
                speed: 1000,
                timeout: 70,
            }).cycle("pause");

            // Pause; play on hover
            $('#homepage .first-box .field-name-field-home-box-image').hover(function() {
                $(this).find('.field-items').addClass('active').cycle('resume');
            }, function() {
                $(this).find('.field-items').removeClass('active').cycle('pause');
            });

            // Cycle homepage slideshow right
            $('#homepage .second-box .field-name-field-home-box-image .field-items').cycle({
                fx: 'none',
                speed: 1000,
                timeout: 70
            }).cycle("pause");

            // Pause; play on hover
            $('#homepage .second-box .field-name-field-home-box-image').hover(function() {
                $(this).find('.field-items').addClass('active').cycle('resume');
            }, function() {
                $(this).find('.field-items').removeClass('active').cycle('pause');
            });

            // Turn homepage images into links
            $('#homepage .first-box').on('click', function() {
                window.location = $('#homepage .first-box .field-name-field-home-box-link .field-item').text();
            });
            $('#homepage .second-box').on('click', function() {
                window.location = $('#homepage .second-box .field-name-field-home-box-link .field-item').text();
            });

            //Add a class to image links
            $('img').parent('a').addClass('contains-image');
        }
    };

})(jQuery, Drupal, this, this.document);