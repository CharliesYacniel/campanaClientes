import { Template } from 'meteor/templating';
// import '../components/clienteExiste.html';
// import { ReactiveVar } from 'meteor/reactive-var';
// import { Session } from 'meteor/session';
// import { Meteor } from 'meteor/meteor';

//   Template.clienteExiste.helpers({
//     test() {
//       return  Session.get('idCliente'); 
//     }
//   });

// Template.clienteExiste.helpers({
//     test() {
//       return Session.get('idCliente');
//     }
//   });
// import 'clienteExiste.html';
// Template.clienteExiste.helpers({
//     wsnumboleto(){
//         this.wsnumboleto = new ReactiveVar([]);
//         var id="0801199306450";
//         var cuerpo="<cam:wsnumboleto.Execute>"+id+"</cam:wsnumboleto.Execute>";
//         Meteor.call('wsnumboleto',{body:cuerpo},(err, res) =>{
//             if (err){
//             console.log(err);
//             } else {
//             this.wsnumboleto.set(res); 
//             }
//             var datosWS =this.wsnumboleto.get();
//             if (datosWS.envelope) {
//             console.log(datosWS.envelope.body[0].wsnumboletoexecuteresponse[0]);
//             datosWS=datosWS.envelope.body[0].wsnumboletoexecuteresponse[0]; 
//             }
//             return datosWS;
//         });
        
//       },
// });
// Template.clienteExiste.events({

// });
