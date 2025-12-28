/* backend/Controller_Admin.gs */

var AdminController = {
  
  getDashboard: function(data) {
     // TODO: Fetch Metrics
     return { metrics: {}, pending: [] };
  },
  
  approvePayment: function(data) {
     // TODO: Logic for approval
     return { new_status: 'PAGADO' };
  }
};
