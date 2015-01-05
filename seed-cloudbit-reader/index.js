var http = require('http')



var server = http.createServer(function(request, response) {
  console.log('Handling new request: method %j | URI %j ', request.method, request.url)

  var bodyString = ''

  request.on('data', function(bodyChunk) {
    console.log('Received data chunk received: %j', String(bodyChunk))
    bodyString += String(bodyChunk)
  })

  request.once('end', function() {
    /* On any GET respond with a friendly message explaining that this
    application has no interesting client-side component. */
    if (request.method === 'GET') return response.end('Hello, this is a trivial cloudBit Reader App. Nothing else to see here; all the action happens server-side. Confused? On the CLI use `$ heroku logs` to see any recent input activity from webhook-registered cloudBits.')

    /* On any POST respond with a 200 OK string. Yup, this is very liberal. */
    console.log('Received POST body: %j', bodyString)

    /* Try to safely parse the BODY */
    var cloudBitEvent
    try {
      cloudBitEvent = JSON.parse(bodyString)
    } catch (jsonParseError) {
      response.end('ERROR')
      return console.error('There was a JSON parse error on the POST body: %j. The error was: %j', bodyString, jsonParseError)
    }

    handleCloudbitEvent(cloudBitEvent)
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
