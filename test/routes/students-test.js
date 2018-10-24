process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let datastore = require('../../models/students');
let cor = require('../../models/courses');
chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));
let mongoose = require('mongoose');

describe('Students', function (){
    beforeEach(function(done){
        var newData=new datastore({
            _id:mongoose.Types.ObjectId("5bc50b7bc6fff5975531bdb9"),
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
    beforeEach(function(done){
        var newCor=new cor({
            _id:mongoose.Types.ObjectId("5bc4f5d582a78003ce4dc30e"),
            name:"math",

        });
        newCor.save(function(err){
            done();
        });
    });
    beforeEach(function(done){
        var newCor1=new cor({
            _id:mongoose.Types.ObjectId("5bc4f61282a78003ce4dc30f"),
            name:"english",

        });
        newCor1.save(function(err){
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
                    let result = _.map(res.body, (students) => {
                        return { name: students.name,
                            age: students.age }
                    });
                    expect(result).to.include( { name: "Abby", age: 18  } );
                    // expect(result).to.include( { name: "english", type: "P"  } );
                    datastore.collection.drop();
                    done();
                });

        });
    });
    describe('GET /students/:id',  () => {
        it('should return one student in an array', function(done) {
            chai.request(server)
                .get('/students/5bc50b7bc6fff5975531bdb9')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (student) => {
                        return { name: student.name }
                    });
                    expect(result).to.include( { name: "Abby" } );
                    // expect(result).to.include( { name: "english", type: "P"  } );
                    datastore.collection.drop();
                    cor.collection.drop();
                    done();
                });

        });
    });
    describe('GET /students/courses/:id',  () => {
        it('should return reference courses taked by a student in an array', function(done) {
            chai.request(server)
                .get('/students/courses/5bc50b7bc6fff5975531bdb9')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Abby studys math ,english ,' );
                    datastore.collection.drop();
                    cor.collection.drop();
                    done();
                });

        });
    });
    describe('GET /students/fuzzystudent/:keyword',  () => {
        it('should return a student in an array by fuzzy search', function(done) {
            chai.request(server)
                .get('/students/fuzzystudent/ab')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let result = _.map(res.body, (student) => {
                        return { name: student.name,
                            age: student.age }
                    });
                    expect(result).to.include( { name: "Abby", age: 18  } );                    datastore.collection.drop();
                    cor.collection.drop();
                    done();
                });

        });
    });
    describe('POST /students', function () {
        it('should return confirmation message and update datastore', function(done) {
            let student = {
                name: "Wang" ,
                gender: "male",
                age:19,
                college:"Business",
                courses_id: [mongoose.Types.ObjectId("5bc4f61282a78003ce4dc30f"),mongoose.Types.ObjectId("5bc4f61e82a78003ce4dc310")]
            };
            chai.request(server)
                .post('/students')
                .send(student)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Student Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/students')
                .end(function(err, res) {
                    let result = _.map(res.body, (student) => {
                        return { name: student.name };
                    }  );
                    expect(result).to.include( { name: 'Wang'} );
                    datastore.collection.drop();
                    done();
                });
        });
    });
    describe('PUT /students/:id/age', () => {
        it('should return a message and the student increment age by 1', function(done) {
            chai.request(server)
                .get('/students')
                .end(function(err,res){
                    chai.request(server)
                        .put('/students/'+res.body[0]._id+'/age')
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            let student = res.body.data ;
                            expect(student).to.include( { name: "Abby", age: 19  } );
                            datastore.collection.drop();
                            done();
                        });
                })

        });
        it('should return a 404 and a message for invalid student id', function(done) {
            chai.request(server)
                .put('/students/1100001/age')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Student NOT Found!' ) ;
                    datastore.collection.drop();
                    done();
                });
        });
    });
    describe('DELETE /students/:id',() => {
        describe('valid delete',() =>
        {
            it('should delete a student', function (done) {
                chai.request(server)
                    .get('/students')
                    .end(function(err,res){
                        chai.request(server)
                            .delete('/students/'+res.body[0]._id)
                            .end(function (err, res) {
                                expect(res).to.have.status(200);
                                expect(res.body).to.have.property('message', 'Student Successfully Deleted!');
                                done();
                            });
                    })

            });
            after(function (done){
                chai.request(server)
                    .get('/students')
                    .end(function(err,res){
                        let result=_.map(res.body,(student)=>{
                            return{name:student.name};
                        });
                        // if(res.status===200){
                        expect(result).to.not.include({name:"Abby"});

                        // }else if(res.status===404){
                        //     expect(result).to.include({id: "5bc7465912e3eb0c7aae835f"});
                        // }
                        done();
                    });
            });
        });
        describe('invalid delete',() => {
            it('should return a 404 and a message for invalid student id', function (done) {
                chai.request(server)
                    .delete('/students/1000004')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message', 'Student NOT DELETED!');
                        datastore.collection.drop();
                        done();
                    });
            });
        });
    });
});