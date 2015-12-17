<?php
/**
 * @file
 * template.php
 */

/**
 * Overrides theme_menu_link().
 */
function amphome_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';
  if ($element['#href'] == 'node/737') {
    $element['#below'] = array();
  }

  if ($element['#below']) {
    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }

    elseif ((!empty($element['#original_link']['depth'])) && ($element['#original_link']['depth'] >= 1)) {
      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul class="dropdown-menu">' . drupal_render($element['#below']) . '</ul>';
      // Generate as standard dropdown.
      $element['#title'] .= ' <span class="caret"></span>';
      $element['#attributes']['class'][] = 'dropdown';
      $element['#localized_options']['html'] = TRUE;

      // Set dropdown trigger element to # to prevent inadvertant page loading
      // when a submenu link is clicked.
      $element['#localized_options']['attributes']['data-target'] = '#';
      $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
      $element['#localized_options']['attributes']['data-toggle'] = 'dropdown';
    }
  }
  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

function amphome_menu_tree__menu_block__main_menu($vars) {
  return '<ul class="navbar-nav">' . $vars['tree'] . '</ul>';
}

function amphome_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'search_block_form') {
    unset($form['search_block_form']['#attributes']['title']);
    $form['#submit'][] = 'amphome_search_block_form_submit';
  }
  if ($form_id == 'webform_client_form_532') {
    $form['mollom']['privacy']['#markup'] = "We use Mollom software to protect against spam. By submitting this form, you accept the <a href='https://mollom.com/web-service-privacy-policy' class='mollom-target' rel='nofollow'>Mollom privacy policy.</a>";
  }
}

/**
* Implementation of form submit function
* Redirect default search block to use views search results
*/
function amphome_search_block_form_submit($form, &$form_state) {
  // Get form ID
  $form_id = $form['form_id']['#value'];
  // Create new redirect
  $form_state['redirect'] = array(
    'search/node',
    array(
      'query' => array(
        'keys' => trim($form_state['values'][$form_id]),
      ),
    ),
  );
}
