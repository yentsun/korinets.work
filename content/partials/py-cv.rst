.. code-block:: python

    from programmers.profiles import Programmer, OOProgrammer
    from programmers.tools import (Framework, ORM, DBMS, IDE, DataFormat,
                                   TextEditor, OS, TemplateLanguage)
    from вебдевs.profiles import GeneralPurposeвебдев
    from global_programmers.db import session

    yentsun = Programmer(OOProgrammer, GeneralPurposeвебдев)
    yentsun.real_name = 'Max Korinets'
    yentsun.email = 'mkorinets@gmail.com'
    yentsun.bio = ('Developing websites since 1998, mostly solo. I am familiar'
                   'with early PHP weapons like e107(if I remeber correctly),'
                   'Joomla, MODx, later transferred to more avanced tools '
                   '(frameworks): Symfony, CodeIgnighter and *Zend Framework*'
                   '(which I still use for some projects). '
                   'Finally when I felt too academic for barefootness of PHP,'
                   'I switched to Python (considered Ruby also).'
                   'In Python I tried Django and liked it but chose a less coupled '
                   'framework *Pyramid* for daily use. '
                   '*Note: For such a long вебдев career I have suprisingly few '
                   'things to share and to be proud of. The reason is probably in '
                   'lack of time and motivation to perfectly document and put '
                   'projects for public use. Or simply maybe because I am '
                   'too shy/coward. I am trying to fix that though :)*')

    yentsun.tools = [Framework(title='Pyramid', language='python',
                               years_of_practice=2),
                     Framework(title='Zend Framework', language='php',
                               years_of_practice=2),
                     TemplateLanguage(title='Mako'),
                     TemplateLanguage(title='Jinja'),
                     ORM(title='SQLAlchemy'),
                     DBMS(title='MySQL', years_of_practice=4),
                     DBMS(title='SQLite', years_of_practice=3),
                     DataFormat(title='XML'),
                     DataFormat(title='JSON'),
                     DataFormat(title='CSV'),
                     IDE(title='PyCharm'),
                     IDE(title='PHPStorm'),
                     TextEditor(title='Vim'),
                     OS(title='Ubuntu')]

    yentsun.profile_urls = ['http://stackoverflow.com/users/216042/yentsun',
                            'https://github.com/yentsun',
                            'http://www.lastfm.ru/user/yentsun']

    yentsun.languages = ['English', 'Russian', 'Ukranian']
    yentsun.locale = 'Europe/Moscow'
    session.add(yentsun)