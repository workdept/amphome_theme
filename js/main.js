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

        var $grandchildren = $(".dropdown-menu .dropdown-menu", context);
        var logo_width = $('#navbar > div > div.col.col-xs-12.col-md-2').outerWidth();
        var header_height = $('#navbar').parent().outerHeight(); // .fullwidth parent wrapper
        var container_width = $('.main-container > div > section').css('width');

        $('#navbar .navbar-nav > li.active-trail', context)
          .addClass('open');

        $grandchildren.each(function() {
          var $grandparent = $(this).parent().closest('.dropdown-menu');
          var left = logo_width + $grandparent.parent().position().left;
          $grandparent
            .addClass('grandparent')
            .css({
              width: container_width,
              position: 'absolute',
              left: '-' + left + 'px',
              top: header_height + 'px'
            });
          $('.main-container > div > section', context)
            .css('padding-top', $('#navbar li.open > ul', context).css('height'));
        });
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
