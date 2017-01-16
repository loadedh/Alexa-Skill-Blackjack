'use strict';

const Alexa = require('alexa-sdk');
const states = require('../enums').states;
const coreHandlers = require('./core.handlers');
const mixinHandlers = require('../modules/utils');
const playerDecisions = require('../modules/dealer-player-hands');
const response = require('../responses');

module.exports = Alexa.CreateStateHandler(states.PLAYING, mixinHandlers(coreHandlers, {

  const newHandAfterHit = playerDecisions.playersHand().concat(playerDecisions.dealtCard());

  if (playerDecisions.theDealersTotal() === 21) {
    this.handler.state = states.STOPPED;
    this.emit(':tell', `You have lost against the dealers ${playerDecisions.theDealersTotal()} unlucky.` +
                       ` Would you like to play again?`)
  } else if (playerDecisions.theDealersTotal() > 21) {
    this.handler.state = states.STOPPED;
    this.emit(':tell', 'The dealer has bust, you win congratulations! Would you like to play again?')
  }

  HitIntent() {
    this.handler.state = state.DEALING;
    this.emit(':tell', `Your new card is ${newHandAfterHit}, your current hand is ${playerDecisions.playersHand()}`);
  },
  StandIntent() {

    if (playerDecisions.dealerStandId() === 1) {
      if (playerDecisions.theDealersTotal() > playerDecisions.thePlayerTotal()) {
        this.handler.state = STOPPED;
        this.emit(':tell', `The dealer has won. Beating your total of ${playerDecisions.thePlayerTotal()}, with her ${playerDecisions.theDealersTotal()}.` +
                           ' Would you like to play again?');
      } else if (playerDecisions.theDealersTotal() === playerDecisions.thePlayerTotal()) {
        this.handler.state = STOPPED;
        this.emit('tell', 'You have the same total as the dealer however in this house the dealer wins all ties!' +
                          ' Would you like to play again?');
      } else if (playerDecisions.theDealersTotal() < playerDecisions.thePlayerTotal()) {
        this.handler.state = STOPPED;
        this.emit('tell', `You have won! Beating the dealers total of ${playerDecisions.theDealersTotal()}, with your ${playerDecisions.thePlayerTotal()}` +
                          ' Would you like to play again?');
      }
  }

    this.handler.state = state.DEALING;
    playerDecisions.playerStandId() + 1;
    this.emit(':tell', playerDecisions.playerStands());
  },
  SurrenderIntent() {
    this.handler.state = state.STOPPED;
    this.emit(':tell', response.playerSurrenders());
  },
  SplitIntent() {
    if (playerDecisions.playersHand() > 2) {
      this.emit(':tell', 'You cannot split after you have hit or split before!', 'Choose another option!');
    }
    this.handler.state = state.DEALSPLIT;
    this.emit(':tell', `After splitting you hands are ${playerDecisions.SplitHand1()} and ${playerDecisions.SplitHand2()}`);
  },
  'Amazon.HelpIntent': function() {
    this.emit(':ask', response.gameHelp());
  }
}));
