/* backend/Utils.gs */

var Utils = {
  
  /**
   * Standard Success Response Builder
   */
  buildSuccess: function(data) {
    return {
      status: 'success',
      data: data || {}
    };
  },

  /**
   * Standard Error Response Builder
   */
  buildError: function(message, extra) {
    var err = {
      status: 'error',
      message: message
    };
    if (extra) {
      for (var key in extra) {
        err[key] = extra[key];
      }
    }
    return err;
  },

  /**
   * Current ISO Date String
   */
  nowISO: function() {
    return new Date().toISOString();
  },

  /**
   * Standardized Date Object
   */
  now: function() {
    return new Date();
  },

  /**
   * Generate ID with Prefix
   * Uses GAS UUID
   */
  uid: function(prefix) {
    return prefix + '-' + Utilities.getUuid();
  },

  /**
   * Convert Sheet Row Array to Object based on Headers
   */
  rowToObj: function(headers, row, rowNum) {
    var obj = { _row: rowNum };
    headers.forEach(function(h, i) {
      obj[h] = row[i]; // Keep raw value (Date objects remain Date objects intra-script)
    });
    return obj;
  }
};
