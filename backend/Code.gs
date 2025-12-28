/* backend/Code.gs */

/**
 * Main Web App Entry Point - POST Requests
 */
function doPost(e) {
  // TODO: Payload parsing and routing
  return ContentService.createTextOutput(JSON.stringify({ status: 'scaffold_only' }));
}

/**
 * Handle GET Requests - Serve info or simple query
 */
function doGet(e) {
  // TODO: Healtcheck
  return ContentService.createTextOutput("Backend Scaffold Active");
}
