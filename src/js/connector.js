console.log('Hello World');

window.TrelloPowerUp.initialize({
  'card-badges': function (t, options) {
    // return an array of card badges for the card
    return t
      .card('id')
      .then(function (card) {
        return t
          .getRestApi()
          .get(`/cards/${card.id}/actions`, { filter: 'updateCard:idList' });

        //   console.log(JSON.stringify(card, null, 2));
        //   return [{
        //     text: card.idShort,
        //     color: 'green',
        //   }];
        // });
      })
      .then(function (response) {
        console.log('Response:', response);
        return [
          {
            text: 'Hello World',
            color: 'green',
          },
        ];
      });
  },
});
