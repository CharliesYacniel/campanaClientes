// Template.hello.onRendered(function() {
//   console.log('onRendered wsaccesoclientes');
//     //================================================================================================
//     this.json = new ReactiveVar([]);
//     var id="080199306550";
//     var cuerpo="<cam:wsaccesoclientes.Execute>"+id+"</cam:wsaccesoclientes.Execute>";
//     Meteor.call('wsaccesoclientes',{ body : cuerpo },(err, res)=>{
//         if (err){
//           console.log(err);
//         } else {
//           // this.json.set(res);
//           let listReference = document.getElementById('jsonparse');
//           // this.json[]=res.envelope.body[0].wsaccesoclientesexecuteresponse[0].sdtaccesoclientes;
//           res.envelope.body[0].wsaccesoclientesexecuteresponse[0].sdtaccesoclientes.forEach(function(sdt, index) {
//             Object.keys(sdt).forEach(function(key) {
//               console.log(key);
//               let li = document.createElement('li');
//               li.appendChild(document.createTextNode(sdt[key]));
//               listReference.appendChild(li);
//             });
//           });
//         }
//       });
//       //================================================================================================
// });