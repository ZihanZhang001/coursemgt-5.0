process.env.NODE_ENV = 'development';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let datastore = require('../../models/courses');
chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Courses', function (){
    describe('GET /courses',  () => {
        it('should return all the courses in an array', function(done) {
            chai.request(server)
                .get('/courses')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(4);
                    let result = _.map(res.body, (course) => {
                        return { name: course.name,
                            type: course.type }
                    });
                    expect(result).to.include( { name: "math", type: "P"  } );
                    // expect(result).to.include( { name: "english", type: "P"  } );

                    done();
                });

        });
    });
    
});