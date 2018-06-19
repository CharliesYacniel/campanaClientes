const loadingDelay = 1000;
FlowRouter.route('/', {
    name: 'acessoCliente',
    action(){
      // if (loadingDelay) {
      //   Meteor.setTimeout(function() {
      //   $('.outerContainer').removeClass('loading');
      //   // $('svg.logoCampaign').removeClass('rotate');
      //   }, loadingDelay);
      // } else {
      //   $('.outerContainer').removeClass('loading');
      //   // $('svg.logoCampaign').removeClass('rotate');
      // }
      BlazeLayout.render('layoutPrincipal', {main: 'acessoCliente'});
    },
    triggersEnter: [function() {
      if (loadingDelay) {
          Meteor.setTimeout(function() {
          $('.outerContainer').removeClass('loading');
          }, loadingDelay);
        } else {
          $('.outerContainer').removeClass('loading');
        }
    }]
  });
  //============================================================================================================= 
  FlowRouter.notFound = {
    action() {
      var tiempoRedirect=2000;
      console.log("esperando redirec");
      BlazeLayout.render('layoutPrincipal', {main: 'PageNoEncontrada'});
      Meteor.setTimeout(function() {
        FlowRouter.go('/');
        }, tiempoRedirect);
    }
  };
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
      // $('.outerContainer').removeClass('loading');
    },
    triggersEnter: [function() {
      
    }]
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
   //============================================================================================================= 
   FlowRouter.route('/clienteYaExiste', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'clienteYaExiste'});
    },
  });
  //============================================================================================================= 
  FlowRouter.route('/aceptoContacto', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'aceptoContacto'});
    },
  });
   //============================================================================================================= 
   FlowRouter.route('/noClienteAlmacenado', {
    action() {
      BlazeLayout.render('layoutPrincipal', {main: 'noClienteAlmacenado'});
    },
  });