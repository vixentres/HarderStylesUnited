/* backend/Controller_Auth.gs */

var AuthController = {
  
  /**
   * Action: LOGIN
   * Data: { email: string }
   */
  login: function(data) {
    if (!data.email) return Utils.buildError("Email is required");
    
    var email = data.email.trim().toLowerCase();
    
    // 1. Try Find Admin
    // Using loose find first
    var admin = DB.findBy('ADMIN_STAFF', 'CORREO', email);
    if (admin && admin.STATUS === 'ACTIVO') {
       // Update ULT_LOGIN
       DB.update('ADMIN_STAFF', admin._row, { 'ULT_LOGIN': Utils.nowISO() });
       return Utils.buildSuccess({
         user: { 
           id: admin.ID_ADMIN, 
           name: admin.NOMBRE, 
           email: admin.CORREO, 
           role: admin.ROL 
         }
       });
    }
    
    // 2. Try Find Client
    var client = DB.findBy('CLIENTE', 'CORREO', email);
    
    if (client) {
      if (client.STATUS === 'SUSPENDIDO') return Utils.buildError("Account Suspended");
      
      // Update ULT_CONEXION
      DB.update('CLIENTE', client._row, { 'ULT_CONEXION': Utils.nowISO() });
      
      return Utils.buildSuccess({
        user: {
           id: client.ID_CLI,
           name: client.NOMBRE,
           email: client.CORREO,
           role: 'CLIENT'
        }
      });
    }
    
    // 3. Not Found -> Prompt Registration
    return Utils.buildSuccess({ status: 'NEW_USER' });
  },
  
  /**
   * Action: REGISTER_CLIENT
   * Data: { name: string, email: string, phone: string }
   */
  register: function(data) {
    if (!data.name || !data.email || !data.phone) {
       return Utils.buildError("Missing fields (name, email, phone)");
    }
    
    var email = data.email.trim().toLowerCase();
    
    // Double check existence check
    var existing = DB.findBy('CLIENTE', 'CORREO', email);
    if (existing) return Utils.buildError("User already exists");
    
    var newId = Utils.uid('CLI');
    var now = Utils.nowISO();
    
    var newClient = {
      'ID_CLI': newId,
      'FECHA_REG': now,
      'NOMBRE': data.name,
      'CORREO': email,
      'TEL': data.phone,
      'STATUS': 'ACTIVO',
      'ULT_CONEXION': now,
      'NOTAS': ''
    };
    
    try {
      DB.insert('CLIENTE', newClient);
      
      return Utils.buildSuccess({
        user: {
           id: newId,
           name: data.name,
           email: email,
           role: 'CLIENT'
        }
      });
    } catch (e) {
      return Utils.buildError("DB Error: " + e.toString());
    }
  }
};
