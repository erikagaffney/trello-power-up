// window.TrelloPowerUp.initialize({
//   'card-badges': function (t, options) {
//     // return array of card badges for the given card
//     console.log('card-badges called', t, options);
//     return t.card('all').then(function(card) {
//       console.log('card data', card);
//       return [];
//     });
//   }
// });

const applicableLists = ['in progress', 'blocked', 'up next', 'in review'];

const createCardBadge = (timestamp) => {
  const timeInList = Math.round((Date.now() - timestamp) / (1000 * 60 * 60 * 24));
  const ending = timeInList === 1 ? 'day' : 'days';
  return [{
    text: `${timeInList} ${ending}`,
    title: 'Time in List',
    color: timeInList > 3 ? 'red' : 'green',
  }];
};

window.TrelloPowerUp.initialize({
  'card-badges': async function (t, options) {
    console.log('poop begin');
    const list = await t.list('id', 'name');
    let listTracking = await t.get('card', 'shared', 'listTracking');
    
    if (listTracking?.current?.listId === list.id) {
      console.log('poop current list is same as stored current list');
      return createCardBadge(listTracking.current.startTime);
    };

    let history = [...listTracking?.history || []];
    const matchedList = applicableLists.filter((listName) => list.name.toLowerCase().includes(listName))[0];
    let current = matchedList ? { listId: list.id, listName: list.name, startTime: Date.now() } : null;

    if (listTracking?.current) {
      console.log('poop current list exists and new list is applicable, pushing to history');
      history.push({...listTracking.current, endTime: Date.now()});
    }
    
    listTracking = { current, history };
    console.log('poop setting listTracking', listTracking);
    await t.set('card', 'shared', 'listTracking', listTracking)
    return matchedList ? createCardBadge(listTracking.current.startTime) : [];
  },
    'card-buttons': function(t, options) {
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png',
      text: 'Test Timer',
      callback: function(t) {
        return t.popup({
          title: 'Timer Testing',
          items: [
            {
              text: 'Set to 0 days',
              callback: function(t) {
                return setTestDays(t, 0);
              }
            },
            {
              text: 'Set to 1 day',
              callback: function(t) {
                return setTestDays(t, 1);
              }
            },
            {
              text: 'Set to 2 days',
              callback: function(t) {
                return setTestDays(t, 2);
              }
            },
            {
              text: 'Set to 5 days',
              callback: function(t) {
                return setTestDays(t, 5);
              }
            },
            {
              text: 'View tracking data',
              callback: function(t) {
                return t.get('card', 'shared', 'listTracking')
                  .then(function(data) {
                    alert(JSON.stringify(data, null, 2));
                  });
              }
            },
            {
              text: 'Clear all data',
              callback: function(t) {
                return t.remove('card', 'shared', 'listTracking')
                  .then(function() {
                    return t.alert({
                      message: 'Data cleared!',
                      duration: 2
                    });
                  });
              }
            }
          ]
        });
      }
    }];
  }
});

// Helper function
function setTestDays(t, days) {
  return t.list('id').then(function(list) {
    const timestamp = Date.now() - (days * 24 * 60 * 60 * 1000);
    const data = {
      current: {
        listId: list.id,
        startTime: timestamp
      },
      history: []
    };
    
    return t.set('card', 'shared', 'listTracking', data)
      .then(function() {
        return t.alert({
          message: `Set to ${days} days ago!`,
          duration: 2
        });
      });
  });
}