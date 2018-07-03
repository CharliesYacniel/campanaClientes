import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor'

import './main.html';
import 'select2';
import 'select2/dist/css/select2.css';
import  Inputmask  from "inputmask";
import { $ } from 'meteor/jquery';

import '../import/ui/components/clienteNoExiste.html';
import '../import/ui/components/clienteNoSePermite.html';
import '../import/ui/components/clienteExiste.html';
import '../import/ui/components/clienteActualizado.html';
import '../import/ui/components/formulario.html';
import '../import/ui/components/loading.html';

//templates de las secuencias
import '../import/ui/secuencias/nombre.html';
import '../import/ui/secuencias/municipio.html';
import '../import/ui/secuencias/domicilio.html';
import '../import/ui/secuencias/departamento.html';
import '../import/ui/secuencias/correo.html';
import '../import/ui/secuencias/terminos.html';
import '../import/ui/secuencias/noCliente.html';
import '../import/ui/secuencias/aceptoContacto.html';
import '../import/ui/secuencias/contactoModal.html';
import '../import/ui/secuencias/modalNoTerminos.html';
import '../import/ui/secuencias/timeOut.html';


segundosEspera = new ReactiveVar([]);
segundosEspera.set(5);
const tiempoDeEspera=10000;

Meteor.startup(function() {
  reCAPTCHA.config({
     publickey: '6Ldcsl0UAAAAAC9CyICwrwpI2CGjxi3DEdECcsy4',
     theme: 'dark',
     type: 'image',
     size: 'normal',
    hl:'es'// optional display language
  });

  // Meteor.setTimeout(function() {
  //   $('.outerContainer').removeClass('loading');
  //   }, loadingDelay);

});
////////////////////////////////////////////ACCESO CLIENTES////////////////////////////////////
$.validator.addMethod("valueNotEquals", function( element, arg){
  return arg != element.value; 
}, "Value must not equal arg.");

Template.acessoCliente.onCreated(function(){
  
  $(document).ready(function(){
    let selector = document.getElementById("valueID");
    Inputmask({mask:"9999-9999-99999", placeholder:"0000-0000-00000", showMaskOnHover: true}).mask(selector);   
  });
});

Template.acessoCliente.helpers({});
Template.acessoCliente.onRendered(function(){
  Session.set("ibs","");
  Session.set("Cusunr","")
  Session.set("idCliente","");
  Session.set("nombre1","");
  Session.set("nombre2","");
  Session.set("apellido1","");
  Session.set("apellido2","");
  Session.set("idProfesion","");
  Session.set("profesion","");
  Session.set("idocupacion","");
  Session.set("ocupacion","");
  Session.set("declara","");
  Session.set("acepto","");
  Session.set("iddepto","");
  Session.set("departamento","");
  Session.set("idmuni","");
  Session.set("municipio","");
  Session.set("idciudad","");
  Session.set("ciudad","");
  Session.set("idbarrio","");
  Session.set("barrio","");
  Session.set("domicilio","");
  Session.set("telefono","");
  Session.set("movil","");
  Session.set("emailP","");
  Session.set("emailT","");
  Session.set("flagEmpleado","");
  Session.set("residente","");
$('.loader-cube').hide();// hide loading
$("#formulario").validate({
      rules: {
        valueID:{
          required:true,
          minlength:7,
          // pattern:/^[0-9][0-9]{15}$/,
        },
      } ,
      messages: {
        valueID:{
          required:"Ingrese su identificación",
          minlength:"Carnet no valido",
          // pattern:"numero de Identidad no valido",
        }
      }
  });
  var current = 0,
      slides = document.querySelectorAll(".prizeImage img");

  setInterval(function() {
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.opacity = 0;
    }
    current = (current != slides.length - 1) ? current + 1 : 0;
    slides[current].style.opacity = 1;
  }, 5000);
   
});

