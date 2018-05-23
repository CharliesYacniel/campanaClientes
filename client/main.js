import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './main.html';
import 'select2';
import 'select2/dist/css/select2.css';

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
////////////////////////////////////////////ACCESO CLIENTES////////////////////////////////////

Template.acessoCliente.onCreated(function () {      
});
Template.acessoCliente.helpers({
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
    var cuerpo="<cam:wsaccesoclientes.Execute>"+id+"</cam:wsaccesoclientes.Execute>";
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
        // let existe=datosWS.existe[0];
        // let nombreCliente=datosWS.cusfna[0];
        // let ibsCliente=datosWS.cumstcuscun[0];
        // let flag3=datosWS.empleado[0];
        let fatca=datosWS.fatca[0];
        // let fatca='S';
        let nombreCliente='ProbandoB';
        let existe='1';
        let ibsCliente='2089291';
        let flag3='3';
        Session.set("ibs",ibsCliente);
        Session.set("flagEmpleado",flag3);
        //  1   cliente no ha sido actualizado
        //  2  no existe como cliente
        //  3  que ya fue actualizado 
        // console.log(existe);
        // console.log(nombreCliente);
          if(existe=='1'){
            console.log("cliente NO ha sido Actualizado aun");
            var params = {};
            var queryParams = {
               name:nombreCliente,
            };
            FlowRouter.go('/clienteExiste', params, queryParams);
          }
          if(fatca=='S'){
            console.log("No permitir Actualizar");
            FlowRouter.go('/clienteNoSePermite');
          }
          if(existe=='2'){
            console.log("cliente NO EXISTE");
            FlowRouter.go('/clienteNoExiste');
          }
          if (existe=='3'){
            console.log("cliente ACTUALIZADO");
            FlowRouter.go('/clienteActualizado');
          }
        }
    });
  },
});
////////////////////////////////////////////CLIENTE EXISTE////////////////////////////////////
Template.clienteExiste.onCreated(function(){
  this.wsnumboleto = new ReactiveVar([]);
  let id=Session.get('idCliente');
  // Session.set("idCliente",id);
  let cuerpo="<cam:wsnumboleto.Execute>"+id+"</cam:wsnumboleto.Execute>";
  Meteor.call('wsnumboleto',{body:cuerpo},(err, res) =>{
      if (err){
        console.log(err);
      } else {
        this.wsnumboleto.set(res); 
      }
    });
});
Template.clienteExiste.helpers({
  getIdCliente(){
    return  Session.get('idCliente'); 
  },
  getName(){
    return FlowRouter.getQueryParam("name");
  },
  wsnumboleto(){
    var datosWS =Template.instance().wsnumboleto.get();
    if (datosWS.envelope) {
      // console.log(datosWS.envelope.body[0].wsnumboletoexecuteresponse[0]);
      datosWS=datosWS.envelope.body[0].wsnumboletoexecuteresponse[0]; 
      // console.log(datosWS.envelope.body[0].wsnumboletoexecuteresponse[0]);
        // datosWS=datosWS.envelope.body[0].wsnumboletoexecuteresponse[0]; 
    let exite=datosWS.exite[0];
    console.log(exite)
      if (exite==1){
        FlowRouter.go('/');
      }
    }
  return datosWS.codnum;
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
    this.wsnocliente = new ReactiveVar([]);
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
          this.wsnocliente.set(res); 
        }
        var datosWS =this.wsnocliente.get();
        if (datosWS.envelope) {
          // console.log(datosWS.envelope.body[0].wsnoclienteexecuteresponse[0]);
          datosWS=datosWS.envelope.body[0].wsnoclienteexecuteresponse[0]; 
          let flag=datosWS.flage[0];
          console.log(flag);
          if(flag=='N'){
           FlowRouter.go('/clienteActualizado');
          }
          // console.log(datosWS);
        }
      });
  },
  
});
Template.clienteNoExiste.onCreated(function() {
  
});
Template.clienteNoExiste.helpers({
  
});
////////////////////////////////////////////CLIENTE  ACTUALIZADO////////////////////////////////////
Template.clienteActualizado.events({
  'click .Aceptar' (event, instance){
    FlowRouter.go('/');
  }
});
////////////////////////////////////////////CLIENTE NO SE  PERMITE ACTUALIZAR////////////////////////////////////
Template.clienteNoSePermite.events({
  'click .Aceptar' (){
    FlowRouter.go('/');
  }
});














