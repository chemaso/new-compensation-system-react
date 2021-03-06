import get from 'lodash/get'

const language = 'es'

const messages = {
    en: {
        'common.home': 'Home',
        'common.dashboard': 'Dashboard',
        'common.maintanence': 'Maintanence',
        'common.department': 'Department',
        'common.query': 'Query',
        'common.data': 'data',
        'common.user': 'User',
        'common.role': 'Role',
        'common.warning': 'Warning',
        'common.multi.filterAvailable': 'Filter Available',
        'common.multi.filterSelected': 'Filter Selected',
        'common.multi.available': 'Available',
        'common.multi.selected': 'Selected',
        'common.security': 'Security',
        'common.error': 'Something went wrong, please try again later.',
        'common.image': 'Image',
        'action.account.loggedOut': 'You have been successfully logged out.',
        'action.account.expired': 'You session have been expired, please log in again to continue.',
        'action.account.password': 'Your password was successfully changed.',
        'common.unauthorized': 'Unauthorized',
        'action.department.create': 'The Department was successfully created.',
        'action.department.update': 'The Department was successfully updated.',
        'action.department.delete': 'The Department was successfully deleted',
        'action.permissions.error': 'Something went wrong, please try again later.',
        'action.permissions.unauthorized': 'Unauthorized',
        'action.roles.error': 'Something went wrong, please try again later.',
        'action.roles.unauthorized': 'Unauthorized',
        'action.roles.delete': 'The Role was successfully deleted.',
        'action.roles.update': 'The Role was successfully updated.',
        'action.roles.create': 'The Role was successfully created.',
        'action.users.error': 'Something went wrong, please try again later.',
        'action.users.unauthorized': 'Unauthorized',
        'action.users.delete': 'The User was successfully deleted.',
        'action.users.update': 'The User was successfully updated.',
        'action.users.create': 'The User was successfully created.',
        'action.users.reset': "Password successfully sended to user's email.",
        'common.copyright.copy': 'Copyright © ',
        'common.copyright.content': 'SICE - All rights reserved.',
        'common.cards.button': 'View',
        'common.expirationModal.title': 'Session Expire Warning',
        'common.expirationModal.init': 'Your session will expire in ',
        'common.expirationModal.end': 'seconds. Do you want to extend the session?.',
        'common.expirationModal.logout': 'Log Out',
        'common.expirationModal.continue': 'Continue',
        'common.filter.title': 'Filters',
        'common.filter.cancel': 'Clear',
        'common.filter.continue': 'Apply',
        'common.search.text': 'Search…',
        'common.notifications.button': 'Continue',
        'dashboard.title': 'Dashboard',
        'departments.title': 'Departments',
        'departments.addNew': 'Add New',
        'departments.filter': 'Filter',
        'departments.cancel': 'Cancel',
        'departments.edit': 'Edit',
        'departments.delete': 'Delete',
        'departments.actions': 'Actions',
        'departments.deleteModal': "Are you sure you want to delete the Department?",
        'departments.confirmModal': 'Please Confirm',
        'departments.continue': 'Continue',
        'departments.addDepartment.code': 'Code',
        'departments.addDepartment.name': 'Name',
        'departments.addDepartment.helmet': 'Add Department',
        'departments.addDepartment.cancel': 'Cancel',
        'departments.addDepartment.save': 'Save Changes',
        'departments.addDepartment.title': 'Add New Department',
        'departments.addDepartment.error.email': '- Incorrect format',
        'departments.addDepartment.error.required': 'Is required',
        'departments.editDepartment.id': 'ID',
        'departments.editDepartment.code': 'Code',
        'departments.editDepartment.name': 'Name',
        'departments.editDepartment.helmet': 'Edit Department',
        'departments.editDepartment.cancel': 'Cancel',
        'departments.editDepartment.save': 'Save Changes',
        'departments.editDepartment.title': 'Edit Department: #',
        'departments.editDepartment.error.email': '- Incorrect format',
        'departments.editDepartment.error.required': 'Is required',
        'hooks.menu.dashboard': 'Dashboard',
        'hooks.external.password.required': 'Password is required.',
        'hooks.external.password.length': 'Password must have at least 8 characters.',
        'hooks.external.repeatPassword.required': 'Repeat Password is required.',
        'hooks.external.repeatPassword.match': 'Repeat Password should match with Password.',
        'hooks.external.email.required': 'Email is required.',
        'hooks.external.email.format': 'The Email format is not correct.',
        'hooks.external.firstName.required': 'First Name is required.',
        'hooks.external.userName.required': 'Username is required.',
        'hooks.external.lastName.required': 'Last Name is required.',
        'hooks.external.oldPassword.required': 'Old Password is required.',
        'login.title': 'Welcome to SICE',
        'login.helmet': 'Login',
        'login.form.username': 'Username',
        'login.form.password': 'Password',
        'login.form.signIn': 'Sign In',
        'master.aside.logout': 'Log Out',
        'master.aside.welcome': 'Welcome',
        'maintanence.title': 'Maintanence',
        'passwordRecovery.title': 'Welcome to SICE',
        'passwordRecovery.helmet': 'Reset Password',
        'passwordRecovery.form.title': 'To continue please reset your password:',
        'passwordRecovery.form.oldPassword': 'Old Password',
        'passwordRecovery.form.newPassword': 'New Password',
        'passwordRecovery.form.repeatPassword': 'Repeat Password',
        'passwordRecovery.form.cancel': 'Cancel',
        'passwordRecovery.form.submit': 'Reset Password', 
        'roles.name': 'Name', 
        'roles.id': 'ID', 
        'roles.title': 'Roles', 
        'roles.edit': 'Edit', 
        'roles.delete': 'Delete', 
        'roles.filter': 'Filter', 
        'roles.actions': 'Actions', 
        'roles.addNew': 'Add New', 
        'roles.cancel': 'Cancel', 
        'roles.continue': 'Continue', 
        'roles.addRole.name': 'Name', 
        'roles.addRole.description': 'Description', 
        'roles.addRole.permissions': 'Permissions', 
        'roles.addRole..error.email': '- Incorrect format', 
        'roles.addRole..error.required': 'Is required', 
        'roles.addRole.helmet': 'Add Role', 
        'roles.addRole.title': 'Add New Role:', 
        'roles.addRole.cancel': 'Cancel', 
        'roles.addRole.save': 'Save Changes', 
        'roles.editRole.name': 'Name', 
        'roles.editRole.description': 'Description', 
        'roles.editRole.permissions': 'Permissions', 
        'roles.editRole.error.email': '- Incorrect format', 
        'roles.editRole.error.required': 'Is required', 
        'roles.editRole.helmet': 'Edit Role', 
        'roles.editRole.title': 'Add New Role: #', 
        'roles.editRole.cancel': 'Cancel', 
        'roles.editRole.save': 'Save Changes', 
        'security.title': 'Security', 
        'users.dni': 'Identification', 
        'users.username': 'Username', 
        'users.name': 'Name', 
        'users.email': 'Email', 
        'users.profile': 'Profile', 
        'users.department': 'Department', 
        'users.actions': 'Actions', 
        'users.helmet': 'User', 
        'users.edit': 'Edit', 
        'users.delete': 'Delete', 
        'users.filter': 'Filter', 
        'users.addNew': 'Add New', 
        'users.cancel': 'Cancel', 
        'users.continue': 'Continue', 
        'users.addUser.identification': 'Identification', 
        'users.addUser.login': 'Login', 
        'users.addUser.email': 'Email', 
        'users.addUser.name': 'Name', 
        'users.addUser.department': 'Department', 
        'users.addUser.profile': 'Profile', 
        'users.addUser.required': 'Is required', 
        'users.addUser.title': 'Add New User:', 
        'users.addUser.helmet': 'Add User', 
        'users.addUser.cancel': 'Cancel', 
        'users.addUser.continue': 'Save Changes', 
        'users.editUser.identification': 'Identification', 
        'users.editUser.login': 'Login', 
        'users.editUser.email': 'Email', 
        'users.editUser.name': 'Name', 
        'users.editUser.department': 'Department', 
        'users.editUser.profile': 'Profile', 
        'users.editUser.required': 'Is required',  
        'users.editUser.helmet': 'Edit User', 
        'users.editUser.cancel': 'Cancel', 
        'users.editUser.continue': 'Save Changes', 
        'users.editUser.activated': 'The user was succesfully activated.', 
        'users.editUser.suspended': 'The user was succesfully disabled.', 
        'users.editUser.error': 'There  was an error, please try again.', 
        'users.editUser.disable': 'Disable', 
        'users.editUser.enable': 'Enable', 
        'users.editUser.generate': 'Generate', 
        'users.editUser.contentStart': "You're about to", 
        'users.editUser.contentEnd': "the user, do you want to continue?", 
        'users.editUser.generateStart': "You're about to generate a password for the user", 
        'users.editUser.generateEnd': ", do you want to continue?", 
        'users.editUser.title': "Edit User: #", 
        'users.editUser.activeTitle': "Active User", 
        'users.editUser.activeNo': "No", 
        'users.editUser.activeYes': "Yes", 
        'users.editUser.generateTitle': "Generate User Password:", 
    },
    es: {
        'common.home': 'Inicio',
        'common.dashboard': 'Tablero',
        'common.maintanence': 'Mantenimientos',
        'common.department': 'Departamentos',
        'common.query': 'Consultas',
        'common.data': 'Reportes',
        'common.warning': 'Advertencia',
        'common.unauthorized': 'No autorizado',
        'common.user': 'Usuarios',
        'common.role': 'Roles',
        'common.security': 'Seguridad',
        'common.image': 'Imagenes',
        'common.multi.filterAvailable': 'Filtrar Disponibles',
        'common.multi.filterSelected': 'Filtrar Seleccionados',
        'common.multi.available': 'Disponibles',
        'common.multi.selected': 'Seleccionados',
        'common.error': 'Algo fallo, por favor intente nuevamente.',
        'action.account.loggedOut': 'Se deslogueo de forma exitosa.',
        'action.account.expired': 'Su sesión expiro, inicie sesión nuevamente para continuar.',
        'action.account.password': 'Su contraseña fue cambiada exitosamente.',
        'action.department.unauthorized': 'No autorizado',
        'action.department.create': 'El Departamento se guardado exitosamente.',
        'action.department.update': 'El Departamento se actualizo exitosamente.',
        'action.department.delete': 'El Departamento se elimino exitosamente.',
        'action.permissions.error': 'Algo no salio bien, por favor intente nuevamente.',
        'action.permissions.unauthorized': 'No Autorizado',
        'action.roles.error': 'Algo no salio bien, por favor intente nuevamente.',
        'action.roles.unauthorized': 'No Autorizado',
        'action.roles.delete': 'El Perfil se elimino exitosamente.',
        'action.roles.update': 'El Perfil se actualizo exitosamente.',
        'action.roles.create': 'El Perfil se guardo exitosamente.',
        'action.users.error': 'Algo no salio bien, por favor intente nuevamente.',
        'action.users.unauthorized': 'No Autorizado',
        'action.users.delete': 'El Usuario se elimino exitosamente.',
        'action.users.update': 'El Usuario se actualizo exitosamente.',
        'action.users.create': 'El Usuario se guardo exitosamente.',
        'action.users.reset': "La contraseña se envio exitosamente al correo del usuario.",
        'common.copyright.copy': 'Copyright © ',
        'common.copyright.content': 'SICE - Derechos reservados.',
        'common.cards.button': 'Ver Mas',
        'common.expirationModal.title': 'Advertencia, la sesión esta por expirar',
        'common.expirationModal.init': 'Su sesión va a expirar en ',
        'common.expirationModal.end': 'segundos, desea renovar su sesión?.',
        'common.expirationModal.logout': 'Cerrar Sesión',
        'common.expirationModal.continue': 'Continuar',
        'common.filter.title': 'Filtros',
        'common.search.text': 'Buscar',
        'common.filter.cancel': 'Limpiar',
        'common.filter.continue': 'Aplicar',
        'common.notifications.button': 'Continuar',
        'dashboard.title': 'Tablero',
        'departments.title': 'Departamentos',
        'departments.addNew': 'Agregar Nuevo',
        'departments.filter': 'Filtro',
        'departments.cancel': 'Cancelar',
        'departments.edit': 'Editar',
        'departments.delete': 'Borrar',
        'departments.actions': 'Acciones',
        'departments.deleteModal': "Estas seguro de borrar el departamento?",
        'departments.confirmModal': "Por Favor Confirme",
        'departments.continue': 'Continuar',
        'departments.addDepartment.code': 'Codigo',
        'departments.addDepartment.name': 'Nombre',
        'departments.addDepartment.helmet': 'Agregar Departamento',
        'departments.addDepartment.cancel': 'Cancelar',
        'departments.addDepartment.save': 'Guardar Cambios',
        'departments.addDepartment.title': 'Agregar Nuevo Departamento',
        'departments.addDepartment.error.email': '- Formato incorrecto',
        'departments.addDepartment.error.required': 'Es requerido',
        'departments.editDepartment.id': 'ID',
        'departments.editDepartment.code': 'Codigo',
        'departments.editDepartment.name': 'Nombre',
        'departments.editDepartment.helmet': 'Editar Departamento',
        'departments.editDepartment.cancel': 'Cancelar',
        'departments.editDepartment.save': 'Guardar Cambios',
        'departments.editDepartment.title': 'Editar Departamento: #',
        'departments.editDepartment.error.email': '- Formato incorrecto',
        'departments.editDepartment.error.required': 'Es requerido',
        'hooks.menu.dashboard': 'Tablero',
        'hooks.external.password.required': 'Contraseña Es requerido.',
        'hooks.external.password.length': 'Contraseña debe tener al menos 8 caracteres.',
        'hooks.external.repeatPassword.required': 'Repetir Contraseña Es requerido.',
        'hooks.external.repeatPassword.match': 'Repetir Contraseña should match with Contraseña.',
        'hooks.external.email.required': 'Email Es requerido.',
        'hooks.external.email.format': 'El Email formato no es correcto.',
        'hooks.external.firstName.required': 'Nombre Es requerido.',
        'hooks.external.userName.required': 'Nombre de usuario Es requerido.',
        'hooks.external.lastName.required': 'Apellido Es requerido.',
        'hooks.external.oldPassword.required': 'Contraseña Antigua Es requerido.',
        'login.title': 'Bienvenido a  SICE',
        'login.helmet': 'Iniciar Sesión',
        'login.form.username': 'Nombre de usuario',
        'login.form.password': 'Contraseña',
        'login.form.signIn': 'Iniciar sesión',
        'master.aside.logout': 'Cerrar Sesión',
        'master.aside.welcome': 'Bienvenido',
        'maintanence.title': 'Mantenimiento',
        'passwordRecovery.title': 'Bienvenido a  SICE',
        'passwordRecovery.helmet': 'Reiniciar Contraseña',
        'passwordRecovery.form.title': 'Para continuar reinicie su contraseña:',
        'passwordRecovery.form.oldPassword': 'Antigua Contraseña',
        'passwordRecovery.form.newPassword': 'Nueva Contraseña',
        'passwordRecovery.form.repeatPassword': 'Repetir Contraseña',
        'passwordRecovery.form.cancel': 'Cancelar',
        'passwordRecovery.form.submit': 'Reiniciar Contraseña', 
        'roles.name': 'Nombre', 
        'roles.id': 'ID', 
        'roles.title': 'Roles', 
        'roles.edit': 'Editar', 
        'roles.delete': 'Borrar', 
        'roles.filter': 'Filtro', 
        'roles.actions': 'Acciones', 
        'roles.addNew': 'Agregar Nuevo', 
        'roles.cancel': 'Cancelar', 
        'roles.continue': 'Continuar', 
        'roles.addRole.name': 'Nombre', 
        'roles.addRole.description': 'Descripción', 
        'roles.addRole.permissions': 'Permisos', 
        'roles.addRole.email': 'Email', 
        'roles.addRole.required': 'Es requerido', 
        'roles.addRole.helmet': 'Agregar Perfil', 
        'roles.addRole.title': 'Agregar Nuevo Perfil:', 
        'roles.addRole.cancel': 'Cancelar', 
        'roles.addRole.save': 'Guardar Cambios', 
        'roles.editRole.name': 'Nombre', 
        'roles.editRole.description': 'Descripción', 
        'roles.editRole.permissions': 'Permisos', 
        'roles.editRole.email': 'Email', 
        'roles.editRole.required': 'Es requerido', 
        'roles.editRole.helmet': 'Editar Perfil', 
        'roles.editRole.title': 'Editar Perfil: #', 
        'roles.editRole.cancel': 'Cancelar', 
        'roles.editRole.save': 'Guardar Cambios', 
        'security.title': 'Seguridad', 
        'users.dni': 'Identification', 
        'users.username': 'Nombre de usuario', 
        'users.name': 'Nombre', 
        'users.email': 'Email', 
        'users.profile': 'Perfil', 
        'users.department': 'Departamento', 
        'users.actions': 'Acciones', 
        'users.helmet': 'Usuario', 
        'users.edit': 'Editar', 
        'users.delete': 'Borrar', 
        'users.filter': 'Filtro', 
        'users.addNew': 'Agregar Nuevo', 
        'users.cancel': 'Cancelar', 
        'users.continue': 'Continuar', 
        'users.addUser.identification': 'Identificacion', 
        'users.addUser.login': 'Nombre de Usuario', 
        'users.addUser.email': 'Email', 
        'users.addUser.name': 'Nombre', 
        'users.addUser.department': 'Departamento', 
        'users.addUser.profile': 'Perfil', 
        'users.addUser.error.email': '- Formato incorrecto', 
        'users.addUser.required': 'Es requerido', 
        'users.addUser.title': 'Agregar Nuevo Usuario:', 
        'users.addUser.helmet': 'Agregar Usuario', 
        'users.addUser.cancel': 'Cancelar', 
        'users.addUser.continue': 'Guardar Cambios', 
        'users.editUser.identification': 'Identificacion', 
        'users.editUser.login': 'Nombre de Usuario', 
        'users.editUser.email': 'Email', 
        'users.editUser.name': 'Nombre', 
        'users.editUser.department': 'Departamento', 
        'users.editUser.profile': 'Perfil', 
        'users.editUser.error.email': '- Formato incorrecto', 
        'users.editUser.required': 'Es requerido',  
        'users.editUser.helmet': 'Editar Usuario', 
        'users.editUser.cancel': 'Cancelar', 
        'users.editUser.continue': 'Guardar Cambios', 
        'users.editUser.activated': 'El usuario se activo exitosamente.', 
        'users.editUser.suspended': 'El usuario se desactivo exitosamente.', 
        'users.editUser.error': 'Algo fallo, por favor intente nuevamente.', 
        'users.editUser.disable': 'Desactivar', 
        'users.editUser.enable': 'Activar', 
        'users.editUser.generate': 'Generar', 
        'users.editUser.contentStart': "Estas a punto de", 
        'users.editUser.contentEnd': "el usuario seleccionado, desea continuar?", 
        'users.editUser.generateStart': "Estas a punto de generar una contraseña para", 
        'users.editUser.generateEnd': ", desea continuar?", 
        'users.editUser.title': "Editar Usuario: #", 
        'users.editUser.activeTitle': "Activar Usuario", 
        'users.editUser.activeNo': "No", 
        'users.editUser.activeYes': "Si", 
        'users.editUser.generateTitle': "Generar Contraseña:", 
    }
}


export const t = (message, fallback) => get(messages, [language, message], fallback) 
