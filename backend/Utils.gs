/* backend/Utils.gs */

var Utils = {
  
  /**
   * Convert Sheet Row Array to Object based on Headers
   */
  rowToObject: function(headers, row, rowNum) {
    var obj = { _row: rowNum };
    headers.forEach(function(h, i) {
      obj[h] = row[i];
    });
    return obj;
  },

  /**
   * Generate UUID v4 (Simple implementation)
   */
  generateUUID: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  },
  
  /**
   * Format Date to ISO String or Custom
   */
  now: function() {
    return new Date();
  },
  
  /**
   * Standard Success Response
   */
  success: function(data) {
    return { status: 'success', data: data };
  },
  
   /**
   * Standard Error Response
   */
  error: function(msg) {
    return { status: 'error', message: msg };
  }
};
