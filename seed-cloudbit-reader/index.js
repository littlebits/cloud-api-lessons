var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var app = express()



/* Middleware */

app.use(bodyParser.json())
app.use(morgan('dev'))



/* Rotues */

/* On a root GET respond with a friendly message explaining that this
application has no interesting client-side component. */
app.get('/', function(req, res) {
  res.send('Hello, this is a trivial cloudBit Reader App. Nothing else to see here; all the action happens server-side. Confused? On the CLI use `$ heroku logs` to see any recent input activity from webhook-registered cloudBits.')
})

/* On a root POST log info about the (should be) cloudBit event. */
app.post('/', function(req, res) {
  handleCloudbitEvent(req.body)
  res.send('OK')
})



/* Boot the server. */

var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('App booted at http://%s:%s', host, port)
})




// Helpers

function handleCloudbitEvent(event) {
  switch (event.type) {
    case 'amplitude':
      // Do whatever you want with the amplitde
      console.log('cloudBit input received: %d%', event.payload.percent)
      break
    case 'connectionChange':
      // One day, cloudBits will emit this event too, but not yet.
      break
    default:
      console.warn('cloudBit sent an unexpected event...? %j', event)
      break
  }
}
