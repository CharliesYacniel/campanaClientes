// import './formulario.html';
// ////////////////////////////////////////////CODIGO DE FORMULARIO ////////////////////////////////////
// Template.formulario.onCreated(function(){
//     // Session.get("idCliente");
//     let id=Session.get('idCliente');
//     this.foundUser = new ReactiveVar([]);
//     var cuerpo="<cam:wsaccesoclientes.Execute>"+id+"</cam:wsaccesoclientes.Execute>";
//     Meteor.call('wsaccesoclientes',{ body : cuerpo },(err, res) =>{
//       if (err){
//         console.log(err);
//       } else {
//         this.foundUser.set(res);
//       } 
//     });
//   //================================================wsocupacion================================================
//   this.wsocupacion = new ReactiveVar([]);
//   var Ocupacion="PROFESOR";
//   var cuerpo="<cam:wsOcupacion.Execute>"
//                 +"<cam:Ocupacion>"+Ocupacion+"</cam:Ocupacion>"
//             +"</cam:wsOcupacion.Execute>";
//   Meteor.call('wsocupacion',{body:cuerpo},  (err, res)=> {
//       if (err){
//         console.log(err);
//       } else {
//         this.wsocupacion.set(res); 
//       }
//     });
//      //================================================wsprofesion================================================
//      this.wsprofesion = new ReactiveVar([]);
//      var Dscr="INGENIERíA";
//      var cuerpo="<cam:wsProfesion.Execute>"
//                      +"<cam:Dscr>"+Dscr+"</cam:Dscr>"
//                  +"</cam:wsProfesion.Execute>";
//      Meteor.call('wsprofesion',{body:cuerpo},  (err, res) =>{
//          if (err){
//            console.log(err);
//          } else {
//            this.wsprofesion.set(res); 
//          }
//        });
//        //================================================wbmunicipio================================================
//     this.wbmunicipio = new ReactiveVar([]);
//     var Desmun="L";
//     var Depto="HN03";
//     var cuerpo="<cam:wbMunicipio.Execute>"
//                     +"<cam:Desmun>"+Desmun+"</cam:Desmun>"
//                     +"<cam:Depto>"+Depto+"</cam:Depto>"
//                 +"</cam:wbMunicipio.Execute>";
//     Meteor.call('wbmunicipio',{body:cuerpo},  (err, res) =>{
//         if (err){
//           console.log(err);
//         } else {
//           this.wbmunicipio.set(res);
//         }
//       });
//     //================================================wsciudada================================================
//     this.wsciudada = new ReactiveVar([]);
//     var Descaldea="L";
//     var Municipioid="HN0308";
//     var cuerpo="<cam:wsCiudadA.Execute>"
//                   +"<cam:Descaldea>"+Descaldea+"</cam:Descaldea>"
//                   +"<cam:Municipioid>"+Municipioid+"</cam:Municipioid>"
//                 +"</cam:wsCiudadA.Execute>";
//     Meteor.call('wsciudada',{body:cuerpo},(err, res) =>{
//         if (err){
//           console.log(err);
//         } else {
//           this.wsciudada.set(res); 
//         }
//       });
//     //================================================awsbarriocolonia================================================
//     this.awsbarriocolonia = new ReactiveVar([]);
//     var Desbcc="L";
//     var Ciad="HN030801";
//     var cuerpo="<cam:wsBarrioColonia.Execute>"
//                     +"<cam:Desbcc>"+Desbcc+"</cam:Desbcc>"
//                     +"<cam:Ciad>"+Ciad+"</cam:Ciad>"
//                   +"</cam:wsBarrioColonia.Execute>";
//     Meteor.call('awsbarriocolonia',{body:cuerpo},  (err, res) =>{
//         if (err){
//           console.log(err);
//         } else {
//           this.awsbarriocolonia.set(res);  
//         }
//       });
// });
// Template.formulario.helpers({
//   getId(){
//     return Session.get('idCliente')
//   },
//    //=============================================wsaccesoclientes=================================================
//    wsaccesoclientes(){
//     var datosWS =Template.instance().foundUser.get();
//       if (datosWS.envelope) {
//         datosWS=datosWS.envelope.body[0].wsaccesoclientesexecuteresponse[0].sdtaccesoclientes[0];
//         // console.log(datosWS);
//       }
//   return datosWS;
//   },
//   //=============================================wsocupacion=================================================
//   wsocupacion(){
//     var datosWS =Template.instance().wsocupacion.get();
//     if (datosWS.envelope) {
//       // console.log(datosWS.envelope.body[0].wsocupacionexecuteresponse[0].sdtocupacion[0].sdtocupacionsdtocupacionitem);
//        datosWS=datosWS.envelope.body[0].wsocupacionexecuteresponse[0].sdtocupacion[0].sdtocupacionsdtocupacionitem; 
//     }
//   return datosWS;
//   },
//   //==========================================wsprofesion====================================================
//   wsprofesion(){
//     var datosWS =Template.instance().wsprofesion.get();
//     if (datosWS.envelope) {
//       // console.log(datosWS.envelope.body[0].wsprofesionexecuteresponse[0].sdtprofesion[0].sdtprofesionsdtprofesionitem);
//       datosWS=datosWS.envelope.body[0].wsprofesionexecuteresponse[0].sdtprofesion[0].sdtprofesionsdtprofesionitem; 
//     }
//   return datosWS;
//   },
//   //===========================================wsnocliente===================================================
//   wsnocliente(){
//     var datosWS =Template.instance().wsnocliente.get();
//     if (datosWS.envelope) {
//       // console.log(datosWS.envelope.body[0].wsnoclienteexecuteresponse[0]);
//       datosWS=datosWS.envelope.body[0].wsnoclienteexecuteresponse[0]; 
//     }
//   return datosWS;
//   },
//   //===============================================wbmunicipio===============================================
//   wbmunicipio(){
//     var datosWS =Template.instance().wbmunicipio.get();
//     if (datosWS.envelope) {
//       // console.log(datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem);
//       datosWS=datosWS.envelope.body[0].wbmunicipioexecuteresponse[0].sdtmunicipio[0].sdtmunicipiosdtmunicipioitem; 
//     }
//   return datosWS;
//   },
//   //============================================wsciudada==================================================
//   wsciudada(){
//     var datosWS =Template.instance().wsciudada.get();
//     if (datosWS.envelope) {
//       // console.log(datosWS.envelope.body[0].wsciudadaexecuteresponse[0].sdtciudadaldea[0].sdtciudadaldeasdtciudadaldeaitem);
//       datosWS=datosWS.envelope.body[0].wsciudadaexecuteresponse[0].sdtciudadaldea[0].sdtciudadaldeasdtciudadaldeaitem; 
//     }
//   return datosWS;
//   },
//   //===========================================awsbarriocolonia===================================================
//   awsbarriocolonia(){
//     var datosWS =Template.instance().awsbarriocolonia.get();
//     if (datosWS.envelope) {
//       // console.log(datosWS.envelope.body[0].wsbarriocoloniaexecuteresponse[0].sdtbarriocolonia[0].sdtbarriocoloniasdtbarriocoloniaitem);
//       datosWS=datosWS.envelope.body[0].wsbarriocoloniaexecuteresponse[0].sdtbarriocolonia[0].sdtbarriocoloniasdtbarriocoloniaitem; 
//     }
//   return datosWS;
//   },
//    //============================================awsguardarcliente==================================================
//    awsguardarcliente(){
//     var datosWS =Template.instance().awsguardarcliente.get();
//     if (datosWS.envelope) {
//       // console.log(datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0]);
//       datosWS=datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0]; 
//     }
//   return datosWS;
//   },
//   //==============================================================================================  
// });
// Template.formulario.events({
//   'submit .formCompletar' (event, instance){
//     event.preventDefault();//QUITAR LUEGO
//     let pnombre=event.target.nombre1.value;
//     let snombre=event.target.nombre2.value;
//     let papellido=event.target.apellido1.value;
//     let sapellido=event.target.apellido2.value;
//     // let var=event.target.profesion;
//     let idProfesion=event.target.profesion.value;
//     let prof=event.target.profesion;
//     let indexProf=prof.selectedIndex;
//     let profesion = prof.options[indexProf].text;
    
