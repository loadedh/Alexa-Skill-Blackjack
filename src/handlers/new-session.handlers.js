'use strict';

const states = require('../enums').states;

const setStateAndInvokeEntryIntent = function() {
  this.handler.state = states.STARTNEW;

  this.emitWithState('newGame');
};

module.exports = {
  NewSession() {
    setStateAndInvokeEntryIntent.call(this);
  },
  LaunchRequest() {
    setStateAndInvokeEntryIntent.call(this);
  },
  Unhandled() {
    console.log('unhandled');
  },
};
