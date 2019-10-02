/*!
 *  socket.io-session
 *
 *  Copyright(C) 2019 Satoshi Kobayashi
 *  Released under the MIT license
 *  https://github.com/kobalab/socket.io-session/blob/master/LICENSE
 */

"use strict";

module.exports = (session, passport)=>{

    const passport_initialize = passport.initialize();
    const passport_session    = passport.session();

    return {
        express_session:
            (socket, next)=>{session(socket.request, {}, next)},
        passport_initialize:
            passport &&
                ((socket, next)=>{
                            passport_initialize(socket.request, {}, next)}),
        passport_session:
            passport &&
                ((socket, next)=>{
                            passport_session(socket.request, {}, next)})
    }
}
