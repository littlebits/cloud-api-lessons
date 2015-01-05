var http = require('http')



var server = http.createServer(function(request, response) {
  var bodyString = ''
  request.on('data', function(bodyChunk) {
    bodyString += String(bodyChunk)
  })
  request.on('end', function() {
    /* On any GET respond with a friendly message explaining that this
    application has no interesting client-side component. */
    if (request.method === 'GET') return response.end('Hello, this is a trivial cloudBit Reader App. Nothing else to see here; all the action happens server-side. Confused? On the CLI use `$ heroku logs` to see any input activity from webhook-registered cloudBits.')

    /* On any POST respond with a 200 OK string. Yup, this is very liberal. */
    handleCloudbitEvent(JSON.parse(bodyString))
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end('OK')
  })
})

server.listen(process.env.PORT || 3000, function() {
  console.log('App booted at: %j', server.address())
})



function handleCloudbitEvent(event) {
  switch (event.type) {
    case 'amplitude':
      // Do whatever you want with the amplitde
      var percent = event.payload.percent
      var level = event.payload.level
      var delta = event.payload.delta
      console.log('cloudBit amplitude: percent @ %d% | level @ %s | delta @ %s', percent, level, delta)
      break
    case 'connectionChange':
      // One day, cloudBits will emit this event too, but not yet.
      break
    default:
      console.warn('cloudBit sent an unexpected event...? %j', event)
      break
  }
}
