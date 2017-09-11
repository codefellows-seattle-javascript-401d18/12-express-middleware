# __Toy Party__
___
 Allows a user to track the consumerism of their children through toy purchase and eventual toy destruction.
___

## Installation:

* Fork and clone the repository!

* Install the Node dependencies using
`npm i` within your terminal!

* Run the MongoDB database using `mongod --dbpath ./data/db`, the Mongoose environment `mongo`, and an instance of the server `npm run start:watch`

* Using the HTTP client of your choice (I used httpie!) use GET, POST, PUT, and DELETE requests to interact with data.  

## Usage:

`http POST localhost:3000/api/toy name=kewpie desc=possessed` allows you to add a terrifying doll to your collection

`http PUT localhost:3000/api/toy _id =previous_id name=kewpie desc=exorcised` allows you to solve a variety of problems using a previously provided toy id

`http GET localhost:3000/api/toy/previous_id` allows you to check on the status of your toy using the previously provided id, giving you the name, description, and id of an existent toy

`http DELETE localhost:3000/api/toy/previous_id` allows you to delete your friend once and for all.


### Built With:
* [MongoDB](https://www.mongodb.com/)
* [Node.js](https://nodejs.org/en/)
* [express](https://www.npmjs.com/package/express)
* [mongoose](http://mongoosejs.com/)
* [superagent](https://visionmedia.github.io/superagent/)
* [faker](https://www.npmjs.com/package/faker)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [uuid](https://www.npmjs.com/package/uuid)
