Добавление поля редактирования даты создания документа (createdon) в менеджере
==============================================================================

:date: 2008-01-14 15:17
:tags: modx
:category: webdev
:slug: createdon
:abstr: Одной из проблем, с которыми приходилось сталкиваться не раз - запись
        даты создания документа задним числом. Можно создавать TV типа date,
        можно записывать даты в pub_date и тд. Однако, если вы не задаете
        абсолютно всем документам дату в своем параметре и для каких то
        документов он остается пустым - возникнут проблемы с сортировкой этих
        документов с помощью Ditto.
:lang: ru

Вот захотелось набраться наглости и сделать в панели редактирования документа
дополнительное поле, позволяющее редактировать дату создания документа
(createdon). Создавая документ задним числом, вы просто редактируете дату его
создания, а по умолчанию естественно задается текущая дата. Итак нужно
выполнить следующие шаги:

1. в ``manager/actions/mutate_content.dynamic.php`` меняем

   .. code-block:: php

       <?php
       // retain form values if template was changed
       // edited to convert pub_date and unpub_date
       // sottwell 02-09-2006
       if ($formRestored == true || isset ($_REQUEST['newtemplate'])) {
           $content = array_merge($content, $_POST);
           $content["content"] = $_POST["ta"];
           if (empty ($content["pub_date"])) {
               unset ($content["pub_date"]);
           } else {
               $pub_date = $content['pub_date'];
               list ($d, $m, $Y, $H, $M, $S) =
                   sscanf($pub_date, "%2d-%2d-%4d %2d:%2d:%2d");
               $pub_date = strtotime("$m/$d/$Y $H:$M:$S");
               $content['pub_date'] = $pub_date;
           }
           if (empty ($content["unpub_date"])) {
               unset ($content["unpub_date"]);
           } else {
               $unpub_date = $content['unpub_date'];
               list ($d, $m, $Y, $H, $M, $S) =
                   sscanf($unpub_date, "%2d-%2d-%4d %2d:%2d:%2d");
               $unpub_date = strtotime("$m/$d/$Y $H:$M:$S");
               $content['unpub_date'] = $unpub_date;
           }
       }

   на

   .. code-block:: php

    <?php
    // retain form values if template was changed
    // edited to convert pub_date and unpub_date
    // sottwell 02-09-2006
    if ($formRestored == true || isset ($_REQUEST['newtemplate'])) {
        $content = array_merge($content, $_POST);
        $content["content"] = $_POST["ta"];
        if (empty ($content["pub_date"])) {
            unset ($content["pub_date"]);
        } else {
            $pub_date = $content['pub_date'];
            list ($d, $m, $Y, $H, $M, $S) =
                sscanf($pub_date, "%2d-%2d-%4d %2d:%2d:%2d");
            $pub_date = strtotime("$m/$d/$Y $H:$M:$S");
            $content['pub_date'] = $pub_date;
        }
        if (empty ($content["unpub_date"])) {
            unset ($content["unpub_date"]);
        } else {
            $unpub_date = $content['unpub_date'];
            list ($d, $m, $Y, $H, $M, $S) =
                sscanf($unpub_date, "%2d-%2d-%4d %2d:%2d:%2d");
            $unpub_date = strtotime("$m/$d/$Y $H:$M:$S");
            $content['unpub_date'] = $unpub_date;
        }
        if (empty ($content["createdon"])) {
            unset ($content["createdon"]);
        } else {
            $createdon = $content['createdon'];
            list ($d, $m, $Y, $H, $M, $S) =
                sscanf($createdon, "%2d-%2d-%4d %2d:%2d:%2d");
            $createdon = strtotime("$m/$d/$Y $H:$M:$S");
            $content['createdon'] = $createdon;
        }
    }

2. добавляем в ``manager/actions/mutate_content.dynamic.php`` до строки 700
   (приблизительно, строка содержит ``<input name="pub_date">``)

   .. code-block:: php

      <tr>
          <td><span class="warning">Дата создания</span></td>
          <td>
          <?php $timestamp = time();?>
              <input name="createdon" value="<?php echo $content['createdon']=="0"
                  || !isset($content['createdon']) ? strftime("%d-%m-%Y %H:%M:%S",
                  $timestamp) : strftime("%d-%m-%Y %H:%M:%S", $content['createdon']);
                  ?>" onblur="documentDirty=true;" />
              <a onclick="documentDirty=false; cal0.popup();"
                 onmouseover="window.status='<?php echo $_lang['select_date']; ?>';
                 return true;" onmouseout="window.status='';
                 return true;" style="cursor:pointer; cursor:hand">
                 <img src="media/style/<?php echo $manager_theme ?
                 "$manager_theme/":""; ?>images/icons/cal.gif" width="16"
                 height="16" border="0" alt="<?php echo $_lang['select_date']; ?>" />
              </a>
          </td>
      </tr>

