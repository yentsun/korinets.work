Whyte Model
===========

:date: 2012-09-16 12:02
:tags: php, mvc, zend_form
:category: мои проекты
:slug: whyte
:abstr: Чтобы избежать дублирования модели в Zend Framework (вначале как класс,
        затем как описание формы в Zend Form), я написал набор абстрактных
        классов, с помощью которых можно задавать модель один раз на весь проект
        и обойтись без Zend Form.
:lang: ru

.. image:: images/logo-final-v01.png
   :alt: лого

:Язык: PHP, Zend Framework
:Репозиторий: https://github.com/yentsun/Whyte
:Документация: http://whyte.readthedocs.org/en/latest/

Пример использования
--------------------

Представим, что у нас есть модель "пользователя" в проекте. Мы можем определить
ее в ``application/models/User.php`` используя Whyte Model следующим образом:

.. code-block:: php

    <?php

    class Application_Model_User extends Whyte_Model_Entity {

        protected $_mapper_class = 'Application_Model_UserMapper';

        protected $_properties = array(
            'id'=> array('Int', array('GreaterThan', 0), 'allowEmpty'=>true),
            'email'=> array('EmailAddress', 'presence'=>'required'),
            'password_hash'=> array('Hex', array('StringLength', 40, 40),
                                    'presence'=> 'required'),
            'first_name'=> array(),
            'last_name'=> array(),
            'phone'=> array(array('StringLength', 7, 18), 'presence'=>'required'),
            'registration_date'=> array(array('Date', 'YYYY-MM-dd')),
            'job_title'=> array('allowEmpty'=> true),
            'status_id'=> 'Int' // 0 - неактивный; 1 - активный; 2 - админ
        );
    }

Вы можете быть уверены, что это единственный раз, где мы перечисляем свойства
класса во всем проекте. А нет! Нам нужно связать свойства класса с полями старой
таблицы в БД. Сделаем это в ``application/models/UserMapper.php``:

.. code-block:: php

    <?php

    class Application_Model_UserMapper extends Whyte_Model_Mapper {

        protected $_table_name = 'user';

        protected $_map = array(
            'id'=> 'tbl_id',
            'email'=> 'tbl_login',
            'password_hash'=> 'tbl_password',
            'first_name'=> 'tbl_name',
            'last_name'=> 'tbl_family',
            'phone'=> 'tbl_phone',
            'registration_date'=> 'tbl_date',
            'job_title'=> 'tbl_job',
            'status_id'=> 'tbl_show_it'
        );
    }

Видите эти префиксы ``tbl_``? Архитектор БД старой школы! В этом `мэппере` мы
привязали поля таблицы `user` к нашей модели. Если бы поля в таблице назывались
так же как и свойства нашей модели, мэппер бы не понадобился.


Получение обязательных полей для формы
--------------------------------------

Теперь поработаем с формой. Допустим у нас есть сверстанный шаблон (вид) формы,
и в нем мы хотим "подсветить" обязательные поля. В соотвествующем контроллере
делаем следующее:

.. code-block:: php

   <?php
    ...
    $this->view->required = Application_Model_User::get_required();
    ...

Как видно из блока кода где мы определили модель "пользователя", обязательны
следующие свойства:

* `email`
* `password_hash`
* `first_name`
* `last_name`
* `phone`
* `registration_date`
* `status_id`

Не все они будут отображены в форме для ввода пользователем -- остальные
свойства мы добавим автоматически до валидации формы.

Далее, при условии, что соответствующие поля в нашей форме имеют те же имена,
что свойства модели, в код вида мы можем добавить:

.. code-block:: javascript

   <script type="text/javascript">
       var required = <?= json_encode($this->required) ?>;
       $('form label, form input, form div, form select').each(function(){
           var name = $(this).attr('name');
           if (jQuery.inArray(name, required) !== -1) {
               $(this).addClass('required');
               $('label[for="'+name+'"]').append('<span class="req"> *</span>');
           }
       });
   </script>

Это всего лишь пример реализации "подсветки" обязательных полей с помощью
javascript. Можно придумать и более совершенное решение.


Валидация формы
---------------

Мы с легкостью можем проверить введенные пользователем данные на корректность.
В соответствующем контроллере:

.. code-block:: php

   <?php
    ...
    if ($this->_request->isPost()) {
        $data = $this->_request->getPost();
        try {
            $new_id = Application_Model_User::create($data);
            $this->flashMessenger->addMessage('Новый пользователь
                                               зарегистрирован!');
            $this->_redirect('/user/success'); // перенаправляем на страницу
                                               // "все ок"
        } catch (Whyte_Exception_EntityNotValid $e) {
            $this->flashMessenger->addMessage('Errors found in the form');
            $this->view->errors = $e->messages;
            $this->view->original_data = $e->original_data;
            // не перенаправляем -- возвращаем неправильные данные и сообщение
            // об ошибке
        }
    }
    ...

Это весь код, который нужен для валидации формы. В случае ошибки/ошибок
``$e->messages`` будет содержать все сообщения о них, а ``$e->original_data``
будет содержать оригинальные данные введенные пользователем для возвращения их
в форму.

Более того, вы можете отдавать на валидацию не только POST-данные, а данные из
любого источника, представленные в виде ассоциативного массива. Например,
строка из CSV-файла:

.. code-block:: php

   <?php
    ...
    if (($handle = self::fopen_utf8($file_path)) !== false) {
        while (($string = fgets($handle, 1000)) !== false) {
            $row = str_getcsv($string, $CSV_DELIMITER);
            $data = array();
            list(
                $data['number'],
                $data['time'],
                $data['date'],
                $data['team_one_title'],
                $data['team_two_title'],
                $data['game_score']
            ) = $row;
            try {
                Application_Model_Game::create($data);
            } catch (Whyte_Exception_EntityNotValid $e) {
                ...
            }
        }
    }
    ...