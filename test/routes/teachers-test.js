process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http' ;
// import server from '../../bin/www';
var server = null ;
let expect = chai.expect;
// import datastore from '../../models/teachers';
var datastore = null ;
// import cor from '../../models/courses';
var cor = null ;
chai.use(chaiHttp);
import _ from 'lodash';
import things from 'chai-things'
chai.use( things);
let mongoose = require('mongoose');

describe('Teachers', function (){
    before(function(){
        delete require.cache[require.resolve('../../bin/www')];
        delete require.cache[require.resolve('../../models/teachers')];
        delete require.cache[require.resolve('../../models/courses')];
        datastore = require('../../models/teachers');
        cor = require('../../models/courses');
        server = require('../../bin/www');
    });
    after(function (done) {
        server.close(done);
    });
    beforeEach(function(done){
        var newData=new datastore({
            _id:mongoose.Types.ObjectId("5bce37ee9f5b4f90ef56d037"),
            name:"David",
            gender:"male",
            courses_id:mongoose.Types.ObjectId("5bc4f5d582a78003ce4dc30e")
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
    describe('GET /teachers',  () => {
        it('should return all the teachers in an array', function(done) {
            chai.request(server)
                .get('/teachers')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (teacher) => {
                        return { name: teacher.name }
                    });
                    expect(result).to.include( { name: "David" } );
                    // expect(result).to.include( { name: "english", type: "P"  } );
                    datastore.collection.drop();
                    cor.collection.drop();
                    done();
                });

        });
    });
    describe('GET /teachers/:id',  () => {
        it('should return one teacher in an array', function(done) {
            chai.request(server)
                .get('/teachers/5bce37ee9f5b4f90ef56d037')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (teacher) => {
                        return { name: teacher.name }
                    });
                    expect(result).to.include( { name: "David" } );
                    // expect(result).to.include( { name: "english", type: "P"  } );
                    datastore.collection.drop();
                    cor.collection.drop();
                    done();
                });

        });
    });
    describe('GET /teachers/courses/:id',  () => {
        it('should return reference courses teached by a teacher in an array', function(done) {
            chai.request(server)
                .get('/teachers/courses/5bce37ee9f5b4f90ef56d037')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('David teaches math ,' );
                    datastore.collection.drop();
                    cor.collection.drop();
                    done();
                });

        });
    });
    describe('POST /teachers', function () {
        it('should return confirmation message and update datastore', function(done) {
            let teacher = {
                name: "Dali" ,
                gender: "male",
                courses_id: mongoose.Types.ObjectId("5bc4f61282a78003ce4dc30f")
            };
            chai.request(server)
                .post('/teachers')
                .send(teacher)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Teacher Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/teachers')
                .end(function(err, res) {
                    let result = _.map(res.body, (teacher) => {
                        return { name: teacher.name };
                    }  );
                    expect(result).to.include( { name: 'Dali'} );
                    datastore.collection.drop();
                    cor.collection.drop();
                    done();
                });
        });
    });
    describe('DELETE /teachers/:id',() => {
        describe('valid delete',() =>
        {
            it('should delete a teacher', function (done) {
                chai.request(server)
                    .get('/teachers')
                    .end(function(err,res){
                        chai.request(server)
                            .delete('/teachers/'+res.body[0]._id)
                            .end(function (err, res) {
                                expect(res).to.have.status(200);
                                expect(res.body).to.have.property('message', 'Teacher Successfully Deleted!');
                                done();
                            });
                    })

            });
            after(function (done){
                chai.request(server)
                    .get('/teachers')
                    .end(function(err,res){
                        let result=_.map(res.body,(teacher)=>{
                            return{name:teacher.name};
                        });
                        // if(res.status===200){
                        expect(result).to.not.include({name:"David"});

                        // }else if(res.status===404){
                        //     expect(result).to.include({id: "5bc7465912e3eb0c7aae835f"});
                        // }
                        done();
                    });
            });
        });
        describe('invalid delete',() => {
            it('should return a 404 and a message for invalid teacher id', function (done) {
                chai.request(server)
                    .delete('/teachers/1000004')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message', 'Teacher NOT DELETED!');
                        datastore.collection.drop();
                        cor.collection.drop();
                        done();
                    });
            });
        });
    });
});