//     // let var=event.target.ocupacion;
//     let idocupacion=event.target.ocupacion.value;
//     let ocup=event.target.ocupacion;
//     let indexOcupa=ocup.selectedIndex;
//     let ocupacion = ocup.options[indexOcupa].text;
    
//     // let var=event.target.depto;
//     let iddepto=event.target.depto.value;
//     let depto=event.target.depto;
//     let indexDepto=depto.selectedIndex;
//     let departamento = depto.options[indexDepto].text;
   
//     // let var=event.target.muni;
//     let idmuni=event.target.muni.value;
//     let muni=event.target.muni;
//     let indexMuni=muni.selectedIndex;
//     let municipio = muni.options[indexMuni].text;
    
//     // let var=event.target.ciudad;
//     let idciudad=event.target.ciudad.value;
//     let ciu=event.target.ciudad;
//     let indexCiud=ciu.selectedIndex;
//     let ciudad = ciu.options[indexCiud].text;
    
//     // let var=event.target.barrio;
//     let idbarrio=event.target.barrio.value;
//     let bar=event.target.barrio;
//     let indexBar=bar.selectedIndex;
//     let barrio = bar.options[indexBar].text;

//     let domicilio=event.target.domicilio.value;
//     let telefono=event.target.telefono.value;
//     let movil=event.target.movil.value;
//     let emailP=event.target.emailP.value;
//     let emailT=event.target.emailT.value;
//     let residente=event.target.residente.value;
//     let declara=event.target.declara.value;
//     let acepto=event.target.acepto.value;
    
