Проверка на наличие привязаных документов
=========================================

:date: 2008-03-13 14:54
:tags: modx, ditto, sql
:category: вебдев
:slug: modx-docbind
:abstr: **Дано**: архив артистов, архив новостей и фоторепортажей, привязанных к
        артистам по идентификатору. Идентификатор артиста записан в
        соответствующем TV новостной статьи.
        **Задача**: выполнить проверку, существуют ли по данному артисту новости
        (хотябы одна) и вывести соответствующую кнопку на странице артиста и в
        каталоге артистов (шаблон Ditto)
:lang: ru

**Решение**: нам всего-то нужно - проверить, есть ли в таблице
``modx_site_tmplvar_contentvalues`` запись со значением поля `value` равным
идентификатору артиста и принадлежит ли соответствующий документ к категории
новостей. Как известно, значения TV хранятся в БД MODx в одной таблице
(``modx_site_tmplvar_contentvalues``), содержимое документов в другой
(``modx_site_content``), а получить значение `parent` (для проверки
принадлежности документа к новостям) мы можем только из таблицы содержимого.
Поэтому здесь, для получения и проверки результата мы должны получить
"объединенную" выдачу двух таблиц из базы. Для этого запросе к БД используем
``JOIN``:

.. code-block:: sql

   SELECT contentid, parent
   FROM modx_site_tmplvar_contentvalues
   JOIN modx_site_content
   ON modx_site_tmplvar_contentvalues.contentid = modx_site_content.id
   WHERE value = ".$output."
       AND tmplvarid = 5
       AND parent IN ('4789','4794','4792')
   LIMIT 1

Замечу, что ``IN`` проверяет на равенство одному из перечисленных в скобках
значений (в моем проекте имеется три категории новостей) а ``tmplvarid = 5``
гарантирует, что проверка производится только в нужном нам TV (привязка к
артисту).

Привожу пример работающего phx-сниппета:

.. code-block:: php

   <?php
   $query = "SELECT contentid, parent, pagetitle
             FROM modx_site_tmplvar_contentvalues
             JOIN modx_site_content
             ON modx_site_tmplvar_contentvalues.contentid = modx_site_content.id
             WHERE value = ".$output."
             AND tmplvarid = 5
             AND parent IN ('4789','4794','4792')
             LIMIT 1";
   $result = $modx->db->query($query);
   $row = mysql_fetch_array($result);
   $id = $row['contentid'];
   return $id ? '<a class="news" title="Новости"
                    href="[~4817~]?tags=[+pagetitle:name:common_name:url+]">
                    Новости</a>' : '';

я назвал сниппет 'news'. Теперь при вызове ``[+id:news+]`` (для шаблона Ditto)
и при наличии привязанных новостей к артисту я получаю кнопку/ссылку на
новости о нем.

.. note:: в моем случае ссылка ведет на выдачу новостей по тегам а не по
          привязанным статьям - это специфика текущей ситуации и в дальнейшем
          будет исправлена