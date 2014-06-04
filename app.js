var ursa = require("ursa");
var fs = require('fs');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('static-favicon');
var header = '-----BEGIN PUBLIC KEY-----\n';
var ending = '\n-----END PUBLIC KEY-----\n';

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.get('/', function(req, res){
  res.send('hello world');
});

app.post('/keys', function (req, res){
	console.log(req.params);
	console.log(req.body);

	var keyToAdd = req.body.key;

	var pemKey = header + keyToAdd + ending;

	var ursaKey = ursa.createPublicKey(new Buffer(pemKey), ursa.BASE64);

	// console.log(ursaKey.toPublicPem().toString());

	var challenge = ursaKey.encrypt('hola', ursa.BASE64, ursa.BASE64, ursa.RSA_PKCS1_PADDING);
	console.log(challenge.toString('BASE64'));

	res.send(challenge.toString('BASE64'));
});

app.listen(3000);

var keypair = ursa.generatePrivateKey(1024);

// console.log(keypair.toPublicPem());

var ciphered = keypair.encrypt('hola', ursa.BASE64, ursa.BASE64);
// console.log(ciphered.toString('BASE64'));

var charSequenceChallenge = ciphered.toString('BASE64');

var deciphered = keypair.decrypt(new Buffer(charSequenceChallenge, 'BASE64'));
// console.log(deciphered.toString('utf-8'));

var pem = '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArgov0KHVYlOtS15/WIO0Hpz9NIuWQiH/9VuCqjEnsMJdZR20NsxiNCjMTjOXtl8jCGFAp8fyb5peT7Qlp4xZky6odeyFEc6Z9QInyRSVBozlRoYShefQ6JSPFaF9k+FYFN/xz0LYHZwZCW+r78dQV9ZGKBQT61El8NiriiqKq1SBZiEI7jT18J0i6H1qFVAkkZcyz3v85/yudPUC1wBFwzfk9yJ9O8bpNlGonxlDoQKXxHS8yV15dTqAAoeVysBqQk1/NiDQuEJMbrq3cfDll0scsnVec0dwIUNY9UasxrbPpwk00ce54uWjwYl/sQ+AOvKZhJXbJFEfKyFi8f2EdQIDAQAB\n-----END PUBLIC KEY-----\n';
var pem2 = '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArgov0KHVYlOtS15/WIO0\nHpz9NIuWQiH/9VuCqjEnsMJdZR20NsxiNCjMTjOXtl8jCGFAp8fyb5peT7Qlp4xZ\nky6odeyFEc6Z9QInyRSVBozlRoYShefQ6JSPFaF9k+FYFN/xz0LYHZwZCW+r78dQ\nV9ZGKBQT61El8NiriiqKq1SBZiEI7jT18J0i6H1qFVAkkZcyz3v85/yudPUC1wBF\nwzfk9yJ9O8bpNlGonxlDoQKXxHS8yV15dTqAAoeVysBqQk1/NiDQuEJMbrq3cfDl\nl0scsnVec0dwIUNY9UasxrbPpwk00ce54uWjwYl/sQ+AOvKZhJXbJFEfKyFi8f2E\ndQIDAQAB\n-----END PUBLIC KEY-----\n';
var key = ursa.createPublicKey(new Buffer(pem2));

// console.log(key.toPublicPem());
