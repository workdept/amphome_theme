(function($) {

Drupal.behaviors.amphome_menu = {
  attach: function(context, settings) {
    var $grandchildren = $(".dropdown-menu .dropdown-menu");

    $grandchildren.each(function() {
      var $grandparent = $(this).parent().closest('.dropdown-menu');
      var container_width = $(this).closest('.container').css('width');
      $grandparent
        .addClass('grandparent')
        .css({width: container_width});
    });
  }
};

})(jQuery);
