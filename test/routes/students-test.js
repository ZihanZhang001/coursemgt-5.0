process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let datastore = require('../../models/students');
chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Students', function (){

});