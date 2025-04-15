console.log('Hello World');

window.TrelloPowerUp.initialize({
  'card-badges': function (t, options) {
    const restApi = t.getRestApi();
    
    return restApi.authorize().then(() => t.card('id'))
    .then(card => {
      return restApi.get('/cards/' + card.id + '/actions', { filter: 'updateCard:idList' });
    }).then(actions => {
      console.log('Actions:', actions);
      return [{
        text: 'Fetched!',
        color: 'green'
      }];
    })
    .catch(err => {
      console.error('Error fetching card info or actions:', err);
      return [{
        text: 'Error',
        color: 'red'
      }];
    });
  }
}, {
  appKey: process.env.POWER_UP_TRELLO_API_KEY,
  appName: 'Test Trello Power-Up',
});
