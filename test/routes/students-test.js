process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let datastore = require('../../models/students');
chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));
let mongoose = require('mongoose');

describe('Students', function (){
    beforeEach(function(done){
        var newData=new datastore({
            name:"Abby",
            gender:"female",
            age:18,
            college:"Business",
            courses_id:[mongoose.Types.ObjectId("5bc4f5d582a78003ce4dc30e"),mongoose.Types.ObjectId("5bc4f61282a78003ce4dc30f")]
        });
        newData.save(function(err){
            done();
        });
    });
    describe('GET /students',  () => {
        it('should return all the students in an array', function(done) {
            chai.request(server)
                .get('/students')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (course) => {
                        return { name: course.name,
                            age: course.age }
                    });
                    expect(result).to.include( { name: "Abby", age: 18  } );
                    // expect(result).to.include( { name: "english", type: "P"  } );
                    datastore.collection.drop();
                    done();
                });

        });
    });
});