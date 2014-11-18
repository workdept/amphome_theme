<?php
/**
 * @file
 * bootstrap-search-form-wrapper.func.php
 */

/**
 * Theme function implementation for bootstrap_search_form_wrapper.
 */
function amphome_bootstrap_search_form_wrapper($variables) {
  $output = '<div class="input-group">';
  $output .= str_replace('form-control form-text', 'form-control form-text input-sm', $variables['element']['#children']);
  $output .= '<span class="input-group-btn">';
  $output .= '<button type="submit" class="btn btn-sm btn-primary">' . _bootstrap_icon('search', t('Search')) . '</button>';
  $output .= '</span>';
  $output .= '</div>';
  return $output;
}
