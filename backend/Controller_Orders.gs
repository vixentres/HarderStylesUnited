/* backend/Controller_Orders.gs */

var OrderController = {
  
  getEventData: function(data) {
    // TODO: Fetch CONFIG
    return { event: {}, items: [] };
  },
  
  createOrder: function(data) {
    // TODO: Insert REGISTRO_PADRE
    return { order_id: 'REG-MOCK' };
  },
  
  reportPayment: function(data) {
    // TODO: Update Item
    return { modified: true };
  }
};
