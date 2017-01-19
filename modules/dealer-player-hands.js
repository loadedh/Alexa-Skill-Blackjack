'use strict';

const produceRandomCard = () => {
  const randomElement = Math.random() * 11;
  return Math.floor(randomElement);
}

const totalOfHand = ([head, ...tail], total = 0) => {
  if(!head) {
    return total;
  }
  return totalOfHand(tail, head + total);
}

let playersHand = [produceRandomCard(), produceRandomCard()];
let dealersHand = [produceRandomCard(), produceRandomCard()];
const [faceDownCards, ...faceUpCards] = dealersHand;

module.exports.dealtCard = () =>
  produceRandomCard();

module.exports.playerHand = () =>
  playersHand;

const playersTotal = totalOfHand(playersHand);
module.exports.thePlayerTotal = () =>
  playersTotal;

module.exports.playerStands = () =>
  `You stand with a hand of ${playersHand} and a total of ${playersTotal}`

let playerStandId = 0;
let playerStandIdSplit1 = 0;
let playerStandIdSplit2 = 0;
module.exports.playerStandId = () =>
  playerStandId;

module.exports.playerStandIdSplit1 = () =>
  playerStandIdSplit1;

module.exports.playerStandIdSplit2 = () =>
  playerStandIdSplit2;

let playerSplitHand1 = [playersHand[0], produceRandomCard()];
let playerSplitHand2 = [playersHand[1], produceRandomCard()];
module.exports.SplitHand1 = () =>
  playerSplitHand1;
module.exports.SplitHand2 = () =>
  playerSplitHand2;

const playerSplitTotal1 = totalOfHand(playerSplitHand1);
const playerSplitTotal2 = totalOfHand(playerSplitHand2);
module.exports.splitTotal1 = () =>
  playerSplitTotal1;
module.exports.splitTotal2 = () =>
  playerSplitTotal2;


module.exports.dealerHand = () =>
  dealersHand;

module.exports.cardsViewableByPlayer = () =>
  faceUpCards;

const dealersTotal = totalOfHand(dealersHand);
module.exports.theDealersTotal = () =>
  dealersTotal;

module.exports.dealerStands = () =>
  `The dealer stands with a hand of ${dealersHand} and a total of {dealersTotal}`

let dealerStandId = 0;
let dealerStandIdSplit = 0;
module.exports.dealerStandId = () =>
  dealerStandId;

module.exports.dealerStandIdSplit1 = () =>
  dealerStandIdSplit1;
