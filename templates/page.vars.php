<?php

/**
 * Implements hook_preprocess_page().
 *
 * @see page.tpl.php
 */
function amphome_preprocess_page(&$variables) {
  // Add information about the number of sidebars.
  if (!empty($variables['page']['sidebar_first']) && !empty($variables['page']['sidebar_second'])) {
    $variables['content_column_class'] = ' class="col-sm-6 col-sm-pull-3"';
  }
  elseif (!empty($variables['page']['sidebar_first']) && empty($variables['page']['sidebar_second'])) {
    $variables['content_column_class'] = ' class="col-sm-9 col-sm-pull-3"';
  }
  elseif (empty($variables['page']['sidebar_first']) && !empty($variables['page']['sidebar_second'])) {
    $variables['content_column_class'] = ' class="col-sm-9"';
  }
  else {
    $variables['content_column_class'] = ' class="col-sm-12"';
  }

  // Primary nav.
  $variables['primary_nav'] = FALSE;
  if ($variables['main_menu']) {
    // Build links.
    $variables['primary_nav'] = menu_tree(variable_get('menu_main_links_source', 'main-menu'));
    // Provide default theme wrapper function.
    $variables['primary_nav']['#theme_wrappers'] = array('menu_tree__primary');
  }

  // Secondary nav.
  $variables['secondary_nav'] = FALSE;
  if ($variables['secondary_menu']) {
    // Build links.
    $variables['secondary_nav'] = menu_tree(variable_get('menu_secondary_links_source', 'user-menu'));
    // Provide default theme wrapper function.
    $variables['secondary_nav']['#theme_wrappers'] = array('menu_tree__secondary');
  }

  $variables['navbar_classes_array'] = array('navbar');

  if (theme_get_setting('bootstrap_navbar_position') !== '') {
    $variables['navbar_classes_array'][] = 'navbar-' . theme_get_setting('bootstrap_navbar_position');
  }
  else {
    $variables['navbar_classes_array'][] = 'container';
  }
  if (theme_get_setting('bootstrap_navbar_inverse')) {
    $variables['navbar_classes_array'][] = 'navbar-inverse';
  }
  else {
    $variables['navbar_classes_array'][] = 'navbar-default';
  }

  if (isset($variables['node']->field_news_term) && count($variables['node']->field_news_term['und']) === 1 && isset($variables['node']->field_news_term['und'][0]['taxonomy_term']->field_term_image)) {
    $field_news_term = $variables['node']->field_news_term['und'][0];
  }
  if (isset($field_news_term)) {
    $img = $field_news_term['taxonomy_term']->field_term_image['und'][0]['uri'];
    $variables['news_term_image'] = image_style_url('term_image_thumb', $img);
  }

  // Offer path to our theme in DOM
  drupal_add_js('jQuery.extend(Drupal.settings, { "pathToTheme": "/' . path_to_theme() . '/" });', 'inline');
}

