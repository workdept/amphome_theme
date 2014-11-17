(function($) {

Drupal.behaviors.amphome_menu = {
  attach: function(context, settings) {
    var $grandchildren = $(".dropdown-menu .dropdown-menu", context);
    var logo_width = $('#navbar > div > div.col.col-xs-12.col-md-2').outerWidth();

    $grandchildren.each(function() {
      var $grandparent = $(this).parent().closest('.dropdown-menu');
      var container_width = $(this).closest('.container').css('width');
      var left = logo_width + $grandparent.parent().position().left;
      $grandparent
        .addClass('grandparent')
        .css({
          width: container_width,
          position: 'absolute',
          left: '-' + left + 'px'
        });
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
