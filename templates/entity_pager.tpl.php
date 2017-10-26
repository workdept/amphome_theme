<?php

/**
 * @file
 * Entity-pager.tpl.php.
 *
 * Adds an Entity Pager:
 * E.g.
 *    < prev  All  next >
 *          5 of 12
 *
 * The list of items are presented next to each other in a usable way
 * (see e.g. above) using minimalist amount of CSS see: entity_pager.css.
 *
 * Default variables:
 *
 * $links: An array of links to render, keyed by their class.
 *
 * $links['prev'] : link to previous node.
 * $links['all_link'] : link to All listing group of records.
 * $links['next'] : link to next node in the sequence.
 * $links['count'] : count of number of nodes in the group.
 */

?>
<ul class="entity_pager">
  <?php foreach ($links as $key => $link): ?>
  <?php if (!empty($link)): ?>
    <li class="entity_pager_<?php print $key; ?>">
    	<?php 
    		$node = node_load($link);
			$images = field_get_items('node', $node, 'field_news_lead_image');
    		if(!empty($images)) {
		      $image = field_view_value('node', $node, 'field_news_lead_image', $images[0], array(
		        'type' => 'image',
		        'settings' => array(
		          'image_style' => 'blog_sq_med'
		        )
		      )
		     );
		    }
			?>
			<a href="/node/<?php print $link?>">
			<?php if(!empty($images)) {print render($image);} ?>
			<span class="title"><?php print $node->title; ?></span>
			</a>
          </li>
  <?php endif; ?>
  <?php endforeach; ?>
</ul>
