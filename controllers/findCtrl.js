//code from
//https://github.com/acrcloud/webapi_example/blob/master/identify%20protocol%201%20(recommended)/IdentifyProtocolV1.js




const url = require('url');
const fs = require('fs');
const crypto = require('crypto');
const request = require('request');
const { ACR_ACCESS_ACCOUNT, ACR_SECRET_KEY, ACR_HOST } = require('../acr_auth')



console.log("host", ACR_HOST)

// module.exports.acrRequest = ( { params: { sample64 } },res,err ) => {


const options = {
  host: ACR_HOST ,
  endpoint: '/v1/identify',
  signature_version: '1',
  data_type:'audio',
  secure: true,
  access_key: ACR_ACCESS_ACCOUNT,
  access_secret: ACR_SECRET_KEY
};

function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
}

function sign(signString, accessSecret) {
  return crypto.createHmac('sha1',accessSecret).update(new Buffer(signString, 'utf-8')).digest('hex').toString('base64');
  // crypto.createHmac('sha256', accessSecret)
  //   .update(new Buffer(signString, 'utf-8'))
  //   .digest().toString('base64');
}

/**
 * Identifies a sample of bytes
 */
function identify(data, options, cb) {

  const current_data = new Date();
  const timestamp = current_data.getTime()/1000;

  const stringToSign = buildStringToSign('POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp);

  const signature = sign(stringToSign, options.access_secret);

  const formData = {
    sample: data,
    access_key:options.access_key,
    data_type:options.data_type,
    signature_version:options.signature_version,
    signature:signature,
    sample_bytes:data.length,
    timestamp:timestamp,
  }
  request.post({
    url: "http://"+options.host + options.endpoint,
    method: 'POST',
    formData: formData
  }, cb);
} // end identify

const bitmap = fs.readFileSync('magic.m4a');

 identify(new Buffer(bitmap), options, function (err, httpResponse, body) {
  if (err) console.log(err);
  console.log(body);
  // res.status(200).json({ song: body })
});

// } //end acrRequest