////////////////////////////////////////////CODIGO DE FORMULARIO ////////////////////////////////////
Template.formulario.onCreated(function(){
    // Session.get("idCliente");
    let id=Session.get('idCliente');
    this.foundUser = new ReactiveVar([]);
    var cuerpo="<cam:wsaccesoclientes.Execute>"+id+"</cam:wsaccesoclientes.Execute>";
    Meteor.call('wsaccesoclientes',{ body : cuerpo },(err, res) =>{
      if (err){
        console.log(err);
      } else {
        this.foundUser.set(res);
      } 
    });
  //================================================wsocupacion================================================
  this.wsocupacion = new ReactiveVar([]);
  var Ocupacion="PROFESOR";
  var cuerpo="<cam:wsOcupacion.Execute>"
                +"<cam:Ocupacion>"+Ocupacion+"</cam:Ocupacion>"
            +"</cam:wsOcupacion.Execute>";
  Meteor.call('wsocupacion',{body:cuerpo},  (err, res)=> {
      if (err){
        console.log(err);
      } else {
        this.wsocupacion.set(res); 
      }
    });
     //================================================wsprofesion================================================
     this.wsprofesion = new ReactiveVar([]);
     var Dscr="INGENIERíA";
     var cuerpo="<cam:wsProfesion.Execute>"
                     +"<cam:Dscr>"+Dscr+"</cam:Dscr>"
                 +"</cam:wsProfesion.Execute>";
     Meteor.call('wsprofesion',{body:cuerpo},  (err, res) =>{
         if (err){
           console.log(err);
         } else {
           this.wsprofesion.set(res); 
         }
       });
       //================================================wbmunicipio================================================
    this.wbmunicipio = new ReactiveVar([]);
    var Desmun="L";
    var Depto="HN03";
    var cuerpo="<cam:wbMunicipio.Execute>"
                    +"<cam:Desmun>"+Desmun+"</cam:Desmun>"
                    +"<cam:Depto>"+Depto+"</cam:Depto>"
                +"</cam:wbMunicipio.Execute>";
    Meteor.call('wbmunicipio',{body:cuerpo},  (err, res) =>{
        if (err){
          console.log(err);
        } else {
          this.wbmunicipio.set(res);
        }
      });
    //================================================wsciudada================================================
    this.wsciudada = new ReactiveVar([]);
    var Descaldea="L";
    var Municipioid="HN0308";
    var cuerpo="<cam:wsCiudadA.Execute>"
                  +"<cam:Descaldea>"+Descaldea+"</cam:Descaldea>"
                  +"<cam:Municipioid>"+Municipioid+"</cam:Municipioid>"
                +"</cam:wsCiudadA.Execute>";
    Meteor.call('wsciudada',{body:cuerpo},(err, res) =>{
        if (err){
          console.log(err);
        } else {
          this.wsciudada.set(res); 
        }
      });
    //================================================awsbarriocolonia================================================
    this.awsbarriocolonia = new ReactiveVar([]);
    var Desbcc="L";
    var Ciad="HN030801";
    var cuerpo="<cam:wsBarrioColonia.Execute>"
                    +"<cam:Desbcc>"+Desbcc+"</cam:Desbcc>"
                    +"<cam:Ciad>"+Ciad+"</cam:Ciad>"
                  +"</cam:wsBarrioColonia.Execute>";
    Meteor.call('awsbarriocolonia',{body:cuerpo},  (err, res) =>{
        if (err){
          console.log(err);
        } else {
          this.awsbarriocolonia.set(res);  
        }
      });
});
Template.formulario.helpers({
  getId(){
    return Session.get('idCliente')
  },
   //=============================================wsaccesoclientes=================================================
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
    var datosWS =Template.instance().wsocupacion.get();
    if (datosWS.envelope) {
      // console.log(datosWS.envelope.body[0].wsocupacionexecuteresponse[0].sdtocupacion[0].sdtocupacionsdtocupacionitem);
       datosWS=datosWS.envelope.body[0].wsocupacionexecuteresponse[0].sdtocupacion[0].sdtocupacionsdtocupacionitem; 
    }
  return datosWS;
  },
  //==========================================wsprofesion====================================================
  wsprofesion(){
    var datosWS =Template.instance().wsprofesion.get();
    if (datosWS.envelope) {
      // console.log(datosWS.envelope.body[0].wsprofesionexecuteresponse[0].sdtprofesion[0].sdtprofesionsdtprofesionitem);
      datosWS=datosWS.envelope.body[0].wsprofesionexecuteresponse[0].sdtprofesion[0].sdtprofesionsdtprofesionitem; 
    }
  return datosWS;
  },
  //===========================================wsnocliente===================================================
  wsnocliente(){
    var datosWS =Template.instance().wsnocliente.get();
    if (datosWS.envelope) {
      // console.log(datosWS.envelope.body[0].wsnoclienteexecuteresponse[0]);
      datosWS=datosWS.envelope.body[0].wsnoclienteexecuteresponse[0]; 
    }
  return datosWS;
  },
  //===============================================wbmunicipio===============================================
  wbmunicipio(){
    var datosWS =Template.instance().wbmunicipio.get();
    if (datosWS.envelope) {
      // console.log(datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem);
      datosWS=datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem; 
    }
  return datosWS;
  },
  //============================================wsciudada==================================================
  wsciudada(){
    var datosWS =Template.instance().wsciudada.get();
    if (datosWS.envelope) {
      // console.log(datosWS.envelope.body[0].wsciudadaexecuteresponse[0].sdtciudadaldea[0].sdtciudadaldeasdtciudadaldeaitem);
      datosWS=datosWS.envelope.body[0].wsciudadaexecuteresponse[0].sdtciudadaldea[0].sdtciudadaldeasdtciudadaldeaitem; 
    }
  return datosWS;
  },
  //===========================================awsbarriocolonia===================================================
  awsbarriocolonia(){
    var datosWS =Template.instance().awsbarriocolonia.get();
    if (datosWS.envelope) {
      // console.log(datosWS.envelope.body[0].wsbarriocoloniaexecuteresponse[0].sdtbarriocolonia[0].sdtbarriocoloniasdtbarriocoloniaitem);
      datosWS=datosWS.envelope.body[0].wsbarriocoloniaexecuteresponse[0].sdtbarriocolonia[0].sdtbarriocoloniasdtbarriocoloniaitem; 
    }
  return datosWS;
  },
   //============================================awsguardarcliente==================================================
   awsguardarcliente(){
    var datosWS =Template.instance().awsguardarcliente.get();
    if (datosWS.envelope) {
      // console.log(datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0]);
      datosWS=datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0]; 
    }
  return datosWS;
  },
  //==============================================================================================  
});
Template.formulario.events({
  'submit .formCompletar' (event, instance){
    event.preventDefault();//QUITAR LUEGO
    let pnombre=event.target.nombre1.value;
    let snombre=event.target.nombre2.value;
    let papellido=event.target.apellido1.value;
    let sapellido=event.target.apellido2.value;
    // let var=event.target.profesion;
    let idProfesion=event.target.profesion.value;
    let prof=event.target.profesion;
    let indexProf=prof.selectedIndex;
    let profesion = prof.options[indexProf].text;
    
    // let var=event.target.ocupacion;
    let idocupacion=event.target.ocupacion.value;
    let ocup=event.target.ocupacion;
    let indexOcupa=ocup.selectedIndex;
    let ocupacion = ocup.options[indexOcupa].text;
    
    // let var=event.target.depto;
    let iddepto=event.target.depto.value;
    let depto=event.target.depto;
    let indexDepto=depto.selectedIndex;
    let departamento = depto.options[indexDepto].text;
   
    // let var=event.target.muni;
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

    let domicilio=event.target.domicilio.value;
    let telefono=event.target.telefono.value;
    let movil=event.target.movil.value;
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
    // console.log(pnombre);
    // console.log(snombre);
    // console.log(papellido);
    // console.log(sapellido);
    // console.log(idProfesion+" "+profesion);
    // console.log(idocupacion+" "+ocupacion);
    // console.log(iddepto+" "+departamento);
    // console.log(idmuni+" "+municipio);
    // console.log(idciudad+" "+ciudad);
    // console.log(idbarrio+" "+barrio);
    // console.log(domicilio);
    // console.log(telefono);
    // console.log(movil);
    // console.log(emailP);
    // console.log(emailT);
    // console.log(residente);
    // console.log(declara);
    // console.log(acepto);
    //================================================wsocupacion================================================
    this.awsguardarcliente = new ReactiveVar([]);
    var Codcli=Session.get("ibs");//"2089291";
    var Idncli=Session.get("idCliente");//"0801199306450";
    var Pnombre=pnombre;//"Axel";
    var Snombre=snombre;//"Enrique";
    var Papellido=papellido;//"Landa";
    var Sapellido=sapellido;//"Salgado";
    var Idprof=idProfesion;//"033";
    var Profd=profesion;//"INGENIERíA DE LA CONSTRUCCIóN Y GERENCIA D";
    var Rteacliidocup=idocupacion;//"EZOP";
    var Rteacliocupacion=ocupacion;//"PROFESOR, EDUCACION SUPERIOR/ZOOLOGIA";
    var Declaro=declara;//"S";
    var Acepto=acepto;//"N";
    var Dptoid=iddepto;//"HN01";
    var Dptonombre=departamento;//"AtláAntida";
    var Idmunc=idmuni;//"HN0101";
    var Desmunc=municipio;//"La Ceiba";
    var Idcald=idciudad;//"HN010104";
    var Descald=ciudad;//"Corozal";
    var Id_bcc=idbarrio;//"HN010104002";
    var Descrbcc=barrio;//"La Ensenada";
    var Dirdom=domicilio;//"La ensenada b2 c 905 contiguo a plaza azul";
    var Numtelf=telefono;//"22467469";
    var Nummovil=movil;//"33822840";
    var Emailp=emailP;//"axellanda93@gmail.com";
    var Emailt=emailT;//"alanda@bancatlan.hn";
    var Flag1=residente;//"N";
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
          this.awsguardarcliente.set(res); 
        }
        var datosWS =this.awsguardarcliente.get();
        if (datosWS.envelope) {
          console.log(datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0]);
          let estado=datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0].estado[0]; 
          if (estado==1){
            // console.log('manda a llamar una venta de funiono correctamente');
            FlowRouter.go('/clienteActualizado');
          }else{
            FlowRouter.go('/');
          }
        }
      });
  },
  'click .exit' (event, instance){
    history.back();
  },
});
Template.formulario.onRendered( function() {
  $.validator.addMethod("valueNotEquals", function(value, element, arg){
    // I use element.value instead value here, value parameter was always null
    return arg != element.value; 
}, "Value must not equal arg.");
  $( "#formCompletar" ).validate({
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
      profesion: { valueNotEquals: "nulo" },
      ocupacion: { valueNotEquals: "nulo" },
      depto: { valueNotEquals: "nulo" },
      muni: { valueNotEquals: "nulo" },
      ciudad: { valueNotEquals: "nulo" },
      barrio:{ valueNotEquals: "nulo" },
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
      profesion: { valueNotEquals: "Selecione un valor por favor" },
      ocupacion: { valueNotEquals: "Selecione un valor por favor" },
      depto: { valueNotEquals: "Selecione un valor por favor" },
      muni: { valueNotEquals: "Selecione un valor por favor" },
      ciudad: { valueNotEquals: "Selecione un valor por favor" },
      barrio:{ valueNotEquals: "Selecione un valor por favor" },
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








//===========================-----------------------//////CODIGO DE SECUENCIA///////////------------------------======================================
// fomulario1  Nombre completo , profesion y ocupacion
let wsprofesion = new ReactiveVar([]);
let wsocupacion = new ReactiveVar([]);

Template.nombre.onCreated(function(){
  $(document).ready(function() {
    $('#profesion').select2();
  });
  $(document).ready(function() {
    $('#ocupacion').select2();
  });
  let id=Session.get('idCliente');
    this.foundUser = new ReactiveVar([]);
    var cuerpo="<cam:wsaccesoclientes.Execute>"+id+"</cam:wsaccesoclientes.Execute>";
    Meteor.call('wsaccesoclientes',{ body : cuerpo },(err, res) =>{
      if (err){
        console.log(err);
      } else {
        this.foundUser.set(res);
      } 
    });   
});
Template.nombre.onRendered(function(){});
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
     FlowRouter.go('/departamento');
  },
  'click .atras'(event){
    FlowRouter.go('/clienteExiste');
 },
 'input .myProfesion'(event){
  // console.log(event.target.value);
  //================================================wsprofesion================================================
  // this.profesiones = new ReactiveVar([]);
  // var Dscr="INGENIERíA";
  var Dscr=event.target.value;
  var cuerpo="<cam:wsProfesion.Execute>"
                  +"<cam:Dscr>"+Dscr+"</cam:Dscr>"
              +"</cam:wsProfesion.Execute>";
  Meteor.call('wsprofesion',{body:cuerpo},  (err, res) =>{
      if (err){
        console.log(err);
      } else {
        wsprofesion.set(res); 
        var datosWS =res;
        if(datosWS.envelope){
          datosWS=datosWS.envelope.body[0].wsprofesionexecuteresponse[0].sdtprofesion[0].sdtprofesionsdtprofesionitem; 
          wsprofesion.set(datosWS);
          document.getElementById("profesion").disabled = false; 
        }
      }
    });
},
'input .myOcupacion'(event){
 //================================================wsocupacion================================================
//  var Ocupacion="PROFESOR";
 var Ocupacion=event.target.value;
 var cuerpo="<cam:wsOcupacion.Execute>"
               +"<cam:Ocupacion>"+Ocupacion+"</cam:Ocupacion>"
           +"</cam:wsOcupacion.Execute>";
 Meteor.call('wsocupacion',{body:cuerpo},  (err, res)=> {
     if (err){
       console.log(err);
     } else {
       wsocupacion.set(res);
       var datosWS =res;
      if(datosWS.envelope){
        console.log(datosWS.envelope.body[0].wsocupacionexecuteresponse[0].sdtocupacion[0].sdtocupacionsdtocupacionitem);
        datosWS=datosWS.envelope.body[0].wsocupacionexecuteresponse[0].sdtocupacion[0].sdtocupacionsdtocupacionitem;
        wsocupacion.set(datosWS);
        document.getElementById("ocupacion").disabled = false; 
      } 
     }
   });
},
});
//==============================================================================================

// fomulario3  municipio,ciudad,barrio
let wbmunicipio = new ReactiveVar([]);
let wsciudada = new ReactiveVar([]);
let awsbarriocolonia = new ReactiveVar([]);

Template.municipio.onCreated(function(){
  //================================================wbmunicipio================================================
  // console.log('este es el ide de depto',Session.get("iddepto"));
});
Template.municipio.onRendered(function(){});
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
    Session.set("idmuni",idmuni);
    Session.set("idciudad",idciudad);
    Session.set("idbarrio",idbarrio);

    Session.set("municipio",municipio);
    Session.set("ciudad",ciudad);
    Session.set("barrio",barrio);

    FlowRouter.go('/domicilio');
  },
  'click .atras'(event){
    FlowRouter.go('/departamento');
 },
 'input .myMunicipio'(event){
    // console.log(event.target.value);
    var Desmun=event.target.value;//"L";
    var Depto=Session.get("iddepto");//"HN03";//Session.get("iddepto");
    var cuerpo="<cam:wbMunicipio.Execute>"
                    +"<cam:Desmun>"+Desmun+"</cam:Desmun>"
                    +"<cam:Depto>"+Depto+"</cam:Depto>"
                +"</cam:wbMunicipio.Execute>";
    Meteor.call('wbmunicipio',{body:cuerpo},(err, res) =>{
        if (err){
          console.log(err);
        } else {
          var datosWS =res;
          if (datosWS.envelope) {
            console.log(datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem);
            datosWS=datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem; 
            wbmunicipio.set(datosWS);
            document.getElementById("municipio").disabled = false;
          }
          // console.log(selectmuni);
          // selectmuni.innerHTML.disabled=false;
        }
      });
  },
  'change .municipio'(event){
     document.getElementById("myCidudad").disabled=false;
  },
  'input .myCidudad'(event){
    // console.log(event.target.value);
    // var Desmun=event.target.value;//"L";
   //================================================wsciudada================================================
    var Descaldea=event.target.value;// "L";
    var Municipioid= "HN0308";
    var cuerpo="<cam:wsCiudadA.Execute>"
                  +"<cam:Descaldea>"+Descaldea+"</cam:Descaldea>"
                  +"<cam:Municipioid>"+Municipioid+"</cam:Municipioid>"
                +"</cam:wsCiudadA.Execute>";
    Meteor.call('wsciudada',{body:cuerpo},(err, res) =>{
        if (err){
          console.log(err);
        } else {
          var datosWS =res;
          if (datosWS.envelope){
            datosWS=datosWS.envelope.body[0].wsciudadaexecuteresponse[0].sdtciudadaldea[0].sdtciudadaldeasdtciudadaldeaitem; 
            wsciudada.set(datosWS); 
            document.getElementById("ciudad").disabled = false;
          } 
        }
      });
  }, 
  'change .ciudad'(event){
    document.getElementById("myColonia").disabled=false;
 },
  'input .myColonia'(event){
    console.log(event.target.value);
    //================================================awsbarriocolonia================================================
    var Desbcc=event.target.value;//"L";
    var Ciad="HN030801";
    var cuerpo="<cam:wsBarrioColonia.Execute>"
                    +"<cam:Desbcc>"+Desbcc+"</cam:Desbcc>"
                    +"<cam:Ciad>"+Ciad+"</cam:Ciad>"
                  +"</cam:wsBarrioColonia.Execute>";
    Meteor.call('awsbarriocolonia',{ body:cuerpo },(err,res) =>{
        if(err){
          console.log(err);
        } else {
          var datosWS=res;
          if (datosWS.envelope){
            datosWS=datosWS.envelope.body[0].wsbarriocoloniaexecuteresponse[0].sdtbarriocolonia[0].sdtbarriocoloniasdtbarriocoloniaitem; 
            awsbarriocolonia.set(datosWS); 
            document.getElementById("colonia").disabled = false; 
          }
        }
      });
  },
});
//==============================================================================================
// fomulario4  domicilio,telfono y movil
Template.domicilio.onCreated(function(){});
Template.domicilio.onRendered(function(){});
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
Template.departamento.onCreated(function(){

});
Template.departamento.onRendered(function(){});
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
Template.correo.onCreated(function(){
});
Template.correo.onRendered(function(){});
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

    this.awsguardarcliente = new ReactiveVar([]);
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
          this.awsguardarcliente.set(res); 
        }
        var datosWS =this.awsguardarcliente.get();
        if (datosWS.envelope) {
          console.log(datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0]);
          let estado=datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0].estado[0]; 
          if (estado==1){
            FlowRouter.go('/clienteActualizado');
          }else{
            FlowRouter.go('/');
          }
        }
      });
  },
  'click .atras'(event){
    FlowRouter.go('/domicilio');
 },
});
//==============================================================================================







