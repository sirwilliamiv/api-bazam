//code from
//https://github.com/acrcloud/webapi_example/blob/master/identify%20protocol%201%20(recommended)/IdentifyProtocolV1.js




const url = require('url');
const fs = require('fs');
const crypto = require('crypto');
const request = require('request');




const ACRCloud = require( 'acr-cloud' );

  const acr = new ACRCloud({
  // required
  access_key: process.env.ACR_ACCOUNT,
  access_secret: process.env.ACR_SECRET_KEY,
  // optional
  requrl: process.env.ACR_HOST,
  http_method: 'POST',
  http_uri: '/v1/identify',
  data_type: 'audio',
  signature_version: '2',
  timestamp: Date.now()
});


// console.log("host", ACR_HOST)
module.exports.acrRequest = ( req ,res,err ) => {
  console.log("backend req.body", req.body.send64)
  const buffer =  req.body.send64

    acr.identify( buffer )
  .then( function( data ) {
    var response = JSON.parse( data.body );
    if( data.statusCode == 200 && response.status ) {
      var success = ( response.status.msg == 'Success' );
      return res.send({
        success: success,
        msg: response.status.msg,
        data: response
      });
    } else {
      return res.send({
        success: false,
        msg: "Error reaching API",
        data: data
      });
    }
    res.send({
      success: true,
      msg: "Found the audio",
      data: data
    })
  })
  .catch( function( err ) {
    return res.send({
      success: false,
      msg: "Error identifying audio",
      data: err
    });
  })

  //****local api testing below*****
  //********************************
  //// const { ACR_SECRET_KEY, ACR_HOST, ACR_ACCOUNT } =require('../acr_auth');
//   // console.log("acrObj", acrObj) base64 starts 22 deep
// const base64buffer = req.body.send64
// console.log("base64buffer", base64buffer)
// console.log("back end msg", bitmap)

// console.log("bitmap findctrl", bitmap)

// const options = {
//   host: ACR_HOST ,
//   endpoint: '/v1/identify',
//   signature_version: '1',
//   data_type:'audio',
//   secure: true,
//   access_key: ACR_ACCOUNT,
//   access_secret: ACR_SECRET_KEY
// };

// function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
//   return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
// }

// function sign(signString, accessSecret) {
// return   crypto.createHmac('sha1', accessSecret).update(new Buffer(signString, 'utf-8')).digest().toString('base64');
// }

// *
 // * Identifies a sample of bytes

// function identify(data, options, cb) {

//   const current_data = new Date();
//   const timestamp = current_data.getTime()/1000;

//   const stringToSign = buildStringToSign('POST',
//     options.endpoint,
//     options.access_key,
//     options.data_type,
//     options.signature_version,
//     timestamp);

//   const signature = sign(stringToSign, options.access_secret);

//   const formData = {
//     sample: data,
//     access_key:options.access_key,
//     data_type:options.data_type,
//     signature_version:options.signature_version,
//     signature:signature,
//     sample_bytes:data.length,
//     timestamp:timestamp,
//   }
//   request.post({
//     url: "http://"+options.host + options.endpoint,
//     method: 'POST',
//     formData: formData
//   }, cb);
// } // end identify

// const bitmap = fs.readFileSync('test_file_2.wav'); //testfile

//  identify(new Buffer(bitmap), options, function (err, httpResponse, body) {
//   // console.log("base64buffer", base64buffer)
//   if (err) console.log(err);
//   console.log(body);
//   // res.status(200).json({ song: body })
// });

} //end acrRequest
