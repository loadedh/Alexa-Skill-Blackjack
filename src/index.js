'use strict';

process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}`;

const Alexa = require('alexa-sdk');
const newSessionHandlers = require('./handlers/new-session.handlers');
const gameStartHandlers = require('./handlers/game-start');
const playerDecisionHandlers = require('./handlers/player-decision');
const dealersDecisionHandler = require('./handlers/dealer-decision');
const splitHandler = require('./handlers/split-handler');
const splitSecondHandler = require('./handlers/split-second-handler');
const dealSplitHandler = require('./handlers/deal-split-handler');
const stoppedHandlers = require('./handlers/stopped.handlers');

module.exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.appId = event.session.application.applicationId;

  alexa.registerHandlers(
    newSessionHandlers,
    gameStartHandlers,
    playerDecisionHandlers,
    dealersDecisionHandler,
    splitHandler,
    splitSecondHandler,
    dealSplitHandler,
    stoppedHandlers
  );

  alexa.execute();
};
