Common data types (MySQL) / Рекомендуемые типы данных MySQL
###########################################################

:date: 2010-01-05 10:20
:modified: 2014-07-15 18:40
:tags: bilingual, mysql, типы данных
:category: webdev
:slug: mysql-common-data-types
:authors: Max Korinets
:summary: сводная таблица типов данных MySQL и их применений
:lang: ru

Довольно часто при проектировании очередной базы данных, мне приходится заново
*решать* какого типа должен быть тот или иной столбец. Например,
идентификатор ряда (primary key) – какой тип, ``INTEGER`` или ``INT(8)``? А,
кого типа задать столбец для записи пути файла? Я не нашел сводных таблиц в
Гугле или Яндексе (за исключением `вопроса на stackoverflow.com
<http://stackoverflow.com/questions/354763/
common-mysql-fields-and-their-appropriate-data-types#>`_), поэтому решил
составить свою. Надеюсь она будет полезна не только мне, любые комментарии и
дополнения приветствуются.

Inspired by `a stackoverflow.com question <http://stackoverflow.com/questions/
354763/common-mysql-fields-and-their-appropriate-data-types#>`_. Any comments
or additions are more than welcome.

======================  ======================  ===============================
Column / Столбец        Data type / Тип данных  Comment / Комментарий
======================  ======================  ===============================
id / идентификатор      INTEGER                 AUTO_INCREMENT, UNSIGNED

title / заголовок       VARCHAR(255)

description / описание  TINYTEXT                often may not be enough,
                                                use TEXT instead /
                                                часто недостаточен из-за
                                                ограничений, можно использовать
                                                TEXT
post body /
текст поста             TEXT

email                   VARCHAR(254)

salt (x – you decide)   CHAR(X)                 randomly generated string,
                                                usually of fixed length /
                                                строка случайных символов,
                                                как правило фиксированной
                                                длины
digest / хэш (md5)      CHAR(32)

phone / телефон         VARCHAR(20)

file path /
файл (путь)             VARCHAR(255)

5-star rating /
рейтинг                 DECIMAL(3,2)            UNSIGNED

price / цена            DECIMAL(7,2)            UNSIGNED

date (creation) /
дата (создания)         DATE/DATETIME           usually displayed as initial
                                                date of a post/как правило
                                                выводится как дата создания
                                                поста/новости (фронтенд)

date (tracking) /
дата (отслеживание
изменений)              TIMESTAMP               can be used for tracking
                                                changes in a post/может
                                                использоваться для отслеживания
                                                редакций поста (бэкенд)

tags, categories /
теги, категории         TINYTEXT                comma separated values / запись
                                                в строку с разделителем *

status / статус         TINYINT(1)              1 – published, 0 – unpublished,
                                                …

======================  ======================  ===============================

**UPD**: INT(11) in id is changed into INTEGER because ZEROFILL is not used. /
Я изменил INT(11) в поле id на INTEGER, так как не использую ZEROFILL

**UPD2**: * по мнению одного моего товарища (@RuSHA), вместо записи в строку лучше
пользоваться отдельной таблицей – выборка через LIKE может оказаться куда
прожорливей чем грамотно построенный JOIN.

**UPD3**:  поля varchar(n) можно заменить на аналогичные char(n) – это займет
больше места, однако, из-за фиксированной длины char скорость выдачи данных
увеличится.