3. добавляем в ``manager/actions/mutate_content.dynamic.php`` в самый конец
   файла после строки ``<script type="text/javascript">`` следующий код:

   .. code-block:: javascript

      var cal0 = new calendar1(document.forms['mutate'].elements['createdon'],
          document.getElementById("pub_date_show"));
      cal0.path="<?php echo str_replace("index.php", "media/",
                                        $_SERVER["PHP_SELF"]); ?>";
      cal0.year_scroll = true;
      cal0.time_comp = true;


4. добавляем в ``manager/processors/save_content.processor.php`` после строки
   ``$hidemenu = intval($_POST['hidemenu']);``:

   .. code-block:: php

      <?php

      $createdon = $_POST['createdon'];
      list ($d, $m, $Y, $H, $M, $S) =
          sscanf($createdon, "%2d-%2d-%4d %2d:%2d:%2d");
      $createdon = mktime($H, $M, $S, $m, $d, $Y);

5. в ``manager/processors/save_content.processor.php`` меняем sql-запрос,
   начинающийся с ``INSERT`` на

   .. code-block:: php

      <?php
      $sql = "INSERT INTO $tblsc (introtext,content, pagetitle, longtitle, type,
              description, alias, link_attributes, isfolder, richtext,
              published, parent, template, menuindex, searchable, cacheable,
              createdby, createdon, editedby, editedon, publishedby,
              publishedon, pub_date, unpub_date, contentType, content_dispo,
              donthit, menutitle, hidemenu)
              VALUES('" . $introtext . "','" . $content . "', '" . $pagetitle .
              "', '" . $longtitle . "', '" . $type . "', '" . $description .
              "', '" . $alias . "', '" . $link_attributes . "', '" . $isfolder .
              "', '" . $richtext . "', '" . $published . "', '" . $parent .
              "', '" . $template . "', '" . $menuindex . "', '" . $searchable .
              "', '" . $cacheable . "', '" . $modx->getLoginUserID() . "', " .
              $createdon . ", '" . $modx->getLoginUserID() . "', " . time() .
              ", " . $publishedby . ", " . $publishedon . ", '$pub_date',
              '$unpub_date', '$contentType', '$contentdispo', '$donthit',
              '$menutitle', '$hidemenu')";

   а блок

   .. code-block:: php

      <?php
      $sql = "UPDATE $tblsc SET introtext='$introtext', content='$content',
              pagetitle='$pagetitle', longtitle='$longtitle', type='$type',
              description='$description', alias='$alias',
              link_attributes='$link_attributes',isfolder=$isfolder,
              richtext=$richtext, published=$published, pub_date=$pub_date,
              unpub_date=$unpub_date, parent=$parent, template=$template,
              menuindex='$menuindex', searchable=$searchable,
              cacheable=$cacheable, editedby=" . $modx->getLoginUserID() . ",
              editedon=" . time() . ", publishedon=$publishedon,
              publishedby=$publishedby, contentType='$contentType',
              content_dispo='$contentdispo', donthit='$donthit',
              menutitle='$menutitle', hidemenu='$hidemenu' WHERE id=$id;";

   меняем на

   .. code-block:: php

      <?php
      $sql = "UPDATE $tblsc SET introtext='$introtext', content='$content',
              pagetitle='$pagetitle', longtitle='$longtitle', type='$type',
              description='$description', alias='$alias',
              link_attributes='$link_attributes', isfolder=$isfolder,
              richtext=$richtext, published=$published, pub_date=$pub_date,
              unpub_date=$unpub_date, parent=$parent, template=$template,
              menuindex='$menuindex', searchable=$searchable,
              cacheable=$cacheable, editedby=" . $modx->getLoginUserID() . ",
              editedon=" . time() . ", publishedon=$publishedon,
              publishedby=$publishedby, contentType='$contentType',
              content_dispo='$contentdispo', donthit='$donthit',
              menutitle='$menutitle', hidemenu='$hidemenu',
              createdon='$createdon' WHERE id=$id;";

   (добавляем в хвост запроса строку ``createdon='$createdon'``)
