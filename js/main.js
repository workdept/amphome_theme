(function($) {

Drupal.behaviors.amphome_menu = {
  attach: function(context, settings) {
    var $grandchildren = $(".dropdown-menu .dropdown-menu", context);

    $grandchildren.each(function() {
      var $grandparent = $(this).parent().closest('.dropdown-menu');
      var container_width = $(this).closest('.container').css('width');
      $grandparent
        .addClass('grandparent')
        .css({width: container_width});
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