//     if(residente=='si'){
//       residente='S';
//     }else{
//       residente='N';
//     }
//     // console.log(pnombre);
//     // console.log(snombre);
//     // console.log(papellido);
//     // console.log(sapellido);
//     // console.log(idProfesion+" "+profesion);
//     // console.log(idocupacion+" "+ocupacion);
//     // console.log(iddepto+" "+departamento);
//     // console.log(idmuni+" "+municipio);
//     // console.log(idciudad+" "+ciudad);
//     // console.log(idbarrio+" "+barrio);
//     // console.log(domicilio);
//     // console.log(telefono);
//     // console.log(movil);
//     // console.log(emailP);
//     // console.log(emailT);
//     // console.log(residente);
//     // console.log(declara);
//     // console.log(acepto);
//     //================================================wsocupacion================================================
//     this.awsguardarcliente = new ReactiveVar([]);
//     var Codcli=Session.get("ibs");//"2089291";
//     var Idncli=Session.get("idCliente");//"0801199306450";
//     var Pnombre=pnombre;//"Axel";
//     var Snombre=snombre;//"Enrique";
//     var Papellido=papellido;//"Landa";
//     var Sapellido=sapellido;//"Salgado";
//     var Idprof=idProfesion;//"033";
//     var Profd=profesion;//"INGENIERíA DE LA CONSTRUCCIóN Y GERENCIA D";
//     var Rteacliidocup=idocupacion;//"EZOP";
//     var Rteacliocupacion=ocupacion;//"PROFESOR, EDUCACION SUPERIOR/ZOOLOGIA";
//     var Declaro=declara;//"S";
//     var Acepto=acepto;//"N";
//     var Dptoid=iddepto;//"HN01";
//     var Dptonombre=departamento;//"AtláAntida";
//     var Idmunc=idmuni;//"HN0101";
//     var Desmunc=municipio;//"La Ceiba";
//     var Idcald=idciudad;//"HN010104";
//     var Descald=ciudad;//"Corozal";
//     var Id_bcc=idbarrio;//"HN010104002";
//     var Descrbcc=barrio;//"La Ensenada";
//     var Dirdom=domicilio;//"La ensenada b2 c 905 contiguo a plaza azul";
//     var Numtelf=telefono;//"22467469";
//     var Nummovil=movil;//"33822840";
//     var Emailp=emailP;//"axellanda93@gmail.com";
//     var Emailt=emailT;//"alanda@bancatlan.hn";
//     var Flag1=residente;//"N";
//     var Flag3=Session.get("flagEmpleado");//"S";
//     var Estado="";
//     var cuerpo="<cam:wsGuardarCliente.Execute>"
//                     +"<cam:Codcli>"+Codcli+"</cam:Codcli>"
//                     +"<cam:Idncli>"+Idncli+"</cam:Idncli>"
//                     +"<cam:Pnombre>"+Pnombre+"</cam:Pnombre>"
//                     +"<cam:Snombre>"+Snombre+"</cam:Snombre>"
//                     +"<cam:Papellido>"+Papellido+"</cam:Papellido>"
//                     +"<cam:Sapellido>"+Sapellido+"</cam:Sapellido>"
//                     +"<cam:Idprof>"+Idprof+"</cam:Idprof>"
//                     +"<cam:Profd>"+Profd+"</cam:Profd>"
//                     +"<cam:Rteacliidocup>"+Rteacliidocup+"</cam:Rteacliidocup>"
//                     +"<cam:Rteacliocupacion>"+Rteacliocupacion+"</cam:Rteacliocupacion>"
//                     +"<cam:Declaro>"+Declaro+"</cam:Declaro>"
//                     +"<cam:Acepto>"+Acepto+"</cam:Acepto>" 
//                     +"<cam:Dptoid>"+Dptoid+"</cam:Dptoid>"
//                     +"<cam:Dptonombre>"+Dptonombre+"</cam:Dptonombre>"
//                     +"<cam:Idmunc>"+Idmunc+"</cam:Idmunc>" 
//                     +"<cam:Desmunc>"+Desmunc+"</cam:Desmunc>"
//                     +"<cam:Idcald>"+Idcald+"</cam:Idcald>"
//                     +"<cam:Descald>"+Descald+"</cam:Descald>"
//                     +"<cam:Id_bcc>"+Id_bcc+"</cam:Id_bcc>"
//                     +"<cam:Descrbcc>"+Descrbcc+"</cam:Descrbcc>"
//                     +"<cam:Dirdom>"+Dirdom+"</cam:Dirdom>"
//                     +"<cam:Numtelf>"+Numtelf+"</cam:Numtelf>" 
//                     +"<cam:Nummovil>"+Nummovil+"</cam:Nummovil>"
//                     +"<cam:Emailp>"+Emailp+"</cam:Emailp>"
//                     +"<cam:Emailt>"+Emailt+"</cam:Emailt>"
//                     +"<cam:Flag1>"+Flag1+"</cam:Flag1>"
//                     +"<cam:Flag3>"+Flag3+"</cam:Flag3>"
//                     +"<cam:Estado>"+Estado+"</cam:Estado>"
//                 +"</cam:wsGuardarCliente.Execute>";
//     Meteor.call('awsguardarcliente',{body:cuerpo},(err,res) =>{
//         if (err){
//           console.log(err);
//         } else {
//           this.awsguardarcliente.set(res); 
//         }
//         var datosWS =this.awsguardarcliente.get();
//         if (datosWS.envelope) {
//           console.log(datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0]);
//           let estado=datosWS.envelope.body[0].wsguardarclienteexecuteresponse[0].estado[0]; 
//           if (estado==1){
//             // console.log('manda a llamar una venta de funiono correctamente');
//             FlowRouter.go('/clienteActualizado');
//           }else{
//             FlowRouter.go('/');
//           }
//         }
//       });
//   },
//   'click .exit' (event, instance){
//     history.back();
//   },
// });
// Template.formulario.onRendered( function() {
//   $.validator.addMethod("valueNotEquals", function(value, element, arg){
//        return arg != element.value; 
//     }, "Value must not equal arg.");

