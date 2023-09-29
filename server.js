// Variable Declarations and importing modules
const http = require('http'),
  fs = require('fs'),
  url = require('url');

  // Server creation - http module is being used to create a new server
http.createServer((request, response) => {
  // request.url gets the URL from the request  
  let addr = request.url,
    q = url.parse(addr, true),
    filePath = '';

  // code to log recent requests made to server
  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });
  
  // checks the exact pathname of the entered URL. q is where the parsed URL from the user is stored.
  // includes checks for a specific value or string
  // _dirname is a module-specific variable that provides the path to the current directory
  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  // fs module grabbing appropriate file from server
  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }
  
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end('Hello Node!\n');
  });

}).listen(8080);
console.log('My first Node test server is running on Port 8080.');