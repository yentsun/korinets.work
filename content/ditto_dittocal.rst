Вывод новостей за указанную дату (Ditto+DittoCal)
=================================================

:date: 2007-12-26 15:06
:tags: modx, Ditto, DittoCal
:category: webdev
:slug: dittodittocal
:abstr: По умолчанию DittoCal при нажатии на ссылку даты выводит один
        (не известно по каким критериям отобранный) пост. DittoCal не учитывает
        то, что за один день может быть написано несколько постов.
        Модифицируем DittoCal так, чтобы Ditto, при нажатии на дату календаря,
        выводил новости просто по фильтрам cal_dateFilter (см. предыдущий пост
        блога) с учетом парметра &cal_day.
:lang: ru

1. За формирование ссылки на дату в DittoCal отвечает блок:

   .. code-block:: php

       $calendar .= '<td'.($classes ? '
                         class="'.$add_class.' '.htmlspecialchars($classes).'">'
                    : '>').
       ($link ? '<a href="'.htmlspecialchars($link).'"
       title="'.htmlspecialchars($title).'">'.$content.'</a>' : $content).'</td>';

2. Заменим последнюю строку на

   .. code-block:: php

       <a href="[(base_url)][~[*id*]~]?cal_year='.$year.'&amp;cal_month='.
       $month.'&amp;cal_day='.$day.'"