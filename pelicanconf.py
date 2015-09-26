#!/usr/bin/env python

# -*- coding: utf-8 -*- #

AUTHOR = 'Max Korinets'
SITENAME = "Max's Korinets Web Log"
SITEURL = 'http://localhost:8080'

DATE_FORMATS = {
    'en': ('en_US.UTF-8', '%a, %d %b %Y'),
    'ru': ('ru_RU.UTF-8', '%d.%m.%Y'),
}

LOCALE = ('en_US.UTF-8', 'ru_RU.UTF-8')

PATH = 'content'

TIMEZONE = 'Asia/Bangkok'

DEFAULT_LANG = 'en'

THEME = 'themes/iris'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

ARTICLE_EXCLUDES = ['partials']
