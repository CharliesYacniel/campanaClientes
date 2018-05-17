import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.startup(() => {
});

// =================================
function puntos(xml) {
  return xml.replace('.','');
}
// =================================
Meteor.methods({
  'wsaccesoclientes'({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
            +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
      // console.log(xml);
      var options = {
            content: xml,
            headers: {
              'Content-Type': 'text/xml',
              },
            }
      var url="http://150.150.6.87/CampActualizacion/awsaccesoclientes.aspx";
      var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;

      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },// =================================
  'wsaccesoprueba'({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
        +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
    var options = {
      content: xml,
      headers: {
        'Content-Type': 'text/xml',
        },
      }
    var url="http://150.150.6.87/CampActualizacion/awsaccesoclientes.aspx";
    var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;
      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },// =================================
  'wsnumboleto' ({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
        +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
      var options = {
            content: xml,
            headers: {
              'Content-Type': 'text/xml',
              },
            }
      var url="http://150.150.6.87/CampActualizacion/awsnumboleto.aspx";
      var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;
      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },// =================================
  'wsnocliente' ({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
        +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
      var options = {
            content: xml,
            headers: {
              'Content-Type': 'text/xml',
              },
            }
      var url="http://150.150.6.87/CampActualizacion/awsNocliente.aspx";
      var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;
      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },// =================================
  'wsocupacion' ({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
        +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
      var options = {
            content: xml,
            headers: {
              'Content-Type': 'text/xml',
              },
            }
      var url="http://150.150.6.87/CampActualizacion/awsocupacion.aspx";
      var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;
      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },// =================================
  'wsprofesion' ({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
        +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
      var options = {
            content: xml,
            headers: {
              'Content-Type': 'text/xml',
              },
            }
      var url="http://150.150.6.87/CampActualizacion/awsprofesion.aspx";
      var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;
      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },// =================================
  'wbmunicipio' ({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
        +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
      var options = {
            content: xml,
            headers: {
              'Content-Type': 'text/xml',
              },
            }
      var url="http://150.150.6.87/CampActualizacion/awbmunicipio.aspx";
      var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;
      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },// =================================
  'wsciudada' ({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
        +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
      var options = {
            content: xml,
            headers: {
              'Content-Type': 'text/xml',
              },
            }
      var url="http://150.150.6.87/CampActualizacion/awsciudada.aspx";
      var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;
      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },// =================================
  'awsbarriocolonia' ({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
        +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
      var options = {
            content: xml,
            headers: {
              'Content-Type': 'text/xml',
              },
            }
      var url="http://150.150.6.87/CampActualizacion/awsbarriocolonia.aspx";
      var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;
      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },// =================================
  'awsguardarcliente' ({body}) {
    var xml=
        "<?xml version='1.0' encoding = 'utf-8'?>"
        +"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cam='CampañaActualizacionDatosClientes'>"
        +"<soapenv:Body>"+body+"</soapenv:Body>"
        +"</soapenv:Envelope>";
      var options = {
            content: xml,
            headers: {
              'Content-Type': 'text/xml',
              },
            }
      var url="http://150.150.6.87/CampActualizacion/awsguardarcliente.aspx";
      var miJson={};
      var parseStringSync = require('xml2js-parser').parseStringSync;
      var stripPrefix = require('xml2js').processors.stripPrefix;
      var xml=HTTP.call('POST',url,options).content;
      var result= parseStringSync(xml,{
                                      trim:true,
                                      normalizeTags: true,
                                      ignoreAttrs:true,
                                      tagNameProcessors: [ stripPrefix ,puntos]   
                                    });
      return result;
  },
});
