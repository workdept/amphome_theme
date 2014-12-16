<?php

function amphome_preprocess_node(&$vars, $hook) {
  if ($vars['type'] == 'news_item') {
    if (isset($vars['field_news_term']) && isset($vars['field_news_term'][0]) && isset($vars['field_news_term'][0]['taxonomy_term']->name)) {
      $name = $vars['field_news_term'][0]['taxonomy_term']->name;
    }
    if (isset($vars['field_news_term']) && isset($vars['field_news_term']['und']) && isset($vars['field_news_term']['und'][0]['taxonomy_term']->name)) {
      $name = $vars['field_news_term']['und'][0]['taxonomy_term']->name;
    }
    if (isset($name)) {
      $vars['news_category'] = $name;
    }
  }
}

