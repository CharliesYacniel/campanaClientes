import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './main.html';
import 'select2';
import 'select2/dist/css/select2.css';
import { $ } from 'meteor/jquery';
import '../import/ui/components/clienteNoExiste.html';
import '../import/ui/components/clienteNoSePermite.html';
import '../import/ui/components/clienteExiste.html';
import '../import/ui/components/clienteActualizado.html';
import '../import/ui/components/formulario.html';

//templates de las secuencias
import '../import/ui/secuencias/nombre.html';
import '../import/ui/secuencias/municipio.html';
import '../import/ui/secuencias/domicilio.html';
import '../import/ui/secuencias/departamento.html';
import '../import/ui/secuencias/correo.html';
import '../import/ui/secuencias/terminos.html';
import '../import/ui/secuencias/noCliente.html';


////////////////////////////////////////////ACCESO CLIENTES////////////////////////////////////
$.validator.addMethod("valueNotEquals", function(value, element, arg){
  return arg != element.value; 
}, "Value must not equal arg.");
Template.acessoCliente.onCreated(function(){});
Template.acessoCliente.helpers({});
Template.acessoCliente.onRendered(function(){
$("#formulario").validate({
      rules: {
        valueID:{
          required:true,
          pattern:/^[0-9][0-9]{12}$/,
        },
      } ,
      messages: {
        valueID:{
          required:"Ingrese su numero de identidad",
          pattern:"numero de Identidad no valido",
        }
      }
  });    
});

