/*!
 *  socket.io-session
 *
 *  Copyright(C) 2019 Satoshi Kobayashi
 *  Released under the MIT license
 *  https://github.com/kobalab/socket.io-session/blob/master/LICENSE
 */

"use strict";

module.exports = (session, passport)=>{
    return {
        express_session:
            (socket, next)=>{session(socket.request, {}, next)},
        passport_initialize:
            passport &&
                ((socket, next)=>{
                            passport.initialize()(socket.request, {}, next)}),
        passport_session:
            passport &&
                ((socket, next)=>{
                            passport.session()(socket.request, {}, next)})
    }
}