Template.acessoCliente.events({
  'submit .formulario' (event){
    event.preventDefault();//QUITAR ESTA LINEA LUEGO
    let id=event.target.valueID.value;
    id=id.replace(/[-]/gi,"");
    console.log(id);
    Session.set("idCliente",id);//INICIALIZANDO VARIABLE
    this.foundUser = new ReactiveVar([]);

    this.idNoexiste = new ReactiveVar([]);
    this.idNoexiste.set(id);
    console.log("ID-NO",this.idNoexiste.get(id));
    // $('.loading').fadeIn(300);
    $('.loader-cube').show();

    var cuerpo="<cam:wsaccesoclientes.Execute>"+
                      "<cam:Identidad>"+id.trim()+"</cam:Identidad>"
              +"</cam:wsaccesoclientes.Execute>";

    var timeout = setTimeout(() => {
      $('.timeOut').show();
      throw new Error('timeout');
    },tiempoDeEspera);
              
    Meteor.call('wsaccesoclientes',{ body : cuerpo },(err, res) =>{
      clearTimeout(timeout);
      if (err){
        console.log(err);
        $('.timeOut').show();
        // $('.loader-cube').hide();
      } else {
        // this.foundUser.set(res);
        // var datosWS =this.foundUser.get();
        var datosWS =res;
      if (datosWS.envelope){
        console.log(datosWS.envelope.body[0].wsaccesoclientesexecuteresponse[0].sdtaccesoclientes[0]);
        datosWS=datosWS.envelope.body[0].wsaccesoclientesexecuteresponse[0].sdtaccesoclientes[0];
        let existe=datosWS.existe[0];
        let nombreCliente=datosWS.cusfna[0];
        let apellidoCliente=datosWS.cusln1[0];
        let ibsCliente=datosWS.cumstcuscun[0];
        let flag3=datosWS.empleado[0];
        let fatca=datosWS.fatca[0];
        let Cusunr=datosWS.cusunr[0];

        Session.set("ibs",ibsCliente);
        Session.set("Cusunr",Cusunr);
        Session.set("nombre1",nombreCliente);
        Session.set("apellido1",apellidoCliente);
        // console.log(Session.get("Cusunr"));
        Session.set("flagEmpleado",flag3);
        //  1   cliente no ha sido actualizado
        //  2  no existe como cliente
        //  3  que ya fue actualizado 
        // console.log(existe);
        // console.log(nombreCliente);
        var params = {};
        var queryParams = {
           name:nombreCliente,
           last:apellidoCliente,
        };
          if(fatca=='S'){
            console.log("No permitir Actualizar");
            // FlowRouter.go('/clienteNoSePermite', params, queryParams);
            FlowRouter.go('/clienteNoSePermite', params, queryParams);
          }else{
            if(existe=='1'){
              console.log("cliente NO ha sido Actualizado aun");
              // FlowRouter.go('/clienteExiste', params, queryParams);
              FlowRouter.go('/clienteExiste');
            }
            if(existe=='2'){
              console.log("cliente NO EXISTE");
                FlowRouter.go('/clienteNoExiste');
            }
            if (existe=='3'){
              console.log("cliente ACTUALIZADO");
              FlowRouter.go('/clienteActualizado', params, queryParams);
            }
            if (existe=='4'){
              console.log("cliente Ya Actualizo Datos");
              FlowRouter.go('/noCliente');
            }
          }
        }
      }
    });
  },
  'click #pasaporteSI'(){
    console.log('colocar maskara pasaporte');
    var selector = document.getElementById("valueID");
    $(document).ready(function(){
      document.getElementById("valueID").value="";
      document.getElementById("valueID").setAttribute("minlength",7);
      document.getElementById("valueID").setAttribute("maxlength",16);
      document.getElementById("valueID").setAttribute("placeholder","Ingresa tu carnet de residente");
      document.getElementById("valueID").setAttribute("value","");
      Inputmask({ regex: "[a-zA-Z0-9ñÑ]*", mask:"",placeholder:"Ingresa tu carnet de residente", showMaskOnHover: true}).mask(selector);  
      // $(selector).inputmask({mask:"*********", placeholder:"000000000", showMaskOnHover: true});
      });
  },
  'click #pasaporteNO'(){
    console.log('colocar maskara identidad');
    var selector = document.getElementById("valueID");
    $(document).ready(function(){
      document.getElementById("valueID").value="";
      document.getElementById("valueID").setAttribute("maxlength",15);
      document.getElementById("valueID").setAttribute("placeholder","0000-0000-00000");
      document.getElementById("valueID").setAttribute("value","");
        Inputmask({mask:"9999-9999-99999", placeholder:"0000-0000-00000", showMaskOnHover: true}).mask(selector);  
      });
    },
});
////////////////////////////////////////////CLIENTE EXISTE////////////////////////////////////
Template.clienteExiste.onCreated(function(){});
Template.clienteExiste.onRendered(function(){
  $('.loader-cube').hide();// hide loading
});
Template.clienteExiste.helpers({
  getIdCliente(){
    return Session.get('idCliente'); 
  },
  getName(){
    return Session.get("nombre1");
  },
  getLast(){
    return Session.get("apellido1");
  },
});
Template.clienteExiste.events({
  'click .iniciarForm' (){
    FlowRouter.go('/formulario');
  },
  'click .iniciarSecuencia' (){
    FlowRouter.go('/nombre');
    console.log('iniciar secuancia');
  }
});
////////////////////////////////////////////CLIENTE  NO  EXISTE////////////////////////////////////
Template.clienteNoExiste.events({
  'click .regresar' (){
    console.log('no enviar datos');
    FlowRouter.go('/');
  },
  'submit .siguienteNoExiste' (event){
    event.preventDefault();
    // console.log(event.target);
    let pnombre=event.target.nombre1.value;
    let telefono=event.target.telefono.value;
    let movil=event.target.movil.value;
    let emailP=event.target.emailP.value;
        pnombre=pnombre.trim();
        // movil=movil.replace(/[-]/gi,"");
        // telefono=telefono.replace(/[-]/gi,"");
        emailP=emailP.trim();
    console.log(pnombre);
    console.log(telefono);
    console.log(movil);
    console.log(emailP);
    // let wsnocliente = new ReactiveVar([]);
    var cuerpo="<cam:wsNocliente.Execute>"
                  +"<cam:Idncli>"+Session.get("idCliente")+"</cam:Idncli>"
                  +"<cam:Rtenusurtenom>"+pnombre+"</cam:Rtenusurtenom>"
                  +"<cam:Rtenum>"+telefono+"</cam:Rtenum>"
                  +"<cam:Rtenumc>"+movil+"</cam:Rtenumc>"
                  +"<cam:Rteema>"+emailP+"</cam:Rteema>"
              +"</cam:wsNocliente.Execute>";

    var timeout = setTimeout(() => {
      $('.timeOut').show();
      throw new Error('timeout');
    },tiempoDeEspera);

    $('.loader-cube').show();

    Meteor.call('wsnocliente',{body:cuerpo},(err,res)=>{
      clearTimeout(timeout);
      if (err){
        $('.timeOut').show();
        console.log(err);
        } else {
        var datosWS =res;
        if (datosWS.envelope){
          datosWS=datosWS.envelope.body[0].wsnoclienteexecuteresponse[0]; 
          let flag=datosWS.flage[0];
          console.log(datosWS);
          console.log(flag);
          $('.loader-cube').hide();
          if(flag=='S'){//cliente se guardo bien
           FlowRouter.go('/noClienteAlmacenado');
          }
          // else{
          //   FlowRouter.go('/noCliente');
          // }
          if(flag=='N'){//el clientes ya etsa almacenado el repo de NOclientes
            FlowRouter.go('/noCliente');
           }
        }
        }
      });
  },
});
Template.clienteNoExiste.onCreated(function(){
  $(document).ready(function(){
    var telefono = document.getElementById("telefono");
    var movil = document.getElementById("movil");
    var nombre1 = document.getElementById("nombre1");
    Inputmask({ regex: "[3|8|9][0-9]{7}", mask:"", placeholder:"00000000"}).mask(movil);
    Inputmask({ regex: "[2][0-9]{7}", mask:"", placeholder:"00000000"}).mask(telefono);
    Inputmask({ regex: "[a-zA-ZáéíóúüÁÉÍÓÚñÑ ´]{50}", placeholder:"", showMaskOnHover: true}).mask(nombre1);
  });
});
Template.clienteNoExiste.helpers({});
Template.clienteNoExiste.onRendered(function(){
  $('.loader-cube').hide();// hide loading
  $("#siguienteNoExiste").validate({
    rules: {
      nombre1:{
        required:true,
        // pattern: /[a-zA-ZáéíóúüÁÉÍÓÚñÑ ´]{50}/,
      },
      telefono:{
        required:false,
        pattern:/^[2][0-9]{7}$/,
      },
      movil:{
        required:true,
        // pattern:/^[3|8|9][0-9]{7}$/,
      },
      emailP:{
        required:false,
        pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      },
    } ,
    messages: {
      nombre1:{
        required:"Ingresar nombre",
        // pattern:"No valido",
      },
      telefono:{
        // required:"Ingresar telefono",
        // pattern:"No valido",
      },
      movil:{
        required:"Ingresar movil",
        pattern:"No valido",
      },
      emailP:{
        // required:"Ingresar Email",
        pattern:"No valido",
      },
    }
});  
});
////////////////////////////////////////////CLIENTE  ACTUALIZADO////////////////////////////////////
Template.clienteActualizado.onCreated(function(){
  this.wsnumboleto = new ReactiveVar([]);
  let id=Session.get('idCliente');
  // Session.set("idCliente",id);
  let cuerpo="<cam:wsnumboleto.Execute>"
                +"<cam:Idncli>"+id+"</cam:Idncli>"
            +"</cam:wsnumboleto.Execute>";
  $('.loader-cube').show();

  var timeout = setTimeout(() => {
    $('.timeOut').show();
    throw new Error('timeout');
  },tiempoDeEspera);

  Meteor.call('wsnumboleto',{ body:cuerpo },(err, res) =>{
    clearTimeout(timeout);
    if (err){
      $('.timeOut').show();
      console.log(err);
      } else {
        this.wsnumboleto.set(res); 
      }
      $('.loader-cube').hide();
    });
});
Template.clienteActualizado.onRendered(function(){
  $('.loader-cube').hide();
});
Template.clienteActualizado.events({
  'click .Aceptar' (){
    FlowRouter.go('/');
  }
});

