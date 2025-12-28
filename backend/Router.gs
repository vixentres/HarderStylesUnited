/* backend/Router.gs */

var Dispatcher = {
  
  dispatch: function(action, data) {
    switch (action) {
      // --- AUTH ---
      case 'LOGIN':
        return AuthController.login(data);
      case 'REGISTER_CLIENT':
        return AuthController.register(data);
        
      // --- CLIENT ---
      case 'GET_EVENT_DATA':
        return OrdersController.getEventData(data);
      case 'CREATE_ORDER':
        return OrdersController.createOrder(data);
      case 'REPORT_PAYMENT':
         return OrdersController.reportPayment(data);
         
      // --- ADMIN ---
      case 'GET_ADMIN_DASHBOARD':
        return AdminController.getDashboard(data);
      case 'APPROVE_PAYMENT':
        return AdminController.approvePayment(data);
      case 'DELIVER_TICKET':
        return AdminController.deliverTicket(data);
      
      default:
        return Utils.buildError("UNKNOWN_ACTION: " + action);
    }
  }
};
