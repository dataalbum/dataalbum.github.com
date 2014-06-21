var londonUrl = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk',
    stockholmUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kempele,fi';

$.when(
    $.get(londonUrl),
    $.get(stockholmUrl)
).then(function(london, stockholm) {
  console.log('London wheater %o, Stockholm wheater %o', london[0], stockholm[0]);
}).fail(function(err) {
  console.error('Opps', err);
});