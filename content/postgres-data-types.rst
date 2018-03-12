PostgreSQL data types cheat sheet
#################################

:date: 2016-05-17 22:31
:tags: postgres, cheat-sheet
:category: webdev
:slug: postgres-data-types-cheat-sheet
:authors: Max Korinets
:abstr: If you have to quickly decide which data type to choose for a column
        (and there is a vast variety of Postgres data types), here are some
        hints.
:lang: en

This cheat sheet is a followup on my `MySQL data types cheat sheet
<{filename}/mysql-common-data-types.rst>`_.

================  ===============  ============================================
Column            Data type        Note
================  ===============  ============================================
id (autoinc)      SERIAL           or INTEGER for more control
uuid              UUID
title             VARCHAR(255)     or TEXT
full name         VARCHAR(70)      or TEXT
gender            ENUM             ('Male', 'Female', 'Intersex', 'Transgender',
                                    'Unknown')
description       TEXT
post body         TEXT
email             CITEXT           or VARCHAR(255)
url               VARCHAR(2083)    or TEXT
salt              CHAR(*x*)        randomly generated string, usually of fixed
                                   length (*x*)
digest (md5)      UUID             ex.: ``md5('a string')::uuid``
phone number      VARCHAR(20)
US zip code       CHAR(5)          Use `CHAR(10)` if you store extended codes
US/Canada p.code  CHAR(6)
file path         VARCHAR(254)     or TEXT
5-star rating     NUMERIC(3,2)
price             NUMERIC(10,2)
date              TIMESTAMP        WITH TIME ZONE
tags, categories  ARRAY
status            ENUM             ('published', 'unpublished', …)
json              JSON             PostgreSQL >= 9.3
================  ===============  ============================================

.. note::
   Under continuous revision. You can see the `history of commits for this page
   at Github <https://github.com/yentsun/korinets.name/commits/master/content/
   postgres-data-types.rst>`_.
