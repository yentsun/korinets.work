===============================================
Microservices Example With Express And SenecaJS
===============================================

:date: 2016-05-29 13:26
:tags: nodejs, seneca, express, microservices
:category: webdev
:slug: express-seneca-example
:authors: Max Korinets
:abstr: So, you've heard all the hype about microservices and want to try them.
        But what to start from? Which tools to choose? How to set up
        communication between things? Here is an example with well known
        ExpressJS as HTTP-server and SenecaJS as microservice framework

:lang: en


The Diagram
-----------

Our clients (maybe React or Angular frontends) will make HTTP requests to the
*gateway*, which is a simple HTTP-server application. *The Gateway*, in turn,
will communicate to Seneca microservices via *message queue*. Each microservice
will have its own data storage.

.. image:: images/microservices.png
   :alt: express+seneca application diagram


The Tools
---------

We will use well-known tools:

- ExpressJS_ as http-server to handle incoming requests and pass them as messages
  to the microservices, so we are calling it the *Gateway*
- RabbitMQ_ as the *Message Queue* (bus)
- SenecaJS_ as microservice framework
- MongoDB_ as data storage


Setting up the Gateway
----------------------

All our gateway needs to do is to

1. accept an HTTP request,
2. *post* the correspondent message to the message queue,
3. wait for the response from message queue (which will be posted there by a
   microservice) and finally
4. return the HTTP response with relevant data.

The incoming requests will be authorized via one of the microservices
(the *Auth microservice*).

ExpressJS is one good server for these tasks, but it can be any NodeJS
http-server actually. Detailed tutorial on how to create an HTTP-server with
ExpressJS falls out of scope of this article -- there are hundreds of them
in the Internet. We'll focus only on the crucial parts of our system.

Imagine we have to handle user registration requests like this one
(cURL format)::

    curl -i -X POST -d '{"email":"test@user.com","name":"Test User"}' \
    'http://api.gateway.com/users'

Essentially we need to handle POST-request with some JSON data on the route
`http://api.gateway.com/users` here. The ExpressJS router code for this could
look like this:

.. code-block:: javascript

    const express = require('express');

    let router = express.Router();

    router.post('/users', function (req, res, next) {
        seneca.act({
            role: 'user',
            cmd: 'register',
            email: req.body.email,
            name: req.body.name
        }, (error, response) => {
            if (error) return next(error);
            res.status(200).send(response);
        })
    });



... to be continued

.. note::
   **UPD**: As I dropped SenecaJS in favour of custom framework, I won't continue this article.


.. _ExpressJS: http://expressjs.com/
.. _SenecaJS: http://senecajs.org/
.. _RabbitMQ: https://www.rabbitmq.com/
.. _MongoDB: https://www.mongodb.com/
