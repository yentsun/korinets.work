Вывод новостей в соответствии с парметрами DittoCal
===================================================

:date: 2007-12-26 10:20
:tags: modx, dateFilter, Ditto, DittoCal
:category: webdev
:slug: dittocal
:abstr: Для того чтобы Ditto видел параметры DittoCal (которые отличаются
        приставкой ``cal_``), возможно нужно изменить фильтр/экстендер
        dateFilter...
:lang: ru

Запись о параметрах GET экстендера `dateFilter` находится в файле
``assets/snippets/ditto/extenders/dateFilter.extender.inc.php`` около строки 100.
Создаем новый экстендер "cal_dateFilter" путем копирования файла
``dateFilter.extender.inc.php`` и переименования его в
``cal_dateFilter.extender.inc.php``.

Меняем все упоминания параметров "year", "month" и "day" на "cal_year",
"cal_month" и "cal_day" в строках с 101 по 103. В вызове Ditto, который будет
выводить новости учитывая параметры DittoCal добавляем параметры
``&extenders=`cal_dateFilter` &dateSource=`createdon```