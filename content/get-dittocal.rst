Вывод даты в заголовок из параметров GET DittoCal
=================================================

:date: 2007-12-28 14:08
:tags: modx, DittoCal
:category: вебдев
:slug: get-dittocal
:abstr: Задача: сделать вывод даты из параметров GET DittoCal в заголовок,
        например "Новости за 15 января 2007 года".
:lang: ru

Решение: пришло на ум два варианта - преобразовывать номера месяцев из
параметров в названия из массива... и более универсальный, преобразовывать дату
из параметров в timestamp и потом выводить в нужном формате через `strftime`_.

Приведу скрипт сниппета для последнего решения:

.. code-block:: php

    <?php
        if (isset($_GET[cal_month])) {
            if (isset($_GET[cal_day])) {
                $date_string = $_GET[cal_year]."-".$_GET[cal_month]."-".
                    $_GET[cal_day]." 00:00:00"; //задана  дата полностью
                $nix_date =  strtotime($date_string);
                return "за ".strftime("%d %B, %Y",$nix_date);
            } else {
                $date_string = $_GET[cal_year]."-".$_GET[cal_month]
                    ."-1 00:00:00"; //заданы месяц и год
                $nix_date =  strtotime($date_string);
                return "за ".strftime("%B, %Y",$nix_date);
            }
        } else {
            return "";
        }

Здесь нам помогает функция `strtotime`_, которая переводит дату из строки в
`timestamp`.

.. note:: сниппет следует вызывать **некешированным**.

.. _`strftime`: http://ru2.php.net/strftime
.. _`strtotime`: http://ru2.php.net/strtotime