Template.acessoCliente.events({
  'submit .formulario' (event, instance){
    event.preventDefault();//QUITAR ESTA LINEA LUEGO
    let id=event.target.valueID.value;
    console.log(id);
    // let id_ejemplo=event.target.ejemplo.value;
    // let eje=event.target.ejemplo;
    // let indexEjemplo=eje.selectedIndex;
    // let ejemplo = eje.options[indexEjemplo].text;
    // console.log(id_ejemplo+" "+ejemplo);
    Session.set("idCliente",id);//INICIALIZANDO VARIABLE
    this.foundUser = new ReactiveVar([]);
    var cuerpo="<cam:wsaccesoclientes.Execute>"+
                      "<cam:Identidad>"+id+"</cam:Identidad>"
              +"</cam:wsaccesoclientes.Execute>";
    Meteor.call('wsaccesoclientes',{ body : cuerpo },(err, res) =>{
      if (err){
        console.log(err);
      } else {
        this.foundUser.set(res);
      }
      var datosWS =this.foundUser.get();
      if (datosWS.envelope) {
        console.log(datosWS.envelope.body[0].wsaccesoclientesexecuteresponse[0].sdtaccesoclientes[0]);
        datosWS=datosWS.envelope.body[0].wsaccesoclientesexecuteresponse[0].sdtaccesoclientes[0];
        let existe=datosWS.existe[0];
        let nombreCliente=datosWS.cusfna[0];
        let apellidoCliente=datosWS.cusln1[0];
        let ibsCliente=datosWS.cumstcuscun[0];
        let flag3=datosWS.empleado[0];
        let fatca=datosWS.fatca[0];
        // let fatca='S';
        // let nombreCliente='Pedro Prueba';
        // let existe='1';
        // let ibsCliente='2089291';
        // let flag3='3';
        Session.set("ibs",ibsCliente);
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
            FlowRouter.go('/clienteNoSePermite', params, queryParams);
          }else{
            if(existe=='1'){
              console.log("cliente NO ha sido Actualizado aun");
              FlowRouter.go('/clienteExiste', params, queryParams);
            }
            if(existe=='2'){
              console.log("cliente NO EXISTE");
              FlowRouter.go('/clienteNoExiste');
            }
            if (existe=='3'){
              console.log("cliente ACTUALIZADO");
              FlowRouter.go('/clienteActualizado', params, queryParams);
            }
          }
        }
    });
  },
});
////////////////////////////////////////////CLIENTE EXISTE////////////////////////////////////
Template.clienteExiste.onCreated(function(){
});
Template.clienteExiste.helpers({
  getIdCliente(){
    return  Session.get('idCliente'); 
  },
  getName(){
    return FlowRouter.getQueryParam("name");
  },
  getLast(){
    return FlowRouter.getQueryParam("last");
  },
  
});
Template.clienteExiste.events({
  'click .iniciarForm' (event, instance){
    FlowRouter.go('/formulario');
  },
  'click .iniciarSecuencia' (event, instance){
    FlowRouter.go('/nombre');
    console.log('iniciar secuancia');
  }
});
////////////////////////////////////////////CLIENTE  NO  EXISTE////////////////////////////////////
Template.clienteNoExiste.events({
  'click .regresar' (event, instance){
    console.log('no enviar datos');
    FlowRouter.go('/');
  },
  'submit .siguienteNoExiste' (event, instance){
    event.preventDefault();
    // console.log(event.target);
    let pnombre=event.target.nombre1.value;
    let telefono=event.target.telefono.value;
    let movil=event.target.movil.value;
    let emailP=event.target.emailP.value;
    // console.log(pnombre);
    // console.log(telefono);
    // console.log(movil);
    // console.log(emailP);
    // let wsnocliente = new ReactiveVar([]);
    var cuerpo="<cam:wsNocliente.Execute>"
                  +"<cam:Idncli>"+Session.get("idCliente")+"</cam:Idncli>"
                  +"<cam:Rtenusurtenom>"+pnombre+"</cam:Rtenusurtenom>"
                  +"<cam:Rtenum>"+telefono+"</cam:Rtenum>"
                  +"<cam:Rtenumc>"+movil+"</cam:Rtenumc>"
                  +"<cam:Rteema>"+emailP+"</cam:Rteema>"
              +"</cam:wsNocliente.Execute>";
    Meteor.call('wsnocliente',{body:cuerpo},(err,res)=> {
        if (err){
          console.log(err);
        } else {
        var datosWS =res;
        if (datosWS.envelope){
          datosWS=datosWS.envelope.body[0].wsnoclienteexecuteresponse[0]; 
          let flag=datosWS.flage[0];
          console.log(flag);
          if(flag=='S'){
           FlowRouter.go('/noCliente');
          }
          if(flag=='N'){
            FlowRouter.go('/');
           }
        }
        }
      });
  },
  
});
Template.clienteNoExiste.onCreated(function() { });
Template.clienteNoExiste.helpers({});
Template.clienteNoExiste.onRendered(function(){
  $("#siguienteNoExiste").validate({
    rules: {
      nombre1:{
        required:true,
        pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      telefono:{
        required:true,
        pattern:/^[2][0-9]{7}$/,
      },
      movil:{
        required:true,
        pattern:/^[3|8|9][0-9]{7}$/,
      },
      emailP:{
        required:true,
      },
    } ,
    messages: {
      nombre1:{
        required:"Favor Ingresar su nombre",
        pattern:"No valido",
      },
      telefono:{
        required:"Favor ingresar su telefono",
      },
      movil:{
        required:"Favor rellenar este de telefono movil",
      },
      emailP:{
        required:"Favor rellenar este campo",
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
  Meteor.call('wsnumboleto',{ body:cuerpo },(err, res) =>{
      if (err){
        console.log(err);
      } else {
        this.wsnumboleto.set(res); 
      }
    });
});
Template.clienteActualizado.events({
  'click .Aceptar' (event, instance){
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

Template.clienteNoSePermite.events({
  'click .Aceptar' (){
    FlowRouter.go('/');
  }
});

//===========================-----------------------//////CODIGO DE SECUENCIA///////////------------------------======================================
// fomulario1  Nombre completo , profesion y ocupacion
let wsprofesion = new ReactiveVar([]);
let wsocupacion = new ReactiveVar([]);

Template.nombre.onCreated(function(){
       var cuerpo="<cam:wsProfesion.Execute>"
                       +"<cam:Dscr></cam:Dscr>"
                   +"</cam:wsProfesion.Execute>";
       Meteor.call('wsprofesion',{body:cuerpo},  (err, res) =>{
           if (err){
             console.log(err);
           } else {
             let datosWS=res.envelope.body[0].wsprofesionexecuteresponse[0].sdtprofesion[0].sdtprofesionsdtprofesionitem;
             console.log(datosWS);
            //  console.log(res);
            wsprofesion.set(datosWS); 
           }
         });
          //=============================================wsocupacion=================================================
         var cuerpo="<cam:wsOcupacion.Execute>"
                        +"<cam:Ocupacion></cam:Ocupacion>"
                  +"</cam:wsOcupacion.Execute>";
        Meteor.call('wsocupacion',{body:cuerpo},  (err, res)=> {
          if (err){
          console.log(err);
          } else {
          let datosWS =res.envelope.body[0].wsocupacionexecuteresponse[0].sdtocupacion[0].sdtocupacionsdtocupacionitem;
          wsocupacion.set(datosWS);
          }
        });
       //=============================================wsaccesoclientes=================================================
           
    let id=Session.get('idCliente');
    this.foundUser = new ReactiveVar([]);
    var cuerpo="<cam:wsaccesoclientes.Execute>"+
                      "<cam:Identidad>"+id+"</cam:Identidad>"
              +"</cam:wsaccesoclientes.Execute>";
    Meteor.call('wsaccesoclientes',{ body : cuerpo },(err, res) =>{
      if (err){
        console.log(err);
      } else {
        this.foundUser.set(res);
      } 
    });   
});

Template.nombre.onRendered(function(){
  
  $(document).ready(function(){
    $('#profesion').select2();
  });  
  $(document).ready(function(){
    $('#ocupacion').select2();
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
        required:true,
        pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      buscarProfesion:{
        required:true,
        pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      buscarOcupacion:{
        required:true,
        pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
      },
      // profesion: { valueNotEquals:"nulo"},
      ocupacion: { valueNotEquals:"nulo"},
    } ,
    messages: {
      nombre1:{
        required:"Es necesrio que verifique Primer Nombre",
        pattern:"No valido",
      },
      nombre2:{
        // required:"Es necesrio que verifique Segundo Nombre",
        pattern:"No valido",
      },
      apellido1:{
        required:"Es necesrio que verifique nombre",
        pattern:"No valido",
      },
      apellido2:{
        // required:"Es necesrio que verifique nombre",
        pattern:"No valido",
      },
      buscarProfesion:{
        required:"Ingrese su profesion",
        pattern:"No valido",
      },
      buscarOcupacion:{
        required:"ingrese su ocupacion",
        pattern:"No valido",
      },
      // profesion: { valueNotEquals: "Selecione un valor por favor" },
      ocupacion: { valueNotEquals: "Selecione un valor por favor" },
    }
});    
});
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
  return wsocupacion.get();
  },
  // //==========================================wsprofesion====================================================
  wsprofesion(){
    return wsprofesion.get();
  },
 
});
Template.nombre.events({
  'submit .siguienteNombre'(event, instance){
     event.preventDefault();
     let nombre1=event.target.nombre1.value;
     let nombre2=event.target.nombre1.value;
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
     Session.set("nombre2",nombre1);
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
  'click .atras'(event){
    FlowRouter.go('/clienteExiste');
 }
//  ,
//  'click .profesion'(event){
//   // console.log(event.target.value);
//   console.log('asda');
  //================================================wsprofesion================================================
  // this.profesiones = new ReactiveVar([]);
// 
// }
,
'input .myOcupacion'(event){
//  ================================================wsocupacion================================================
//  var Ocupacion="PROFESOR";
//  var Ocupacion=event.target.value;
},
});
//==============================================================================================

// fomulario3  municipio,ciudad,barrio
let wbmunicipio = new ReactiveVar([]);
let wsciudada = new ReactiveVar([]);
let awsbarriocolonia = new ReactiveVar([]);

Template.municipio.onCreated(function(){});
Template.municipio.onRendered(function(){
  $( "#siguienteMunicipio" ).validate({
    rules: {
      depto: { valueNotEquals:"nulo"},
      muni: { valueNotEquals: "nulo" },
      ciudad: { valueNotEquals: "nulo" },
      barrio:{ valueNotEquals: "nulo" },
    },
    messages: {
      depto: { valueNotEquals: "Selecione un valor por favor" },
      muni: { valueNotEquals: "Selecione un valor por favor" },
      ciudad: { valueNotEquals: "Selecione un valor por favor" },
      barrio:{ valueNotEquals: "Selecione un valor por favor" },
    }
  });
});
Template.municipio.helpers({
  //===============================================wbmunicipio===============================================
  wbmunicipio(){
    return wbmunicipio.get();
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
    FlowRouter.go('/domicilio');
  },
  'click .atras'(event){
    FlowRouter.go('/nombre');
 },
 'change .depto'(event){
   //================================================wbmunicipio================================================
   let Depto=document.getElementById("depto").value;
   console.log('ide depto',Depto);
   var cuerpo="<cam:wbMunicipio.Execute>"
   +"<cam:Desmun></cam:Desmun>"
   +"<cam:Depto>"+Depto+"</cam:Depto>"
   +"</cam:wbMunicipio.Execute>";
   Meteor.call('wbmunicipio',{ body:cuerpo },(err, res) =>{
     if (err){
       console.log(err);
      } else {
        var datosWS =res;
        if (datosWS.envelope) {
          console.log(datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem);
          datosWS=datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem; 
          wbmunicipio.set(datosWS);
          document.getElementById("municipio").disabled=false;
        }
      }
    });
    
  },
  'change .municipio' (event){
    //================================================wsciudada================================================
    let Municipioid=document.getElementById("municipio").value;
    console.log('id muni',Municipioid);
    // var Municipioid="HN0308";
    var cuerpo="<cam:wsCiudadA.Execute>"
                  +"<cam:Descaldea></cam:Descaldea>"
                  +"<cam:Municipioid>"+Municipioid+"</cam:Municipioid>"
                +"</cam:wsCiudadA.Execute>";
    Meteor.call('wsciudada',{ body:cuerpo },(err, res) =>{
        if(err){
          console.log(err);
        } else {
          var datosWS =res;
          if (datosWS.envelope){
            datosWS=datosWS.envelope.body[0].wsciudadaexecuteresponse[0].sdtciudadaldea[0].sdtciudadaldeasdtciudadaldeaitem; 
            wsciudada.set(datosWS); 
            document.getElementById("ciudad").disabled=false;
          } 
        }
      });    
  },
  'change .ciudad'(event){
    //================================================awsbarriocolonia===============================================
    let Ciad=document.getElementById("ciudad").value;
    console.log('id ciuda',Ciad);
    var cuerpo="<cam:wsBarrioColonia.Execute>"
                    +"<cam:Desbcc></cam:Desbcc>"
                    +"<cam:Ciad>"+Ciad+"</cam:Ciad>"
                  +"</cam:wsBarrioColonia.Execute>";
    Meteor.call('awsbarriocolonia',{ body:cuerpo },(err,res) =>{
        if(err){
          console.log(err);
        } else {
          var datosWS=res;
          if(datosWS.envelope){
            datosWS=datosWS.envelope.body[0].wsbarriocoloniaexecuteresponse[0].sdtbarriocolonia[0].sdtbarriocoloniasdtbarriocoloniaitem; 
            awsbarriocolonia.set(datosWS); 
            document.getElementById("colonia").disabled=false;
          }
        }
      });
 },
});
//==============================================================================================
// fomulario4  domicilio,telfono y movil
Template.domicilio.onCreated(function(){});
Template.domicilio.onRendered(function(){
  $( "#siguienteDomicilio" ).validate({
    rules: {
      domicilio: {
        required:true,
        // minlength: "Puede usar hasta 100 caracteres"
      },
      telefono:{
        required:true,
        pattern:/^[2][0-9]{7}$/,
      },
      movil:{
        required:true,
        pattern:/^[9|3|8][0-9]{7}$/,
      },
    },
    messages: {
      domicilio: {
        required: "Es necesario que escriba su domicilio actual",
        // minlength: "Puede usar hasta 100 caracteres"
        pattern:"Dato no valido",
      },
      telefono:{
        required:"Favor ingresar su telefono",
      },
      movil:{
        required:"Favor rellenar este de telefono movil",
      },
    }
  });
});
Template.domicilio.helpers({});
Template.domicilio.events({
  'submit .siguienteDomicilio'(event){
    event.preventDefault();
    let domicilio=event.target.domicilio.value;
    let telefono=event.target.telefono.value;
    let movil=event.target.movil.value;
    Session.set("domicilio",domicilio);
    Session.set("telefono",telefono);
    Session.set("movil",movil);
    console.log(domicilio);
    console.log(telefono);
    console.log(movil);

    FlowRouter.go('/correo');
  },
  'click .atras'(event){
    FlowRouter.go('/municipio');
 },
});
//==============================================================================================
// fomulario2  departamento,
Template.departamento.onCreated(function(){});
Template.departamento.onRendered(function(){
  // $("#siguienteDepto").validate({
  //   rules: {
  //     depto: { valueNotEquals:"nulo"},
  //   } ,
  //   messages: {
  //     depto: { valueNotEquals: "Selecione un valor por favor" },
  //   }
  // });   
});
Template.departamento.helpers({});
Template.departamento.events({
  'submit .siguienteDepto'(event){
    event.preventDefault();
    let iddepto=event.target.depto.value;
    let depto=event.target.depto;
    let indexDepto=depto.selectedIndex;
    let departamento = depto.options[indexDepto].text;

    console.log(iddepto+' '+departamento);
    Session.set("iddepto",iddepto);
    Session.set("departamento",departamento);
    FlowRouter.go('/municipio');
  },
  'click .atras'(event){
    FlowRouter.go('/nombre');
 },
});
//==============================================================================================
// formulario5 correo personal, trabajo,residencia

Template.correo.onCreated(function(){});
Template.correo.onRendered(function(){
  $("#siguienteCorreo").validate({
    rules: {
      emailP:{
        required:true,
      },
      emailT:{
        required:true,
      },
      residente:{
        required:true,
      },
    },
    messages: {
      emailP:{
        required:"Favor rellenar este campo",
      },
      emailT:{
        required:"Favor rellenar este campo",
      },
      residente:{
        required:"Favor seleccione una respuesta",
      },
    }
  });
});
Template.correo.helpers({});
Template.correo.events({
  'submit .siguienteCorreo'(event){
    event.preventDefault();
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
    // console.log(emailP);
    // console.log(emailT);
    // console.log(residente);
    // console.log(declara);
    // console.log(acepto);

    // let awsguardarcliente = new ReactiveVar([]);
    var Codcli=Session.get("ibs");//"2089291";
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
    var cuerpo="<cam:wsGuardarCliente.Execute>"
                    +"<cam:Codcli>"+Codcli+"</cam:Codcli>"
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
    Meteor.call('awsguardarcliente',{body:cuerpo},(err,res) =>{
        if (err){
          console.log(err);
        } else {
          // awsguardarcliente.set(res); 
          var datosWS =res;
          if (datosWS.envelope) {
            console.log(datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0]);
            let estado=datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0].estado[0]; 
            if (estado==1){
              console.log('se guardo inforamcion');
              var params = {};
              var queryParams = {
                name:Pnombre,
                last:Papellido,
              };
              FlowRouter.go('/clienteActualizado', params, queryParams);
            }
            if (estado==0){
              FlowRouter.go('/noCliente');
            }
          }
        }
      });
  },
  'click .terminos'(event){
    FlowRouter.go('/terminos');
 },
  'click .atras'(event){
    FlowRouter.go('/domicilio');
 },
});
//==================================================terminos============================================
Template.terminos.events({
  'click .aceptar'(){
    history.back();
  },
});
//==================================================Nocliente Almacenado============================================
Template.noCliente.events({
  'click .aceptar'(){
    FlowRouter.go('/');
  },
});





