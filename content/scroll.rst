Scroll
======

:date: 2013-11-10 12:02
:tags: python, pdf
:category: мои проекты
:slug: scroll
:abstr: Возникла необходимость быстрой сборки и тиража PDF-буклетов. На Питоне
        есть масса мощных инструментов для этого, однако нет чего-то простого,
        чтобы код буклета не выглядел громоздко. Немного вдохновленный простотой
        использования TCPDF_ (библиотеки для PDF на PHP) написал свой небольшой
        генератор буклетов
:lang: ru

.. _TCPDF: http://www.tcpdf.org/

:Язык: Python
:Репозиторий: https://bitbucket.org/yentsun/scroll

Генератор работает на базе:

* pycairo_ и rsvg_ для импорта и манипуляций над SVG
* reportlab_ для вставки текста
* pypdf_ для склеивания страниц в буклет

.. _pycairo: http://www.cairographics.org/pycairo/
.. _pypdf: http://pybrary.net/pyPdf/
.. _reportlab: http://www.reportlab.com/
.. _rsvg: http://cairographics.org/pyrsvg/



Пример использования
--------------------

Код для генерации простого одностраничного буклета:

.. code-block:: python

        from scroll import Scroll

        scroll = Scroll('output_file_path.pdf')

        # у нас должен быть подготовленный дизайнером макет (может с лого и
        # фирменным стилем), создаем страницу на его основе
        page1 = scroll.add_page('blank.pdf')

        # добавляем графику
        page1.add_SVG(path='floor.svg', coords=(290, 0), scale=0.85)

        # следующее изображение будет вставлено с теми же координатами и
        # масштабом что и предыдущее - удобно для накладывания графики слоями
        page1.add_SVG(path='outline.svg', new_context=False)

        page1.add_SVG(path='minimap.svg', coords=(40, 290), scale=0.89)

        # добавляем текст
        page1.add_text_block(font_path='Ubuntu.ttf',
                             coords=(40, 453),
                             font_size=16,
                             lines=(
                                u'Building 1',
                                u'Section 2',
                                u'Floor 1'
                             ))
        page1.add_text_block(coords=(40, 345),
                             font_size=12,
                             lines=(
                                u'Room count: 3',
                                u'Square: 64.56 m²'
                             ))

        # генерируем буклет
        scroll.render()