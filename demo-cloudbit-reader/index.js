var http = require('http')



var server = http.createServer(function(request, response){
  var bodyString = ''
  request.on('data', function(bodyChunk){
    bodyString += String(bodyChunk)
  })
  request.on('end', function(){
    handleCloudbitEvent(JSON.parse(bodyString))
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end('OK')
  })
})

server.listen(process.env.PORT || 3000, function(){
  console.log('App booted at: %j', server.address())
})



function handleCloudbitEvent(event){
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