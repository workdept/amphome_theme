<?php

function amphome_preprocess_node(&$vars, $hook) {
  if ($vars['type'] == 'news_item') {
    if (isset($vars['field_news_term']) && count($vars['field_news_term']) === 1 && isset($vars['field_news_term'][0]['taxonomy_term']->field_term_image) && count($vars['field_news_term'][0]['taxonomy_term']->field_term_image) === 1) {
      $field_news_term = $vars['field_news_term'][0];
    }
    if (isset($vars['field_news_term']) && count($vars['field_news_term']['und']) === 1 && isset($vars['field_news_term']['und'][0]['taxonomy_term']->field_term_image) && count($vars['field_news_term']['und'][0]['taxonomy_term']->field_term_image) === 1) {
      $field_news_term = $vars['field_news_term']['und'][0];
    }
    if (isset($field_news_term)) {
      $img = $field_news_term['taxonomy_term']->field_term_image['und'][0]['uri'];
      $vars['news_term_image'] = image_style_url('term_image_thumb', $img);
    }
  }
}

