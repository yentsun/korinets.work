Счетчик посещений страницы и настройка рейтинга страниц по нему
===============================================================

:date: 2008-02-05 19:12
:tags: modx, ditto
:category: webdev
:slug: modx-counter
:abstr: Задача: Необходимо считать количество посещений страниц (пока без учета
        "уникальности" просмотра, то есть грубо говоря посетитель может
        "накручивать" просмотры, просто перезагружая страницу) и выстроить
        рейтинг страниц с учетом их посещений.
:lang: ru

Решение. Начнем с того, что нам известно: вывод какого либо рейтинга страниц в
MODx в штатном порядке осуществляется с помошью Ditto. Ditto, как нам известно,
может сортировать вывод по любому полю документа а также по доп. параметру
(TV). Единственный выход - получать количество просмотров в TV и потом
сортировать по нему.

В репозитарии modxcms.com лежит плагин `Page Hit Counter` от sottwell, который
проверяет просматривает ли страницу менеджер, и не снята ли галочка
"Регистрировать посещения" и записывает посещение в свою таблицу БД MODx. Также
я вспомнил, что в сниппете CSS Star Rating есть замечательная функция
setTemplateVar, которая, как вы наверное догадались, записывает значение в TV.

Создаем TV типа "текст" (у меня он называется "count") и делаем гибрид плагина,
который вместо записи количества посещений в БД, записывает его в наш TV (не
забудьте поставить проверку на системное событие `OnWebPagePrerender`):

.. code-block:: php

   <?php
    if (!function_exists('setTemplateVar')) {
        function setTemplateVar($value, $docID, $tplVarName) {
           global $modx;

           //-- get tmplvar id
           $tplName = $modx->getFullTableName('site_tmplvars');
           $tplRS = $modx->db->select('id', $tplName, 'name="' . $tplVarName . '"');
           $tplRow = $modx->db->getRow($tplRS);

           $tblName = $modx->getFullTableName('site_tmplvar_contentvalues');

           $selectQuery = $modx->db->select('*', $tblName,
                                            'contentid=' . $docID .
                                            ' AND tmplvarid=' . $tplRow['id']);

           $updFields = array (
               'value' => $value
           );
           $insFields = array (
               'tmplvarid' => $tplRow['id'],
               'contentid' => $docID,
               'value' => $value
           );

           if ($modx->db->getRecordCount($selectQuery) < 1) {
               $modx->db->insert($insFields, $tblName);
           } else {
               $modx->db->update($updFields, $tblName, 'contentid=' .
                                 $docID . ' AND tmplvarid=' . $tplRow['id']);
           }
        }
    }

    if (!isset($_SESSION['usertype'])) { $_SESSION['usertype'] = ''; }

    if ($modx->documentObject['donthit'] != 1 && $_SESSION['usertype'] != 'manager') {
        $current = $modx->getTemplateVarOutput('count',$modx->documentIdentifier);
        $current = $current['count']+1;
        @ setTemplateVar("$current", $modx->documentIdentifier, 'count');
    }

    return;

Теперь у нас есть TV с посещениями. Как настроить вывод Ditto по нему - выходит
за рамки этой статьи. Также, если вам нужно выводить количество посещений на
самой странице, которая кэшируется, придется написать небольшой сниппет и
вызывать его некешируемым.

PS. Был бы признателен за дополнение этого плагина, которое бы исключало
"накрутку" посещений. Возможно с применением cookie или с сессиями :)