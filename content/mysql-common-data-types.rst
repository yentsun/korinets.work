Common data types (MySQL)
#########################

:date: 2010-01-05 10:20
:modified: 2014-07-15 18:40
:tags: mysql, best practices
:category: webdev
:slug: mysql-common-data-types
:authors: Max Korinets
:summary: a table of MySQL data types and their use cases
:lang: en

When developing a DB for a new app I always have to 're-decide' which column
has what data type. Like what type should be `file path` field? Or what length
``VARCHAR`` should be for storing emails?

Inspired by `a stackoverflow.com question <http://stackoverflow.com/questions/
354763/common-mysql-fields-and-their-appropriate-data-types#>`_, I'm gathering
experience and (hopefully) best practices in the following table. Any comments
or additions are more than welcome.

================  ===============  ============================================
Column            Data type        Comment
================  ===============  ============================================
id                INTEGER          AUTO_INCREMENT, UNSIGNED
title             VARCHAR(255)
description       TINYTEXT         often may not be enough, use TEXT instead
post body         TEXT
email             VARCHAR(254)
salt              CHAR(*x*)        randomly generated string, usually of fixed
                                   length (*x*)
digest (md5)      CHAR(32)
phone no.         VARCHAR(20)
file path         VARCHAR(255)
5-star rating     DECIMAL(3,2)     UNSIGNED
price             DECIMAL(7,2)     UNSIGNED
date (creation)   DATE/DATETIME    usually displayed as initial date of a post
date (tracking)   TIMESTAMP        can be used for tracking changes in a post
tags, categories  TINYTEXT         comma separated values *
status            TINYINT(1)       1 – published, 0 – unpublished, …
================  ===============  ============================================

Under continuous revision...