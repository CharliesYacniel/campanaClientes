FlowRouter.route('/', {
    name: 'acessoCliente',
    action: function(params, queryParams){
            BlazeLayout.render('layoutPrincipal', {
                                main: 'acessoCliente',
                            });
    }
  });
//============================================================================================================= 
  FlowRouter.route('/clienteNoExiste', {
    name: 'clienteNoExiste',
    action() {
      BlazeLayout.render('layoutPrincipal',{
                                    main: 'clienteNoExiste',
                                });
    }
  });
  //=============================================================================================================  
  FlowRouter.route('/clienteNoSePermite', {
    name: 'clienteNoSePermite',
    action() {
      BlazeLayout.render('layoutPrincipal',{
                                    main: 'clienteNoSePermite',
                                });
    }
  });
//=============================================================================================================  
  FlowRouter.route('/clienteExiste', {
    name: 'clienteExiste',
    action() {
      BlazeLayout.render('layoutPrincipal',{
                                    main: 'clienteExiste',
                                });
    }
  });
  //=============================================================================================================  
  FlowRouter.route('/formulario', {
    name: 'formulario',
    action() {
      BlazeLayout.render('layoutPrincipal',{
                                    main: 'formulario',
                                });
    }
  });
  //============================================================================================================= 
  FlowRouter.route('/clienteActualizado', {
    name: 'clienteActualizado',
    action() {
      BlazeLayout.render('layoutPrincipal',{
                                    main: 'clienteActualizado',
                                });
    }
  });
  //============================================================================================================= 
  FlowRouter.route('/nombre', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'nombre'});
    },
  });
  //============================================================================================================= 
  FlowRouter.route('/municipio', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'municipio'});
    },
  });
   //============================================================================================================= 
   FlowRouter.route('/domicilio', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'domicilio'});
    },
  });
   //============================================================================================================= 
   FlowRouter.route('/departamento', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'departamento'});
    },
  });
   //============================================================================================================= 
   FlowRouter.route('/correo', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'correo'});
    },
  });
   //============================================================================================================= 
   FlowRouter.route('/terminos', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'terminos'});
    },
  });
   //============================================================================================================= 
   FlowRouter.route('/noCliente', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'noCliente'});
    },
  });
   