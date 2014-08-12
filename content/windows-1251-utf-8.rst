Нюансы перехода от windows-1251 к utf-8
=======================================

:date: 2008-01-10 12:03
:tags: modx, encoding
:category: вебдев
:slug: windows-1251-utf-8
:abstr: Проблема: после перехода сайта на utf-8 все работает нормально за
        исключением следующих моментов
:lang: ru

* фраза "без категории" в управлении ресурсами отображается как
  ``??? ?????????``
* после сохранения кода сниппетов, чанков и тд, все кириллические символы
  внутри превращаются в вопросы

Причина: не настроена кодировка соединения самого менеджера с базой (или какого
то его блока)

Решение: взято из `форума <http://modxcms.com/forums/index.php/topic,4422.5/>`_.
В файле ``manager/index.php`` около строки 133...

.. code-block:: php

   <?php
       mysql_select_db($dbase);
       mysql_query("SET NAMES 'utf8';",$modxDBConn);
       mysql_query("SET CHARACTER SET 'utf8';",$modxDBConn);
       mysql_query("SET SESSION collation_connection = 'utf8_general_ci';",
                   $modxDBConn);

В некоторых случаях придется сделать похожие изменения и в файле
``manager/includes/extenders/dbapi.mysql.class.inc.php`` около 90 строки
(см. сообщение в форуме)