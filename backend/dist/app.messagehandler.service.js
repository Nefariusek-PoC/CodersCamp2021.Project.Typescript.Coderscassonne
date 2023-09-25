'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MassageHandler = void 0;
const common_1 = require('@nestjs/common');
const webSocketEvents_1 = require('./constants/webSocketEvents');
let MassageHandler = class MassageHandler {
  createMessage(clientId, text) {
    switch (this.messageType) {
      case webSocketEvents_1.default.SEND_MEEPLE_PLACED: {
        this.message = { client: clientId, text: text };
      }
      case webSocketEvents_1.default.SEND_MESSAGE: {
        this.message = { client: clientId, text: text };
      }
    }
  }
  sendMassage() {
    let event = '';
    switch (this.messageType) {
      case webSocketEvents_1.default.SEND_MEEPLE_PLACED: {
        event = webSocketEvents_1.default.RECEIVE_MEEPLE_PLACED;
        break;
      }
      case webSocketEvents_1.default.SEND_MESSAGE: {
        event = webSocketEvents_1.default.RECEIVE_MESSAGE;
        break;
      }
    }
    return { event: event, data: this.message };
  }
};
MassageHandler = __decorate([(0, common_1.Injectable)()], MassageHandler);
exports.MassageHandler = MassageHandler;
//# sourceMappingURL=app.messagehandler.service.js.map
