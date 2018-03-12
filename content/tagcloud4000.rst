Теговое облако для 4000 документов
==================================

:date: 2008-02-01 10:20
:tags: modx, tagcloud
:category: webdev
:slug: tagcloud4000
:abstr: Попробовав применить сниппет TvTagCloud к своей огромной базе
        документов, получил превышение ожидания запроса (или что то в этом
        духе). Мне необходимо было выводить определенное количество тегов из
        недавно созданных документов плюс минимизировать использование ресурсов
        базы/процессора. Пришлось погуглить и дописать свой код.
:lang: ru

.. code-block:: php

    <?php
        // connect to database

        $tb1 = $modx->getFullTableName("site_tmplvar_contentvalues");
        $query = "SELECT value";
        $query .= " FROM ".$tb1;
        $query .= " WHERE tmplvarid=6";
        $query .= " GROUP BY value";
        $query .= " ORDER BY id DESC";
        $query .= " LIMIT 100;";
        $result = $modx->db->query($query);

        // here we loop through the results and put them into a simple array:

        while ($row = mysql_fetch_array($result)) {
            $tags = explode(', ',$row['value']);
            $tag_mess = array_merge($tag_mess, $tags);
        }

       // determine the font-size increment
       // this is the increase per tag quantity (times used)

       $tags = array_count_values($tag_mess);
       arsort($tags);
       $tags = array_slice($tags, 0, 30);
       ksort($tags);

       $max_qty = max(array_values($tags));
       $min_qty = min(array_values($tags));

       // change these font sizes if you will
       $max_size = 200; // max font size in %
       $min_size = 100; // min font size in %

       // get the largest and smallest array values
       // find the range of values
      $spread = $max_qty - $min_qty;
      if (0 == $spread) { // we don't want to divide by zero
          $spread = 1;
      }
      $step = ($max_size - $min_size)/($spread);

      // loop through our tag array
      foreach ($tags as $key => $value) {
          $size = $min_size + (($value - $min_qty) * $step);
          $output .= '<a href="/[~4817~]?tags='.urlencode($key).'"
                         style="font-size: '.$size.'%"
                         title="">'.$key.'</a> ';
      }
      return $output;
      
К сожалению делалось все в спешке и не хватило времени добавить в код
комментарии и вообще привести все в божеский вид. Буду очень благодарен 
тому, у кого найдется минутка оформить сие в нормальный сниппет для общего
пользования (можно даже мое авторство не ставить:)).

Сниппет в действии: http://s31183.gridserver.com (не морщитесь - сайт в 
разработке)

PS. Только сейчас обнаружил еще один сниппет для тегового облака в репозитарии
modxcms.com: http://modxcms.com/TagCloud-749.html. Может с моей задачей 
справился бы и он.