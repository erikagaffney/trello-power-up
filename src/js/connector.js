console.log('Hello World');

window.TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    // return an array of card badges for the card
    return t.card("all").then(function (card) {
      console.log(JSON.stringify(card, null, 2));
      return [{
        text: card.idShort,
        color: 'green',
      }];
    });
  }
});