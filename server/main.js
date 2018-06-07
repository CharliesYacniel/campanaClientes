import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.startup(function() {
  reCAPTCHA.config({
    privatekey: '6Ldcsl0UAAAAAIYUq_tDexejL2LImzIzstl8vpO4',
    settings: {},
    config: function(settings) {
        return _.extend(this.settings, settings);
    },
    verifyCaptcha: function(clientIP,response) {
    }
  });
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
  },//metodo de el capcha
  'formSubmissionMethod' (captchaData) {
    let captcha_data = {
        secret: '6Ldcsl0UAAAAAIYUq_tDexejL2LImzIzstl8vpO4',
        remoteip: this.connection.clientAddress,
        response: captchaData,
    };
    var serialized_captcha_data =
        'secret=' + captcha_data.secret +
        '&remoteip=' + captcha_data.remoteip +
        '&response=' + captcha_data.response;
    let captchaVerificationResult;
    var success = false;
    try {
    captchaVerificationResult = HTTP.call("POST", "https://www.google.com/recaptcha/api/siteverify", {
                                                  content: serialized_captcha_data.toString('utf8'),
                                                  headers: {
                                                      'Content-Type': 'application/x-www-form-urlencoded',
                                                      'Content-Length': serialized_captcha_data.length
                                                  }
          });
      } catch (e) {
          console.log(e);
          return {
              'success': false,
              'error': 'Service Not Available'
          };
      }
      if (!captchaVerificationResult || !captchaVerificationResult.content) {
          return {
              'success': false,
              'error': 'Entered Text Does Not Match'
          };
      }
      let verifyCaptchaResponse = JSON.parse(captchaVerificationResult.content);
      if(verifyCaptchaResponse.success){
        success=verifyCaptchaResponse.success;
      }
      return success;
    }
});
