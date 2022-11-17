# socket.io-session

Access express-session and passport user information from socket.io

## Installation
```shell
$ npm install @kobalab/socket.io-session
```

## Examples

If you access express-session only.

```javascript
const express = require('express');
const session = require('express-session')({
                            secret:'secret',
                            resave:false,
                            saveUninitialized:true });

const socket_io_session = require('@kobalab/socket.io-session')(session);

const app = express();
app.use(session);

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.use(socket_io_session.express_session);

io.on('connection', socket=>{
    console.log(socket.request.session);
    socket.on('hello', msg=>{
        console.log(socket.request.session);
        socket.request.session.hello = msg;
        socket.request.session.save();
    });
});

server.listen(3000);
```

If you access passport user infomation too.

```javascript
const express = require('express');
const session = require('express-session')({
                            secret:'secret',
                            resave:false,
                            saveUninitialized:false });
const passport = require('passport');

const socket_io_session
              = require('@kobalab/socket.io-session')(session, passport);

const app = express();
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.use(socket_io_session.express_session);
io.use(socket_io_session.passport_initialize);
io.use(socket_io_session.passport_session);

io.on('connection', socket=>{
    console.log(socket.request.user);
    socket.on('hello', msg=>{
        console.log(socket.request.user);
    });
});

server.listen(3000);
```

## License
[MIT](https://github.com/kobalab/socket.io-session/blob/master/LICENSE)

## Author
[Satoshi Kobayashi](https://github.com/kobalab)
