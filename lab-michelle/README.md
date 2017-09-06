your README.md should include detailed instructions on how to use your API
Feature Tasks
create a single resource express API that can handle GET, POST, PUT, and DELETE requests
use the http-errors module to create new errors and associate them with a proper status code
create an error-middleware module to handle errors and use it in your server file
create a cors-middleware module that will allow for public use of your API
create the destroy and fetchAll methods and add them to your storage module
these methods should be used to delete a resource (destroy) and return an array of id's from persisted resource filenames (fetchAll)
create the updateNote, deleteNote, and allNotes static methods as part of your Note model
create a series of note-route-tests to test your GET, POST, PUT, and DELETE routes
hint: you'll want to use the beforeAll or beforeEach and afterAll or afterEach hooks provided by jest in order to create a test note and delete the note after the test has completed
