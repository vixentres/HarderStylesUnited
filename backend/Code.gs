/* backend/Code.gs */

/**
 * Main Web App Entry Point - POST Requests
 */
function doPost(e) {
  var output;
  
  try {
    // 1. Validate Payload
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Invalid Payload: No postData");
    }
    
    var jsonString = e.postData.contents;
    var payload;
    try {
      payload = JSON.parse(jsonString);
    } catch (parseError) {
      throw new Error("Invalid JSON Format");
    }
    
    var action = payload.action;
    var data = payload.data || {};
    
    // 2. Handle PING (Action 0)
    // This is hardcoded to ensure availability check works even if Router fails.
    if (action === 'PING') {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        ping: 'pong'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Dispatch to Router
    if (!action) throw new Error("Missing 'action' field");
    
    output = Dispatcher.dispatch(action, data);
    
  } catch (error) {
    // Catch-all for uncaught errors
    output = { 
      status: 'error', 
      message: error.toString()
    };
  }
  
  // 4. Return Final JSON
  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle GET Requests - Serve info or simple query
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    ping: 'ok',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
