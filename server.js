var http = require('http')

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});  

  var body = ''
  request.on('data', function (data) {
    body += data;
  })
  request.on('end', function () {
    d = JSON.parse(body)
    var cloudBit_input_level = d.payload.percent
    
    // you can now do whatever you want with cloudBit_input_level
    // which will be a percent (int) 0-100
    console.log(cloudBit_input_level)
  })

})

var port = process.env.PORT || 3000
server.listen(port)

console.log("Server running at http://127.0.0.1:"+port)