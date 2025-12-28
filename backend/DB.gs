/* backend/DB.gs */

var DB = (function() {
  
  var CACHE_SHEETS = {};
  var CACHE_HEADERS = {};

  /**
   * Private: Get Sheet Object
   */
  function getSheet(name) {
    if (CACHE_SHEETS[name]) return CACHE_SHEETS[name];
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(name);
    if (!sheet) throw new Error("DB Error: Sheet not found [" + name + "]");
    
    CACHE_SHEETS[name] = sheet;
    return sheet;
  }

  /**
   * Private: Get Headers (Row 1)
   */
  function getHeaders(sheetName) {
    if (CACHE_HEADERS[sheetName]) return CACHE_HEADERS[sheetName];
    
    var sheet = getSheet(sheetName);
    var lastCol = sheet.getLastColumn();
    if (lastCol === 0) return [];
    
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    CACHE_HEADERS[sheetName] = headers;
    return headers;
  }

  return {
    
    /**
     * Find dictionary row by Column Value
     * Returns: { _row: number, ...data } or null
     */
    findBy: function(sheetName, colName, value) {
      // Note: effective optimization for small-medium DBs (<5000 rows).
      // For larger DBs, consider specialized indexing or filtered ranges.
      var sheet = getSheet(sheetName);
      var data = sheet.getDataRange().getValues(); // Read all
      if (data.length <= 1) return null; // Only headers

      var headers = data[0];
      var colIndex = headers.indexOf(colName);
      if (colIndex === -1) throw new Error("DB Error: Column " + colName + " not found in " + sheetName);

      for (var i = 1; i < data.length; i++) {
        // Loose comparison for string vs number safety
        if (data[i][colIndex] == value) {
          return Utils.rowToObj(headers, data[i], i + 1);
        }
      }
      return null;
    },

    /**
     * Insert new Row
     * Uses LockService to prevent conflicts
     */
    insert: function(sheetName, dataObj) {
      var lock = LockService.getScriptLock();
      // Wait up to 10 seconds for other processes to finish
      if (!lock.tryLock(10000)) {
        throw new Error("DB Error: Server busy (Lock timeout)");
      }

      try {
        var sheet = getSheet(sheetName);
        var headers = getHeaders(sheetName);
        var newRow = [];

        headers.forEach(function(h) {
          newRow.push(dataObj.hasOwnProperty(h) ? dataObj[h] : "");
        });

        sheet.appendRow(newRow);
        SpreadsheetApp.flush(); // Force write
        return dataObj;
        
      } finally {
        lock.releaseLock();
      }
    },

    /**
     * Update Row by Row Index (from findBy._row)
     */
    update: function(sheetName, rowIndex, dataObj) {
       var lock = LockService.getScriptLock();
       if (!lock.tryLock(10000)) {
         throw new Error("DB Error: Server busy (Lock timeout)");
       }

       try {
         var sheet = getSheet(sheetName);
         var headers = getHeaders(sheetName);
         
         // Inefficient but safe: update cell by cell for sparse updates
         // Can be optimized if needed.
         for (var key in dataObj) {
           var colIndex = headers.indexOf(key);
           if (colIndex > -1) {
             // rowIndex is 1-based, colIndex is 0-based -> getRange(row, col+1)
             sheet.getRange(rowIndex, colIndex + 1).setValue(dataObj[key]);
           }
         }
         SpreadsheetApp.flush();
         return true;

       } finally {
         lock.releaseLock();
       }
    }
  };

})();
