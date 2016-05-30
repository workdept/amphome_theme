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

    Drupal.behaviors.homepagehoverslides = {
        attach: function(context, settings) {
            enquire.register("all and (min-width: 991px)", {
                match: function(context) {

                    if ($('#homepage .field-name-field-home-box-image img').parent().is("div")) {
                        $('#homepage .field-name-field-home-box-image img').unwrap();
                    }

                    var isFirst = true;
                    //box 1
                    $('#homepage .first-box .field-name-field-home-box-image .field-items img:gt(0)').hide();
                    $("#homepage .first-box .field-name-field-home-box-image .field-items").hover(function() {
                        if (isFirst) {
                            timer = setInterval(function() {
                                    $('#homepage .first-box .field-name-field-home-box-image .field-items :first-child').fadeOut()
                                        .next('img').fadeIn()
                                        .end().appendTo('#homepage .first-box .field-name-field-home-box-image .field-items');
                                },
                                700);
                            isFirst = false;
                        }
                    }, function() {
                        clearInterval(timer);
                        isFirst = true;
                    });

                    var isFirst1 = true;
                    //box 2
                    $('#homepage .second-box .field-name-field-home-box-image .field-items img:gt(0)').hide();
                    $("#homepage .second-box .field-name-field-home-box-image .field-items").hover(function() {
                        if (isFirst1) {
                            timer = setInterval(function() {
                                    $('#homepage .second-box .field-name-field-home-box-image .field-items :first-child').fadeOut()
                                        .next('img').fadeIn()
                                        .end().appendTo('#homepage .second-box .field-name-field-home-box-image .field-items');
                                },
                                700);
                            isFirst1 = false;
                        }
                    }, function() {
                        clearInterval(timer);
                        isFirst1 = true;
                    });

                    $('#homepage .first-box').on('click', function() {
                        window.location = $('#homepage .first-box .field-name-field-home-box-link .field-item').text();
                    });
                    $('#homepage .second-box').on('click', function() {
                        window.location = $('#homepage .second-box .field-name-field-home-box-link .field-item').text();
                    });
                }
            });
            unmatch: function(context) {
                // Hide sidebar
            }
        }
    };

})(jQuery, Drupal, this, this.document);