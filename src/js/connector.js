console.log('Hello World');

window.TrelloPowerUp.initialize({
  'card-badges': function (t, options) {
    // return array of card badges for the given card
    console.log('card-badges called', t, options);
    return t.card('all').then(function(card) {
      console.log('card data', card);
      return [{
        title: 'Card ID',
        text: card.idShort,
        color: 'blue',
      }];
    });
  }
});

// TrelloPowerUp.initialize({
//   'card-buttons': function(t, options){
//     console.log("card-buttons called", t, options);
//     return [{
//       icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
//       text: 'Estimate Size',
//     }];
//   },
// });