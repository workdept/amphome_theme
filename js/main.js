(function($) {

Drupal.behaviors.amphome_menu = {
  util: {
    style_for_breadcrumbs: function(context) {
      if (Drupal.behaviors.amphome_menu.state.showing_breadcrumbs && $('.breadcrumb').length > 0) {
        $('h1.page-header', context).hide();
      }
    },
    unstyle_for_breadcrumbs: function(context) {
      $('h1.page-header', context).show();
    }
  },

  state: {
    showing_breadcrumbs: true
  },

  attach: function(context, settings) {
    enquire.register("all and (max-width: 991px)", {
      match: function(context) {
        $('.navbar-nav .dropdown-menu', context).each(function() {
          $(this).addClass('dropdown-menu-deactivated');
          $(this).removeClass('dropdown-menu');
          $(this).siblings('a').removeAttr('data-toggle');
        });
        Drupal.behaviors.amphome_menu.util.style_for_breadcrumbs();
      },
      unmatch: function(context) {
        $('.navbar-nav .dropdown-menu-deactivated', context).each(function() {
          $(this).addClass('dropdown-menu');
          $(this).removeClass('dropdown-menu-deactivated');
        });
        Drupal.behaviors.amphome_menu.util.unstyle_for_breadcrumbs();
      }
    });

    enquire.register("all and (min-width: 992px)", {
      match: function(context) {
        $('#navbar .navbar-nav > li > a', context).each(function() {
          $(this)
            .removeAttr('data-target')
            .removeAttr('data-toggle');
        });

        var $menuparents = $("#navbar nav > ul > li > ul.dropdown-menu", context);
        var logo_width = $('#navbar > div > div.col.col-xs-12.col-md-2').outerWidth();
        var header_height = $('#navbar').parent().outerHeight(); // .fullwidth parent wrapper
        var container_width = $('.main-container > div > section').css('width');

        $('#navbar .navbar-nav > li.active-trail', context)
          .addClass('open');

        $menuparents.each(function() {
          var $menuparent = $(this);
          var left = logo_width + $menuparent.parent().position().left;

          $menuparent
            .addClass('menuparent')
            .css({
              width: container_width,
              position: 'absolute',
              left: '-' + left + 'px',
              top: header_height + 'px'
            });

          // add class to menus with 3rd level links
          if ($menuparent.find('li li').length > 0) {
            $menuparent.addClass('grandparent');
          }

          // hide the 3rd level link menu when a grandparent menu is in active trail
          if ($("#navbar nav .active-trail").parent('.grandparent').parent('li').hasClass('open')) {
            $('#block-menu-block-1').hide();
          }

          $('.main-container > div > section', context)
            .css('padding-top', $('#navbar li.open > ul', context).css('height'));
        });

        // hide crumbs if a menuparent is visible
        if ($('.open > ul', context).length > 0) {
          $('.breadcrumb', context).hide();
          Drupal.behaviors.amphome_menu.state.showing_breadcrumbs = false;
        }

        // style for breadcrumbs
        Drupal.behaviors.amphome_menu.util.style_for_breadcrumbs();
      },
      unmatch: function(context) {
        var $menuparents = $("#navbar nav > ul > li > ul.dropdown-menu-deactivated", context);

        $menuparents.each(function() {
          var $menuparent = $(this);
          $menuparent
            .removeClass('menuparent')
            .css({
              width: 'auto',
              position: 'relative',
              left: 'auto',
              top: 'auto'
            });
        });

        $('#navbar .navbar-nav > li > a', context).each(function() {
          $(this)
            .attr('data-target', '#')
            .attr('data-toggle', 'dropdown');
        });

        $('#navbar .navbar-nav > li.active-trail', context).removeClass('open');
        Drupal.behaviors.amphome_menu.util.unstyle_for_breadcrumbs();
      }
    });

    var menusize = function(context) {
      var $menuparents = $("#navbar nav > ul > li > ul.dropdown-menu", context);
      var logo_width = $('#navbar > div > div.col.col-xs-12.col-md-2').outerWidth();
      var header_height = $('#navbar').parent().outerHeight(); // .fullwidth parent wrapper
      var container_width = $('.main-container > div > section').css('width');
      $menuparents.each(function() {
        var $menuparent = $(this);
        var left = logo_width + $menuparent.parent().position().left;

        $menuparent
          .addClass('menuparent')
          .css({
            width: container_width,
            position: 'absolute',
            left: '-' + left + 'px',
            top: header_height + 'px'
          });
      });
    };

    enquire.register("all and (min-width: 1200px)", {
      match: menusize,
      unmatch: menusize
    });
  }
};

Drupal.behaviors.reorder_content = {
  attach: function(context, settings) {
    enquire.register("all and (max-width: 992px)", {
      match : function() {
        $('.pane-boxes-flex-graphic-box').after($('.pane-views-amp-news-block-3'));
      },
      unmatch : function() {
        // @todo reverse change
      }
    });
  }
};

Drupal.behaviors.sponsoredprojects = {
  attach: function(context, settings) {
    if ($('.sponsoredprojects', context).length === 1) {
      $('.projects a').each(function() {
        var u = $(this).data('hoverimage');
        $(this).hover(function(ev) {
          $(this).css({
            backgroundImage: 'url(' + u + ')'
          });
        }, function(ev) {
          $(this).css({
            backgroundImage: 'url("' + Drupal.settings.pathToTheme + '/images/bottom right corner white right triangle.png")'
          });
        });
      });
    }
  }
};

Drupal.behaviors.frontpage = {
  attach: function(context, settings) {
    enquire.register("all and (min-width: 992px)", {
      match: function(context) {
        // set minimum height
        var $boite = $('.scrubber.sponsoredprojects', context);
        if ($boite.length > 0) {
          $('#boxes-box-flex_graphic_box', context).css({
            height: ($boite.position().top + $boite.height()) + 'px'
          });
        }

        // commençez les iScrubbings
        $('.scrubber', context)
          .iscrubber({additionalScrubKnobs: true})
          .each(function() {
            var $this_scrub = $(this);
            var scrubber_data_id = $this_scrub.data('scrubber');
            var $knob = $('html').find('a[data-scrubber="' + scrubber_data_id + '"]');
            $this_scrub.on('mousemove.iscrubberrrrr', function(ev) {
              $knob.addClass('hover');
            });
            $this_scrub.on('mouseleave.iscrubberrrrr', function(ev) {
              $knob.removeClass('hover');
            });
          });
        $('.sell a[href="/about"]', context).hover(function() {
          $('a.navbar-brand').addClass('hover');
        }, function() {
          $('a.navbar-brand').removeClass('hover');
        });
      },
      unmatch: function(context) {
        // arretez?
      }
    });
  }
};

Drupal.behaviors.responsivecontent = {
  attach: function(context, settings) {
    $('iframe[src*="youtube"], iframe[src*="vimeo"]', context).each(function() {
      $(this).wrap('<div class="video"></div>');
    });
    $('img.fullwidth').closest('p').addClass('fullwidth');
  }
};

})(jQuery);
