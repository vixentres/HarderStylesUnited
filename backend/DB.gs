/* backend/DB.gs */

var DB = (function() {
  
  return {
    findBy: function(sheetName, colName, value) {
       // TODO: Implement Sheet lookup
       return null;
    },
    
    insert: function(sheetName, dataObj) {
       // TODO: Implement Insert
       return dataObj;
    },
    
    update: function(sheetName, rowNum, updatesObj) {
       // TODO: Implement Update
       return true;
    },

    query: function(sheetName, filterFn) {
       // TODO: Implement Query
       return [];
    }
  };

})();