Template.clienteActualizado.helpers({
  wsnumboleto(){
    var datosWS =Template.instance().wsnumboleto.get();
    if (datosWS.envelope) {
      // console.log(datosWS.envelope.body[0].wsnumboletoexecuteresponse[0]);
      let exite=datosWS.envelope.body[0].wsnumboletoexecuteresponse[0].exite;
      if (exite==1){
        datosWS=datosWS.envelope.body[0].wsnumboletoexecuteresponse[0]; 
        // console.log(datosWS);  
      }
    }
  return datosWS.codnum;
  },
  getName(){
    return FlowRouter.getQueryParam("name");
  },
  getLast(){
    return FlowRouter.getQueryParam("last");
  },
});
////////////////////////////////////////////CLIENTE NO SE  PERMITE ACTUALIZAR////////////////////////////////////
Template.clienteNoSePermite.helpers({
  getName(){
    return FlowRouter.getQueryParam("name");
  },
  getLast(){
    return FlowRouter.getQueryParam("last");
  },
});
Template.clienteNoSePermite.onRendered(function(){
  $('.loader-cube').hide();
});

Template.clienteNoSePermite.events({
  'click .Aceptar' (){
    FlowRouter.go('/');
  }
});

//===========================-----------------------//////CODIGO DE SECUENCIA///////////------------------------======================================
// fomulario1  Nombre completo , profesion y ocupacion
let wsprofesion = new ReactiveVar([]);
let wsocupacion = new ReactiveVar([]);

// let profesionSelected = new ReactiveVar([]);
// let ocupacionSelected = new ReactiveVar([]);

Template.nombre.onCreated(function(){
     //=============================================wsaccesoclientes=================================================
     let id=Session.get('idCliente');
     this.foundUser = new ReactiveVar([]);
     var cuerpo="<cam:wsaccesoclientes.Execute>"+
                       "<cam:Identidad>"+id+"</cam:Identidad>"
               +"</cam:wsaccesoclientes.Execute>";

      var timeout = setTimeout(() => {
          $('.timeOut').show();
          throw new Error('timeout');
        },tiempoDeEspera);

     Meteor.call('wsaccesoclientes',{ body : cuerpo },(err, res) =>{
      clearTimeout(timeout);
      if (err){
        $('.timeOut').show();
        console.log(err);
       } else {
         this.foundUser.set(res);
       } 
     });
     //=============================================wsProfesion=================================================   
       var cuerpo="<cam:wsProfesion.Execute>"
                       +"<cam:Dscr></cam:Dscr>"
                   +"</cam:wsProfesion.Execute>";

        var timeout = setTimeout(() => {
            $('.timeOut').show();
            throw new Error('timeout');
          },tiempoDeEspera);

       Meteor.call('wsprofesion',{body:cuerpo},  (err, res) =>{
        clearTimeout(timeout);
        if (err){
          console.log(err);
          $('.timeOut').show();
           } else {
             let datosWS=res.envelope.body[0].wsprofesionexecuteresponse[0].sdtprofesion[0].sdtprofesionsdtprofesionitem;
             console.log(datosWS);
            wsprofesion.set(datosWS); 
           }
         });
          //=============================================wsocupacion=================================================
         var cuerpo="<cam:wsOcupacion.Execute>"
                        +"<cam:Ocupacion></cam:Ocupacion>"
                  +"</cam:wsOcupacion.Execute>";

          var timeout = setTimeout(() => {
              $('.timeOut').show();
              throw new Error('timeout');
            },tiempoDeEspera);

          Meteor.call('wsocupacion',{ body:cuerpo },  (err, res)=> {
            clearTimeout(timeout);
            if (err){
              $('.timeOut').show();
              console.log(err);
            } else {
            let datosWS =res.envelope.body[0].wsocupacionexecuteresponse[0].sdtocupacion[0].sdtocupacionsdtocupacionitem;
            wsocupacion.set(datosWS);
            }

          });
        // console.log('tiempo es espera');
        // Meteor.setTimeout(function(){
        //   console.log('tiempo es espera');
        // }, tiempoDeEspera);          
        //   console.log('termino conteo ');

        // var counter = 0;
        // var myInterval = Meteor.setInterval(function() {
        //    counter ++;
        //    console.log("Intervalo llamado " + counter + " veces...");
        //    if(counter == this.segundosEspera.get()){
        //     Meteor.clearInterval(myInterval);
        //     // $('.loader-cube').hide();
        //     $('.timeOut').show();
        //     console.log('Interval detenido...');
        //    }
        // }, 1000);     
});

