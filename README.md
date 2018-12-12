# Assignment 2 - Web API - Automated development process.

Name: Zihan Zhang

## Overview.

This project's API is standard RESTful, it includes: GET, PUT, POST and DELETE.

## API endpoints.

 + GET /courses - Get all courses.
 + GET /courses/:id - Get one course by id.
 + POST /courses - Add a new course
 + PUT /courses/:id/size - Increase size of a course.
 + DELETE /courses/:id - Delete one course.
 + 
 + GET /teachers - Get all teachers.
 + GET /teachers/:id - Get one teacher by id.
 + GET /teachers/courses /:id - Get all courses teached by a teacher by using populate function.
 + POST /teachers/ - Add a new teacher.
 + DELETE /teachers/:id - Delete one teacher.
 + 
 + GET /students - Get all students.
 + GET /students/:id - Get one student by id.
 + GET /students/fuzzystudent/:keyword - Get Find students by fuzzysearch.
 + GET /students/courses /:id - Get all courses learned by a student by using populate function.
 + POST /students/ - Add a new student.
 + PUT /students/:id/age - Increase age of a student.
 + DELETE /students/:id - Delete one student.

## Continuous Integration and Test results.

URL of the Travis build page for web API:

https://travis-ci.org/ZihanZhang001/coursemgt-5.0

Test results:

        GET /teachers
    (node:4634) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
        ✓ should return all the teachers in an array (69ms)
        GET /teachers/:id
        ✓ should return one teacher in an array (40ms)
        GET /teachers/courses/:id
        ✓ should return reference courses teached by a teacher in an array (79ms)
        POST /teachers
        ✓ should return confirmation message and update datastore (48ms)
        DELETE /teachers/:id
        valid delete
    (node:4634) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
            ✓ should delete a teacher (74ms)
        invalid delete
            ✓ should return a 404 and a message for invalid teacher id
    6 passing (3s)
    =============================== Coverage summary ===============================
    Statements   : 55.91% ( 142/254 )
    Branches     : 14% ( 7/50 )
    Functions    : 22.73% ( 10/44 )
    Lines        : 55.91% ( 142/254 )
    ================================================================================
    The command "npm run coverage" exited with 0.
    after_success
    2.02s$ npm run publish-coverage
    > coursemgt-1.0@0.0.0 publish-coverage /home/travis/build/ZihanZhang001/coursemgt-5.0
    > nyc report --reporter=text-lcov | coveralls
    Done. Your build exited with 0.


URL of published test coverage results on Coveralls: 

https://coveralls.io/github/ZihanZhang001/coursemgt-5.0


## Extra features.
I have used Build automation and Continuous Integration.

