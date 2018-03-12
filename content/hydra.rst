Hydra
=====

:date: 2014-01-22 12:02
:tags: python, sqlalchemy, fabric
:category: projects
:slug: hydra
:abstr: Проект, специально разработанный для ART3D Graphics. Включает в себя
        парсеры входных данных, генераторы растровых изображений (чертежей) и
        pdf-буклетов. Автоматизация выполнена на базе Fabric.
:lang: ru

.. image:: images/hydra.png
   :alt: логотип

:Язык: Python, SQLAlchemy, Fabric
:Репозиторий: не доступен

Этот проект - финальная стадия оптимизации кода рабочих процессов для компании
ART3D Graphics. Если ранее каждый проект компании имел собственный
нестандартный набор процессов, то теперь он становится частью проекта "Hydra" и
адаптировался под стандартный "каркас". Основные отличительные свойства его
выносятся в конфигурационный файл, легко читаемый среднеквалифицированным
специалистом.

Для каждого проекта Hydra выполняет следующие шаги:

1. Прием данных и приведение их к стандартному виду
2. Запись данных в базу
3. Генерация растровых чертежей и данных в формате для веб-сайта
4. Генерация pdf-буклетов для веб-сайта и полиграфии

Пример конфигурационного файла:

.. code-block:: ini

   [general]
   project_title = someproject

   [input_data]
   iterator = standard.ExcelIterator
   path = input/someproject/data/data.xls

   [input_data:map]
   building_number = A
   section_number = B
   floor_number = C
   number = D
   room_count = E
   square = F
   status = G

   [project:data_renderer]
   apartment = building_number, section_number, floor_number, number, room_count, square, status
   total_available = building, floor

   [apartment]
   id_pattern = {building_number}-{number}

   [floor]
   id_pattern = {building_number}-{section_number}-{number}
   width = 1000
   height = 1000
   assets = html, image

   [section]
   id_pattern = {building_number}-{number}
   width = 150
   height = 150

   [building]
   id_pattern = {number}

Все шаги и выкладка готового материала на сайт заказчика осуществляется с
помощью Fabric.