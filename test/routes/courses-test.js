process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let datastore = require('../../models/courses');
chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Courses', function (){
    beforeEach(function(done){
        var newData=new datastore({
            name:"math",
            type:"P",
            size:16,
            room:"A01",
            time:9.15
        });
        newData.save(function(err){
            done();
        });
    });
    describe('GET /courses',  () => {
        it('should return all the courses in an array', function(done) {
            chai.request(server)
                .get('/courses')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (course) => {
                        return { name: course.name,
                            type: course.type }
                    });
                    expect(result).to.include( { name: "math", type: "P"  } );
                    // expect(result).to.include( { name: "english", type: "P"  } );
                    datastore.collection.drop();
                    done();
                });

        });
    });
    describe('POST /courses', function () {
        it('should return confirmation message and update datastore', function(done) {
            let course = {
                name: "chinese" ,
                type: "p",
                size: 20,
                room:"A03",
                time:10.15
            };
            chai.request(server)
                .post('/courses')
                .send(course)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Course Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/courses')
                .end(function(err, res) {
                    let result = _.map(res.body, (course) => {
                        return { name: course.name,
                            size: course.size };
                    }  );
                    expect(result).to.include( { name: 'chinese', size: 20  } );
                    datastore.collection.drop();
                    done();
                });
        });
    });
    describe('PUT /courses/:id/size', () => {
        it('should return a message and the course increment size by 1', function(done) {
            chai.request(server)
                .get('/courses')
                .end(function(err,res){
                    chai.request(server)
                        .put('/courses/'+res.body[0]._id+'/size')
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            let course = res.body.data ;
                            expect(course).to.include( { name: "math", size: 17  } );
                            datastore.collection.drop();
                            done();
                        });
                })

        });
        it('should return a 404 and a message for invalid donation id', function(done) {
            chai.request(server)
                .put('/courses/1100001/size')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Course NOT Found!' ) ;
                    datastore.collection.drop();
                    done();
                });
        });
    });
    describe('DELETE /courses/:id',() => {
        describe('valid delete',() =>
        {
            it('should delete a course', function (done) {
                chai.request(server)
                    .get('/courses')
                    .end(function(err,res){
                        chai.request(server)
                            .delete('/courses/'+res.body[0]._id)
                            .end(function (err, res) {
                                expect(res).to.have.status(200);
                                expect(res.body).to.have.property('message', 'Course Successfully Deleted!');
                                done();
                            });
                    })

            });
            after(function (done){
                chai.request(server)
                    .get('/courses')
                    .end(function(err,res){
                        let result=_.map(res.body,(course)=>{
                            return{name:course.name};
                        });
                        // if(res.status===200){
                        expect(result).to.not.include({name:"math"});

                        // }else if(res.status===404){
                        //     expect(result).to.include({id: "5bc7465912e3eb0c7aae835f"});
                        // }
                        done();
                    });
            });
        });
        describe('invalid delete',() => {
            it('should return a 404 and a message for invalid course id', function (done) {
                chai.request(server)
                    .delete('/courses/1000004')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message', 'Course NOT DELETED!');
                        datastore.collection.drop();
                        done();
                    });
            });
        });
    });
});