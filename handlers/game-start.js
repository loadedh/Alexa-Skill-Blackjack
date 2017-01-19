'use strict';

const Alexa = require('alexa-sdk');
const states = require('../enums').states;
const response = require('../responses');
const playerDealer = require('../modules/dealer-player-hands');
const newGame = require('../handlers/new-session.handlers');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const coreHandlers = require('../handlers/core.handlers');


module.exports = Alexa.CreateStateHandler(states.STARTNEW, mixinHandlers(coreHandlers, {
  StartTheGame() {
      this.emit(':ask', 'Would you like to start?');
  },
  'Amazon.HelpIntent': function() {
    this.emit(':ask', response.gameHelp(), response.keepGoing());
  },
  'Amazon.YesIntent': function() {
    this.handler.state = states.PLAYING;
    this.emit(':tell', playerDealer.playersCards(), playerDealer.cardsViewableByPlayer()); //Dealer needs cards as well.
  },                                                                             //Have to tell the player just one card
  'Amazon.NoIntent': function() {
    this.emit(':tell', response.gameEnd());
  },
  'endSessionIntent': function() {
    console.log('Game has ended!');
    this.emit(':saveState', true);
  }
}));
