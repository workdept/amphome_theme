(function($) {

Drupal.behaviors.amphome_menu = {
  attach: function(context, settings) {
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
        if ($('.open > ul').length > 0) {
          $('.breadcrumb').hide();
        }
      },
      unmatch: function(context) {
        // @todo reverse change
        $('#navbar .navbar-nav > li.active-trail', context).removeClass('open');
      }
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

})(jQuery);