//   $( "#formCompletar" ).validate({
//     rules: {
//       nombre1:{
//         required:true,
//         pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
//       },
//       nombre2:{
//         required:false,
//         pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
//       },
//       apellido1:{
//         required:true,
//         pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
//       },
//       apellido2:{
//         required:false,
//         pattern: /^[a-zA-ZáéíïóúüÁÉÍÏÓÚÜñÑ\'\"\s]+$/,
//       },
//       profesion: { valueNotEquals: "nulo" },
//       ocupacion: { valueNotEquals: "nulo" },
//       depto: { valueNotEquals: "nulo" },
//       muni: { valueNotEquals: "nulo" },
//       ciudad: { valueNotEquals: "nulo" },
//       barrio:{ valueNotEquals: "nulo" },
//       domicilio: {
//         required:true,
//         // minlength: "Puede usar hasta 100 caracteres"
//       },
//       telefono:{
//         required:true,
//         pattern:/^[2][0-9]{7}$/,
//       },
//       movil:{
//         required:true,
//         pattern:/^[9|3|8][0-9]{7}$/,
//       },
//       emailP:{
//         required:true,
//       },
//       emailT:{
//         required:true,
//       },
//       residente:{
//         required:true,
//       },
//     },
//     messages: {
//       nombre1:{
//         required:"Es necesrio que verifique Primer Nombre",
//         pattern:"No valido",
//       },
//       nombre2:{
//         // required:"Es necesrio que verifique Segundo Nombre",
//         pattern:"No valido",
//       },
//       apellido1:{
//         required:"Es necesrio que verifique nombre",
//         pattern:"No valido",
//       },
//       apellido2:{
//         // required:"Es necesrio que verifique nombre",
//         pattern:"No valido",
//       },
//       profesion: { valueNotEquals: "Selecione un valor por favor" },
//       ocupacion: { valueNotEquals: "Selecione un valor por favor" },
//       depto: { valueNotEquals: "Selecione un valor por favor" },
//       muni: { valueNotEquals: "Selecione un valor por favor" },
//       ciudad: { valueNotEquals: "Selecione un valor por favor" },
//       barrio:{ valueNotEquals: "Selecione un valor por favor" },
//       domicilio: {
//         required: "Es necesario que escriba su domicilio actual",
//         // minlength: "Puede usar hasta 100 caracteres"
//         pattern:"Dato no valido",
//       },
//       telefono:{
//         required:"Favor ingresar su telefono",
//       },
//       movil:{
//         required:"Favor rellenar este de telefono movil",
//       },
//       emailP:{
//         required:"Favor rellenar este campo",
//       },
//       emailT:{
//         required:"Favor rellenar este campo",
//       },
//       residente:{
//         required:"Favor seleccione una respuesta",
//       },
//     }
//   });
// });