Template.nombre.onRendered(function(){
  $('.loader-cube').show();
  $(document).ready(function(){
    //========================================================validacion de profesion====================================
    var $select =  $('#profesion').select2({
      allowClear: false
    });
    // Aplicando la validacion del select cada vez que cambie
    $select.on('change', function() {
      $(this).trigger('blur');
    });
   //Permitiendo la validacion de campos ocultos
    $('#siguienteNombre').validate({
      ignore: '.select2-input, .select2-focusser',
      submitHandler: function() {
        alert("enviado")
      },
      errorPlacement: function(error, element) {
        $(element).next().append(error);
      }
    });
    // agregando la validacion del select ya que no tiene un atributo name el plugin
    $select.rules('add', {
      valueNotEquals:"nulo",
      // required: true,
      messages: {
        // required: "Es necesario que seleccione una opción"
        valueNotEquals: "Seleccione una opción"
      }
    });
 //========================================================validacion de ocupacion====================================
    var $select =  $('#ocupacion').select2({
      // placeholder: 'Seleccione una ocupación',
      allowClear: false
    });
    // Aplicando la validacion del select cada vez que cambie
    $select.on('change', function() {
      $(this).trigger('blur');
    });
    //Permitiendo la validacion de campos ocultos
    $('#siguienteNombre').validate({
      ignore: '.select2-input, .select2-focusser',
      submitHandler: function(form) {
        alert("enviado")
      },
      errorPlacement: function(error, element) {
        $(element).next().append(error);
      }
    });
    // agregando la validacion del select ya que no tiene un atributo name el plugin
    $select.rules('add', {
      valueNotEquals:"nulo",
      // required: true,
      messages: {
        // required: "Es necesario que seleccione una opción"
        valueNotEquals: "Seleccione una opción"
      }
    });
  });

  $("#siguienteNombre").validate({
    rules: {
      nombre1:{
        required:true,
        pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      nombre2:{
        required:false,
        pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      apellido1:{
        required:true,
        pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      apellido2:{
        required:false,
        pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      profesion:{
        required:true,
        // pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      ocupacion:{
        required:true,
        // pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
    } ,
    messages: {
      nombre1:{
        required:"Verifique primer nombre",
        pattern:"No valido",
      },
      nombre2:{
        pattern:"No valido",
      },
      apellido1:{
        required:"Verifique su primer apellido",
        pattern:"No valido",
      },
      apellido2:{
        // required:"Verifique su segundo apellido",
        pattern:"No valido",
      },
      profesion:{
        required:"Seleccione opción",
        // pattern:"No valido",
      },
      ocupacion:{
        required:"Seleccione opción",
        // pattern:"No valido",
      },
    }
 });    

 });

 var parametroSelected = new ReactiveVar();
     parametroSelected.set(0);
Template.nombre.helpers({
  wsaccesoclientes(){
    var datosWS =Template.instance().foundUser.get();
      if (datosWS.envelope) {
        datosWS=datosWS.envelope.body[0].wsaccesoclientesexecuteresponse[0].sdtaccesoclientes[0];
        // console.log(datosWS);
      }
  return datosWS;
  },
  //=============================================wsocupacion=================================================
  wsocupacion(){
    $('.loader-cube').hide();
    return wsocupacion.get();
  },
  // //==========================================wsprofesion====================================================
  wsprofesion(){
    return wsprofesion.get();
  },
  verificarSelected(){
     if(parametroSelected.get()==1){
       return true;
     }else{
       return false;
     }
  },
  idProfesionSelected(){
    return Session.get("idProfesion");
  },
  profesionSelected(){
    return Session.get("profesion");
  },
  idOcupacionSelected(){
    return Session.get("idocupacion");
  },
  ocupacionSelected(){
    return Session.get("ocupacion");
  },
});
Template.nombre.events({
  'submit .siguienteNombre'(event){
     event.preventDefault();
     let nombre1=event.target.nombre1.value;
     let nombre2=event.target.nombre2.value;
     let apellido1=event.target.apellido1.value;
     let apellido2=event.target.apellido2.value;

     let idProfesion=event.target.profesion.value;
     let prof=event.target.profesion;
     let indexProf=prof.selectedIndex;
     let profesion = prof.options[indexProf].text;
     
     // let var=event.target.ocupacion;
     let idocupacion=event.target.ocupacion.value;
     let ocup=event.target.ocupacion;
     let indexOcupa=ocup.selectedIndex;
     let ocupacion = ocup.options[indexOcupa].text;
    
     Session.set("nombre1",nombre1);
     Session.set("nombre2",nombre2);
     Session.set("apellido1",apellido1);
     Session.set("apellido2",apellido2);

     Session.set("idProfesion",idProfesion);
     Session.set("profesion",profesion);
     Session.set("idocupacion",idocupacion);
     Session.set("ocupacion",ocupacion);
     console.log(idProfesion+" "+profesion);
     console.log(idocupacion+" "+ocupacion);

     FlowRouter.go('/municipio');
  },
  'click .atras'(){
    FlowRouter.go('/clienteExiste');
  },
  'change .profesion'(){
    parametroSelected.set(1);
    Session.set("idProfesion",$('.profesion').val());
    Session.set("profesion",$('.profesion option:selected').text());
    console.log($('.profesion').val());
    console.log($('.profesion option:selected').text());
    console.log('id y profesion es sesion ',Session.get("idProfesion")+" "+Session.get("profesion"));
  },
  'change .ocupacion'(){
    parametroSelected.set(1);
    Session.set("idocupacion",$('.ocupacion').val());
    Session.set("ocupacion",$('.ocupacion option:selected').text());
    console.log($('.ocupacion').val());
    console.log($('.ocupacion option:selected').text());
    console.log('id y ocupacion es sesion ',Session.get("idocupacion")+" "+Session.get("ocupacion"));
  },
});
//==============================================================================================

// fomulario3  municipio,ciudad,barrio
let wbmunicipio = new ReactiveVar([]);
let wsciudada = new ReactiveVar([]);
let awsbarriocolonia = new ReactiveVar([]);

Template.municipio.onCreated(function(){
  
});
Template.municipio.onRendered(function(){
  $('.loader-cube').hide();// hide loading
  $(document).ready(function(){
     //========================================================validacion de depto================================== ==
     var $select =  $('#depto').select2({  
      placeholder : "Seleccionar departamento", 
      allowClear: false
    });
    // Aplicando la validacion del select cada vez que cambie
    $select.on('change', function(){
      $(this).trigger('blur');
    });
   //Permitiendo la validacion de campos ocultos
    $('#siguienteMunicipio').validate({
      ignore: '.select2-input, .select2-focusser',
      submitHandler: function(form) {
        // console.log('validad aqui');
      },
      errorPlacement: function(error, element) {
        $(element).next().append(error);
      }
    });
    // agregando la validacion del select ya que no tiene un atributo name el plugin
    $select.rules('add', {
      valueNotEquals:"nulo",
      // required: true,
      messages: {
        // required: "Es necesario que seleccione una opción"
        valueNotEquals: "Seleccione una opción"
      }
    });
    //========================================================validacion de municipio================================== ==
    var $select =  $('#municipio').select2({
      placeholder : "Seleccionar municipio" , 
      allowClear: false
    });
    // Aplicando la validacion del select cada vez que cambie
    $select.on('change', function(){
      $(this).trigger('blur');
    });
   //Permitiendo la validacion de campos ocultos
    $('#siguienteMunicipio').validate({
      ignore: '.select2-input, .select2-focusser',
      submitHandler: function() {
        
      },
      errorPlacement: function(error, element) {
        $(element).next().append(error);
      }
    });
    // agregando la validacion del select ya que no tiene un atributo name el plugin
    $select.rules('add', {
      valueNotEquals:"nulo",
      // required: true,
      messages: {
        // required: "Es necesario que seleccione una opción"
        valueNotEquals: "Seleccione una opción"
      }
    });
  //   //========================================================validacion de ciudad================================== ==
  var $select =  $('#ciudad').select2({
    placeholder : "Seleccionar ciudad" , 
    allowClear: false
  });
  // Aplicando la validacion del select cada vez que cambie
  $select.on('change', function(){
    $(this).trigger('blur');
  });
 //Permitiendo la validacion de campos ocultos
  $('#siguienteMunicipio').validate({
    ignore: '.select2-input, .select2-focusser',
    submitHandler: function(form) {
      // console.log('esta entrando aqui');
    },
    errorPlacement: function(error, element) {
      $(element).next().append(error);
    }
  });
  // agregando la validacion del select ya que no tiene un atributo name el plugin
  $select.rules('add', {
    valueNotEquals:"nulo",
    // required: true,
    messages: {
      // required: "Es necesario que seleccione una opción"
      valueNotEquals: "Seleccione una opción"
    }
  });
  //   //========================================================validacion de colonia================================== ==
  var $select = $('#colonia').select2({
    placeholder : "Seleccionar colonia" , 
    allowClear: false
  });
  // Aplicando la validacion del select cada vez que cambie
  $select.on('change', function(){
    $(this).trigger('blur');
  });
 //Permitiendo la validacion de campos ocultos
  $('#siguienteMunicipio').validate({
    ignore: '.select2-input, .select2-focusser',
    submitHandler: function(){
      // console.log('esta entrando aqui');
    },
    errorPlacement: function(error, element){
      $(element).next().append(error);
    }
  });
  // agregando la validacion del select ya que no tiene un atributo name el plugin
  $select.rules('add', {
    valueNotEquals:"nulo",
    // required: true,
    messages: {
      // required: "Es necesario que seleccione una opción"
      valueNotEquals: "Seleccione una opción"
    }
  });
    //========================================================validacion de colonia====================================
  });
  $("#siguienteMunicipio").validate({
    rules: {
      depto:{
        required:true,
        // pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      muni:{
        required:true,
        // pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
    } ,
    messages: {
      depto:{
        required:"Seleccione una opción",
        pattern:"No valido",
      },
      muni:{
        required:"Seleccione una opción",
        pattern:"No valido",
      },
    }
 });


});

Template.municipio.helpers({
  // idDeptoSelected(){
  //   return Session.get("iddepto");
  // },
  // deptoSelected(){
  //   return Session.get("departamento");
  // },
  //===============================================wbmunicipio===============================================
  wbmunicipio(){
    return wbmunicipio.get();
  },
  idmunicipioSelected(){
    return Session.get("idmuni");
  },
  municipioSelected(){
    return Session.get("municipio");
  },
  //============================================wsciudada==================================================
  wsciudada(){
    return wsciudada.get();
  },
  //===========================================awsbarriocolonia===================================================
  awsbarriocolonia(){
    return awsbarriocolonia.get();
  },
});

Template.municipio.events({
  'submit .siguienteMunicipio'(event){
    event.preventDefault();
    let iddepto=event.target.depto.value;
    let depto=event.target.depto;
    let indexDepto=depto.selectedIndex;
    let departamento = depto.options[indexDepto].text;

    let idmuni=event.target.muni.value;
    let muni=event.target.muni;
    let indexMuni=muni.selectedIndex;
    let municipio = muni.options[indexMuni].text;
    // let var=event.target.ciudad;
    let idciudad=event.target.ciudad.value;
    let ciu=event.target.ciudad;
    let indexCiud=ciu.selectedIndex;
    let ciudad = ciu.options[indexCiud].text;
    
    // let var=event.target.barrio;
    let idbarrio=event.target.barrio.value;
    let bar=event.target.barrio;
    let indexBar=bar.selectedIndex;
    let barrio = bar.options[indexBar].text;
    // console.log(idmuni+" "+municipio);
    // console.log(idciudad+" "+ciudad);
    // console.log(idbarrio+" "+barrio);
    // console.log(iddepto+' '+departamento);
    Session.set("iddepto",iddepto);
    Session.set("departamento",departamento);
    Session.set("idmuni",idmuni);
    Session.set("idciudad",idciudad);
    Session.set("idbarrio",idbarrio);
    Session.set("municipio",municipio);
    Session.set("ciudad",ciudad);
    Session.set("barrio",barrio);
    console.log('aqui hice submit');
    FlowRouter.go('/domicilio');
  },
  'click .atras'(){
    FlowRouter.go('/nombre');
 },
 'change .depto'(){
    Session.set("iddepto",$('.depto').val());
    Session.set("departamento",$('.depto option:selected').text());
   //================================================wbmunicipio================================================
   $('#municipio').val(''); // Select the option with a value of '1'
   $('#municipio').select2('destroy');
   $('#municipio').select2({
     allowClear: false
   });
  //  document.getElementById("municipio").disabled=true;
   $('#ciudad').val(''); // Select the option with a value of '1'
   $('#ciudad').select2('destroy');
   $('#ciudad').select2({
     allowClear: false
   });
   document.getElementById("ciudad").disabled=true;
   $('#colonia').val(''); // Select the option with a value of '1'
   $('#colonia').select2('destroy');
   $('#colonia').select2({
     allowClear: false
   });
   document.getElementById("colonia").disabled=true;

   let Depto=document.getElementById("depto").value;
   console.log('ide depto',Depto);
   var cuerpo="<cam:wbMunicipio.Execute>"
              +"<cam:Desmun></cam:Desmun>"
              +"<cam:Depto>"+Depto+"</cam:Depto>"
              +"</cam:wbMunicipio.Execute>";

   $('.loader-cube').show();
   Meteor.call('wbmunicipio',{ body:cuerpo },(err, res) =>{
    clearTimeout(timeout);
      if (err){
        $('.timeOut').show();
        console.log(err);
      } else {
        var datosWS =res;
        if (datosWS.envelope) {
          console.log(datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem);
          datosWS=datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem; 
          wbmunicipio.set(datosWS);
          document.getElementById("municipio").disabled=false;
          $('.loader-cube').hide();
        }
      }
      // console.log($("#municipio")[0]);
    });
  },
  'change .municipio' (){
    //================================================wsciudada================================================
    $('#ciudad').val(''); // Select the option with a value of '1'
    $('#ciudad').select2('destroy');
    $('#ciudad').select2({
      allowClear: false
    });
    document.getElementById("ciudad").disabled=true;
    $('#colonia').val(''); // Select the option with a value of '1'
    $('#colonia').select2('destroy');
    $('#colonia').select2({
      allowClear: false
    });
    document.getElementById("colonia").disabled=true;
  
    let Municipioid=document.getElementById("municipio").value;
    console.log('id muni',Municipioid);
    // var Municipioid="HN0308";
    var cuerpo="<cam:wsCiudadA.Execute>"
                  +"<cam:Descaldea></cam:Descaldea>"
                  +"<cam:Municipioid>"+Municipioid+"</cam:Municipioid>"
                +"</cam:wsCiudadA.Execute>";

    var timeout = setTimeout(() => {
          $('.timeOut').show();
          throw new Error('timeout');
        },tiempoDeEspera);

    $('.loader-cube').show();

    Meteor.call('wsciudada',{ body:cuerpo },(err, res) =>{
      clearTimeout(timeout);
            if (err){
              $('.timeOut').show();
              console.log(err);
        } else {
          var datosWS =res;
          if (datosWS.envelope){
            datosWS=datosWS.envelope.body[0].wsciudadaexecuteresponse[0].sdtciudadaldea[0].sdtciudadaldeasdtciudadaldeaitem; 
            wsciudada.set(datosWS); 
            document.getElementById("ciudad").disabled=false;
            $('.loader-cube').hide();
          } 
        }
      });    
  },
  'change .ciudad'(){
    //================================================awsbarriocolonia===============================================
    $('#colonia').val(''); // Select the option with a value of '1'
    $('#colonia').select2('destroy');
    $('#colonia').select2({
      allowClear: false
    });
    document.getElementById("colonia").disabled=true;

    let Ciad=document.getElementById("ciudad").value;
    console.log('id ciuda',Ciad);
    $('.loader-cube').show();
    var cuerpo="<cam:wsBarrioColonia.Execute>"
                    +"<cam:Desbcc></cam:Desbcc>"
                    +"<cam:Ciad>"+Ciad+"</cam:Ciad>"
                  +"</cam:wsBarrioColonia.Execute>";
    
    var timeout = setTimeout(() => {
      $('.timeOut').show();
      throw new Error('timeout');
    },tiempoDeEspera);

    $('.loader-cube').show();
    Meteor.call('awsbarriocolonia',{ body:cuerpo },(err,res)=>{
      clearTimeout(timeout);
            if (err){
              $('.timeOut').show();
              console.log(err);
        } else {
          var datosWS=res;
          if(datosWS.envelope){
            datosWS=datosWS.envelope.body[0].wsbarriocoloniaexecuteresponse[0].sdtbarriocolonia[0].sdtbarriocoloniasdtbarriocoloniaitem; 
            awsbarriocolonia.set(datosWS); 
            document.getElementById("colonia").disabled=false;
            $('.loader-cube').hide();
          }
        }
      });
 },
  'change .colonia'(){
    console.log('select colonia cambio');
  document.getElementById("siguiente").disabled=false;
},
 
});
//==============================================================================================
// fomulario4  domicilio,telfono y movil
Template.domicilio.onCreated(function(){
  $(document).ready(function(){
    var domicilio=document.getElementById("domicilio");
    var telefono = document.getElementById("telefono");
    var movil = document.getElementById("movil");
    // Inputmask({ regex: "[3|8|9][0-9]{7}", mask:"", placeholder:"00000000"}).mask(movil);
    // Inputmask({ regex: "[2][0-9]{7}", mask:"", placeholder:"00000000"}).mask(telefono);
    Inputmask({ regex: "[a-zA-Z0-9áéíïóúüÁÉÍÏÓÚÜñÑ ,.]*",placeholder:""}).mask(domicilio);  
    Inputmask({ regex: "[2][0-9]{7}",mask:"", placeholder:"00000000", showMaskOnHover: true}).mask(telefono);  
    Inputmask({ regex: "[9|3|8][0-9]{7}", mask:"",placeholder:"00000000", showMaskOnHover: true}).mask(movil);  
  });
});

Template.domicilio.onRendered(function(){
  $('.loader-cube').hide();// hide loading
  // console.log(document.getElementById("telefono"));
  // console.log(document.getElementById("movil"));
  $( "#siguienteDomicilio" ).validate({
    rules: {
      domicilio: {
        required:true,
        // pattern:/^[ a-zA-Z0-9áéíïóúüÁÉÍÏÓÚÜñÑ,;.'\\s]*$/,
      },
      // telefono:{
      //   required:false,
      //   // pattern:/^[2][0-9]{11}$/,
      // },
      movil:{
        // required:true,
        // pattern:/^[9|3|8][0-9]{11}$/,
      },
    },
    messages: {
      domicilio: {
        required:"Rellena este campo",
        pattern:"Dato no válido",
      },
      // telefono:{
      //   // required:"Rellena este campo",
      //   // pattern:"Dato no válido",
      // },
      movil:{
        required:"Rellena este campo",
        // pattern:"Dato no válido",
      },
    }
  });
});
Template.domicilio.helpers({
  getDomicilio(){return Session.get("domicilio")},
  getMovil(){return Session.get("movil")},
  getTelefono(){return Session.get("telefono")},
});
Template.domicilio.events({
  'submit .siguienteDomicilio'(event){
    event.preventDefault();
    let domicilio=event.target.domicilio.value;
    let movil=event.target.movil.value;
    let telefono=event.target.telefono.value;
    domicilio=domicilio.trim();
    // telefono=telefono.replace(/[-]/gi,"");
    // movil=movil.replace(/[-]/gi,"");
    Session.set("domicilio",domicilio);
    Session.set("movil",movil);
    Session.set("telefono",telefono);
    console.log(domicilio);
    console.log(movil);
    console.log(telefono);

    FlowRouter.go('/correo');
  },
  'click .atras'(){
    console.log($('#domicilio').val());
    console.log($('#movil').val());
    console.log($('#telefono').val());

    let domicilio=$('#domicilio').val();
    let movil=$('#movil').val();
    let telefono=$('#telefono').val();

    Session.set("domicilio",domicilio);
    Session.set("movil",movil);
    Session.set("telefono",telefono);
    FlowRouter.go('/municipio');
 },
 'input #domicilio'(){
  $("#movil").addClass("required");
 },
 'input #movil'(){
  // $("#movil").addClass("required");
  $("#telefono").removeClass("required");
  // console.log(document.getElementById("movil"));
  // console.log(document.getElementById("telefono"));
  // console.log("telefono",document.getElementById("telefono").value);
  // console.log("movil",document.getElementById("movil").value);
  },
 'input #telefono'(){
  // $("#telefono").addClass("required");
  $("#movil").removeClass("required");
  // console.log( document.getElementById("movil") );
  // console.log( document.getElementById("telefono") );
  // console.log("movil", document.getElementById("movil").value );
  // console.log("telefono", document.getElementById("telefono").value );
  },
});
//==============================================================================================
// formulario5 correo personal, trabajo,residencia
// var banderaAcepta=true;

Template.correo.onCreated(function(){
  
});
Template.correo.onRendered(function(){
  console.log($("#declara").val());
  if($("#declara").val()=="si"){
    document.getElementById('enviarDatos').disabled=false;
  }
  // $("#emailP").val(Session.get("emailP"));
  // $("#emailT").val(Session.get("emailT"));

  $('.loader-cube').hide();// hide loading
  document.getElementById("labelCaptcha").style.display = "none";
  $("#siguienteCorreo").validate({
    rules: {
      emailP:{
        required:false,
        pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      },
      emailT:{
        required:false,
        pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      },
      residente:{
        required:true,
      },
    },
    messages: {
      emailP:{
        // required:"Rellenar este campo",
        pattern:"Dato no válido",
      },
      emailT:{
        // required:"Rellenar este campo",
        pattern:"Dato no válido",
      },
      residente:{
        required:"Selecciona una respuesta",
      },
    }
  });
});
Template.correo.helpers({
  getEmailP(){
    return Session.get("emailP");
  },
  getEmailT(){
    return Session.get("emailT");
  }
});
Template.correo.events({
  'submit .siguienteCorreo'(event){
    event.preventDefault();
    console.log(document.getElementById('aceptoNO').checked);
    let emailP=event.target.emailP.value;
    let emailT=event.target.emailT.value;
    let residente=event.target.residente.value;
    let declara=event.target.declara.value;
    let acepto=event.target.acepto.value;
    if(residente=='si'){
      residente='S';
    }else{
      residente='N';
    }
    Session.set("emailP",emailP);
    Session.set("emailT",emailT);
    Session.set("residente",residente);
    Session.set("declara",declara);
    Session.set("acepto",acepto);
      //===============INCIO LLAMADAO AL CAPCHTA
      var Codcli=Session.get("ibs");//"2089291";
      var Cusunr=Session.get("Cusunr");
      var Idncli=Session.get("idCliente");//"0801199306450";
      var Pnombre=Session.get("nombre1");//"Axel";
      var Snombre=Session.get("nombre2");//"Enrique";
      var Papellido=Session.get("apellido1");//"Landa";
      var Sapellido=Session.get("apellido2");//"Salgado";
      var Idprof=Session.get("idProfesion");;//"033";
      var Profd=Session.get("profesion");//"INGENIERíA DE LA CONSTRUCCIóN Y GERENCIA D";
      var Rteacliidocup=Session.get("idocupacion");//"EZOP";
      var Rteacliocupacion=Session.get("ocupacion");//"PROFESOR, EDUCACION SUPERIOR/ZOOLOGIA";
      var Declaro=Session.get("declara");//"S";
      var Acepto=Session.get("acepto");//"N";
      var Dptoid= Session.get("iddepto");//"HN01";
      var Dptonombre=Session.get("departamento");//"AtláAntida";
      var Idmunc= Session.get("idmuni");//"HN0101";
      var Desmunc=Session.get("municipio");//"La Ceiba";
      var Idcald= Session.get("idciudad"); //"HN010104";
      var Descald=Session.get("ciudad");//"Corozal";
      var Id_bcc= Session.get("idbarrio");//"HN010104002";
      var Descrbcc=Session.get("barrio");//"La Ensenada";
      var Dirdom=Session.get("domicilio");//"La ensenada b2 c 905 contiguo a plaza azul";
      var Numtelf=Session.get("telefono");//"22467469";
      var Nummovil=Session.get("movil");//"33822840";
      var Emailp=Session.get("emailP");//"axellanda93@gmail.com";
      var Emailt=Session.get("emailT");//"alanda@bancatlan.hn";
      var Flag1=Session.get("residente");//"N";
      var Flag3=Session.get("flagEmpleado");//"S";
      var Estado="";
    var captchaData = grecaptcha.getResponse();
    if(captchaData==""){
      console.log('captcah vacio');
      document.getElementById("labelCaptcha").style.display = "block";
      // document.getElementById("labelCaptcha").value=;
      $("#emailP").val(Session.get("emailP"));
      $("#emailT").val(Session.get("emailT"));
      // console.log($("#emailP").val('dasdad@test.vom'));
      $('#labelCaptcha').html('Autentifique captcha');
    }else{
      document.getElementById("labelCaptcha").style.display = "none";
      console.log(captchaData);
      $('.loader-cube').show();
      Meteor.call('formSubmissionMethod',captchaData,function(error,result){
        clearTimeout(timeout);
        if (error){
          $('.timeOut').show();
          console.log('There was an error: ' + error.reason);
        } else {
            if(result){
              grecaptcha.reset();
              // $('.loader-cube').hide();
              console.log('Success!',result);
              var cuerpo="<cam:wsGuardarCliente.Execute>"
                              +"<cam:Codcli>"+Codcli+"</cam:Codcli>"
                              +"<cam:Cusunr>"+Cusunr+"</cam:Cusunr>"
                              +"<cam:Idncli>"+Idncli+"</cam:Idncli>"
                              +"<cam:Pnombre>"+Pnombre+"</cam:Pnombre>"
                              +"<cam:Snombre>"+Snombre+"</cam:Snombre>"
                              +"<cam:Papellido>"+Papellido+"</cam:Papellido>"
                              +"<cam:Sapellido>"+Sapellido+"</cam:Sapellido>"
                              +"<cam:Idprof>"+Idprof+"</cam:Idprof>"
                              +"<cam:Profd>"+Profd+"</cam:Profd>"
                              +"<cam:Rteacliidocup>"+Rteacliidocup+"</cam:Rteacliidocup>"
                              +"<cam:Rteacliocupacion>"+Rteacliocupacion+"</cam:Rteacliocupacion>"
                              +"<cam:Declaro>"+Declaro+"</cam:Declaro>"
                              +"<cam:Acepto>"+Acepto+"</cam:Acepto>" 
                              +"<cam:Dptoid>"+Dptoid+"</cam:Dptoid>"
                              +"<cam:Dptonombre>"+Dptonombre+"</cam:Dptonombre>"
                              +"<cam:Idmunc>"+Idmunc+"</cam:Idmunc>" 
                              +"<cam:Desmunc>"+Desmunc+"</cam:Desmunc>"
                              +"<cam:Idcald>"+Idcald+"</cam:Idcald>"
                              +"<cam:Descald>"+Descald+"</cam:Descald>"
                              +"<cam:Id_bcc>"+Id_bcc+"</cam:Id_bcc>"
                              +"<cam:Descrbcc>"+Descrbcc+"</cam:Descrbcc>"
                              +"<cam:Dirdom>"+Dirdom+"</cam:Dirdom>"
                              +"<cam:Numtelf>"+Numtelf+"</cam:Numtelf>" 
                              +"<cam:Nummovil>"+Nummovil+"</cam:Nummovil>"
                              +"<cam:Emailp>"+Emailp+"</cam:Emailp>"
                              +"<cam:Emailt>"+Emailt+"</cam:Emailt>"
                              +"<cam:Flag1>"+Flag1+"</cam:Flag1>"
                              +"<cam:Flag3>"+Flag3+"</cam:Flag3>"
                              +"<cam:Estado>"+Estado+"</cam:Estado>"
                          +"</cam:wsGuardarCliente.Execute>";

              var timeout = setTimeout(() => {
                  $('.timeOut').show();
                  throw new Error('timeout');
                },tiempoDeEspera);
              // $('.loader-cube').show();
               Meteor.call('awsguardarcliente',{ body:cuerpo },(err,res) =>{
                clearTimeout(timeout);
                  if (err){
                    $('.timeOut').show();
                    console.log(err);
                  } else {
                          var datosWS =res;
                          if (datosWS.envelope) {
                            console.log(datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0]);
                            let estado=datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0].estado[0]; 
                            var params = {};
                            var queryParams = {
                                name:Pnombre,
                                last:Papellido,
                              };
                              $('.loader-cube').hide();
                            if(estado==0){
                              console.log('se guardo informacion');
                              FlowRouter.go('/clienteActualizado', params, queryParams);
                            }
                            if (estado==1){
                              console.log('Cliente ya existe');
                              FlowRouter.go('/clienteYaExiste', params, queryParams);
                            }
                          }
                        }
                      });
            }else{console.log('error al verificar captcha')}
          }
      });
    }//===============FIN LLAMDO AL CAPCHA
    // }//fis si c,""ap
  },
  'click .terminos'(){
    let emailP = $("#emailP").val();
    let emailT = $("#emailT").val();
    Session.set("emailP",emailP);
    Session.set("emailT",emailT);
    FlowRouter.go('/terminos');
 },
  'click .atras'(){
   let emailP = $("#emailP").val();
   let emailT = $("#emailT").val();

   Session.set("emailP",emailP);
   Session.set("emailT",emailT);

  FlowRouter.go('/domicilio');
 },
 'click .declara'(){
  document.getElementById('enviarDatos').disabled=false;
  console.log('datos declara');
  },
  'click #aceptoNO'(){
    console.log('NO acepta');
    $('.modal').fadeIn(300);
  },
  'click #modalNoTerminos'(){
    console.log('no terminos');
    document.getElementById('enviarDatos').disabled=true;
    $('.modalNoTerminos').fadeIn(300);
  },
});
//==================================================terminos============================================
Template.terminos.events({
  'click .aceptar'(){
    FlowRouter.go('/correo');
  },
});
//==================================================Nocliente Almacenado============================================
Template.noCliente.onRendered(function(){
  $('.loader-cube').hide();
});
Template.noCliente.events({
  'click .aceptar'(){
    FlowRouter.go('/');
  },
});
//==================================================Cliente ya existe============================================
Template.clienteYaExiste.events({
  'click .aceptar'(){
    FlowRouter.go('/');
  },
});
Template.clienteYaExiste.helpers({
  getName(){
    return FlowRouter.getQueryParam("name");
  },
  getLast(){
    return FlowRouter.getQueryParam("last");
  },
});
//==================================================aceptoContacto============================================
Template.contactoModal.events({
  'click .buttonContainer button'(){
    $('.modal').fadeOut(300);
  },
});
//==================================================modalNoTerminos============================================
Template.modalNoTerminos.events({
  'click .buttonContainer button'(){
    $('.modalNoTerminos').fadeOut(300);
  },
});
//==================================================noClienteAlmacenado============================================
Template.noClienteAlmacenado.events({
  'click .aceptar'(){
    FlowRouter.go('/');
  },
});
//================================================== modal tiempo fuera ============================================
Template.timeOut.events({
  'click .buttonContainer button'(){
    $('.timeOut').fadeOut(300);
    $('.loader-cube').hide();
    FlowRouter.go('/');
  },
});



