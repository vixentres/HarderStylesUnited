/* backend/Code.gs */

function doGet(e) {
  var output = {
    status: 'online',
    ping: 'ok',
    timestamp: new Date().toISOString()
  };
  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var jsonString = e.postData.contents;
    var payload = JSON.parse(jsonString);
    
    // Simple Ping-Pong Test logic
    if (payload.action === 'PING') {
       return ContentService.createTextOutput(JSON.stringify({
         status: 'success',
         ping: 'pong'
       })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
       status: 'ok',
       received: payload
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
