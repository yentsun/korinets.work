Terraria Server on Ubuntu 15.10
===============================

:date: 2015-12-26 13:31
:tags: terraria, ubuntu, steam
:category: gaming
:slug: terraria-server
:abstr: Most of the guides on how to run a Terraria dedicated server on Ubuntu
        describe it running through TShock. However, there is an easier
        solution.
:lang: ru

I play `Terraria`_ with my wife and we soon felt the need to start a local
dedicated server to play independently (not only through 'Host and Play'
mode).

Here are several guides on how to start one

* `reddit <https://www.reddit.com/r/Terraria/comments/2a2gjn/how_to_run_a_dedicated_terraria_server_on_ubuntu/>`_
* http://quark.humbug.org.au/publications/linux/terraria-server.html
* https://www.vultr.com/docs/running-a-tshock-terraria-server

There are many more actually and all of them are based on `TShock`_
installation.

.. note:: This guide works at least for copies purchased on Steam.
          By the way, if you are in an ASEAN country,
          I could send you a gift copy of Terraria - just contact me :)

Ok, I followed one of the guides and managed to launch my previously saved world
through `TShock` aaand... Alas, there were several bugs including door
malfunction that rendered the game unplayable.

I've almost decided to fallback to 'Host and Play' but accidentally looked at
what's in ``~/.steam/steam/SteamApps/common/Terraria``. There were some interesting
files::

    Terraria
    Terraria.bin.x86
    Terraria.bin.x86_64
    Terraria.exe
    TerrariaServer
    TerrariaServer.bin.x86
    TerrariaServer.bin.x86_64
    TerrariaServer.exe

Whats that ``TerrariaServer``? Lets try::

    $ ./TerrariaServer

Voila! You have a nice running Terraria server withouth any bugs!

To sum up, here is how you launch a dedicated Terraria server on Ubuntu::

    $ cd ~/.steam/steam/SteamApps/common/Terraria
    $ ./TerrariaServer


.. note:: There's a `thread on Mac/Linux support <http://forums.terraria.org/index.php?threads/terraria-1-3-0-8-can-mac-linux-come-out-play.30287/>`_.
          Also, there is a `download link for dedicated server for Linux
          <http://terraria.org/news/terraria-1-3-0-8-now-for-mac-linux-too>`_

.. _TShock: https://github.com/NyxStudios/TShock
.. _Terraria: https://terraria.org
