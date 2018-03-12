Задание шаблона по умолчанию для дочерних документов
====================================================

:date: 2008-01-16 15:12
:tags: modx, шаблоны
:category: webdev
:slug: default-template
:abstr: Очень давно меня беспокоила необходимость постоянно задавать шаблон для
        новых документов. Когда речь не идет о периодической информации -
        шаблон задать нетрудно, однако когда необходимо создавать по нескольку
        документов в минуту - вопрос стоит достаточно остро. К тому же, ваш
        заказчик, сам администрируя сайт, может просто забыть выставить нужный
        шаблон.
:lang: ru

В последних версиях MODx появился плагин `Inherit Parent Template`, с помощью
которого можно было создать неопубликованный контейнер и задать ему нужный
шаблон, тогда все дочерние документы наследовали этот шаблон. Однако этот
способ вынуждал делать лишние контейнеры для каждой категории и создавать
иерархию меню отдельно от документов контента.

Итак, хочу представить более менее приемлемое решение. Мы немного изменим
вышеупомянутый плагин, чтобы задать родительские документы, новые(!) дочерние
документы которых будут автоматически принимать заданный шаблон. Сразу
оговорюсь, в моем случае пришлось задавать супер-родителей (родителей
родителей), однако закомментировав одну строку плагина вы можете иметь
возможность задавать просто родителей.

Код измененного плагина `Inherit Parent Template` (его можно просто заменить
поверх старого):

.. code-block:: php

       <?php
       /*
        * Inherit Template from Parent
        * Written By Raymond Irving - 12 Oct 2006
        *
        * Simply results in new documents inheriting the template
        * of their parent folder upon creating a new document
        *
        * Configuration:
        * check the OnDocFormPrerender event
        *
        * Version 1.0
        *
        */

       global $content;
       $e = &$modx->Event;

       $parents_and_templates = array (
           '4818' => '5', // id родителя => id шаблона (можно посмотреть в БД)
           '4817' => '6'
       );

       switch($e->name) {
           case 'OnDocFormPrerender':
               if(($_REQUEST['pid'] > 0) && ($id == 0)) {
                   $parent = $modx->getPageInfo($_REQUEST['pid'],0,'id, parent,
                                                template');
                   $parent = $modx->getPageInfo($parent['parent'],0,'id,
                                                parent, template');
                   //закомментируйте сроку выше, если вам нужен родитель первого
                   //уровня
                   $pid = $parent['id'];
                   if (array_key_exists($pid,$parents_and_templates)) {
                       $content['template'] = $parents_and_templates[$pid];
                   } else {
                       $content['template'] = $parent['template'];
                   }
               }
               break;

           default:
               return;
               break;
       }

задать родительский документ и соответствующий шаблон можно в массиве

.. code-block:: php

    <?php
    $parents_and_templates = array (
        '4818' => '5',
        '4817' => '6'
    );

