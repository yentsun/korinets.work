Common data types use cases (MySQL)
###################################

:date: 2010-01-05 10:20
:modified: 2014-07-15 18:40
:tags: mysql, best practices
:category: вебдев
:slug: mysql-common-data-types
:authors: Max Korinets
:abstr: When developing a DB for a new app I always have to 're-decide'
        which column has what data type. Like what type should be
        file path field? Or what length VARCHAR should be for storing
        emails?
:lang: en

Inspired by `a stackoverflow.com question <http://stackoverflow.com/questions/
354763/common-mysql-fields-and-their-appropriate-data-types#>`_, I'm gathering
experience and (hopefully) best practices in the following table. Any comments
or additions are more than welcome.

================  ===============  ============================================
Column            Data type        Comment
================  ===============  ============================================
id                INTEGER          `AUTO_INCREMENT`, `UNSIGNED`
title             VARCHAR(255)
full name         VARCHAR(70)
gender            TINYINT          `UNSIGNED`
description       TINYTEXT         often may not be enough, use `TEXT` instead
post body         TEXT
email             VARCHAR(255)
url               VARCHAR(2083)    MySQL version < 5.0.3 - use `TEXT`
salt              CHAR(*x*)        randomly generated string, usually of fixed
                                   length (*x*)
digest (md5)      CHAR(32)
phone number      VARCHAR(20)
US zip code       CHAR(5)          Use `CHAR(10)` if you store extended codes
US/Canada p.code  CHAR(6)
file path         VARCHAR(255)
5-star rating     DECIMAL(3,2)     `UNSIGNED`
price             DECIMAL(10,2)    `UNSIGNED`
date (creation)   DATE/DATETIME    usually displayed as initial date of a post
date (tracking)   TIMESTAMP        can be used for tracking changes in a post
tags, categories  TINYTEXT         comma separated values *
status            TINYINT(1)       1 – published, 0 – unpublished, …
                                   You can also use `ENUM` for human-readable
                                   values
================  ===============  ============================================

.. note::
   Under continuous revision. You can see the `history of commits to this page
   at Bitbucket <https://bitbucket.org/yentsun/yentsun.com/history-node/HEAD/
   content/mysql-common-data-types.rst?at=master>`_.