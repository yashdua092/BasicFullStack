const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// will create a mongodb client to connect to mongodb server
const { MongoClient } = require('mongodb') // mongodb, a nodejs library has all the code inside that knows how to talk to mongodb
// importing functions from validator.js to check if email, payload etc valid
const myFuncs = require('./validator') // list of funcs


// to connect to database (backend talks to database), need to tell where database is(url)
// client which is a mongoclient uses this url to talk to database.
const url = 'mongodb://localhost:27017' // mongodb protocol which client uses to talk to mongodb and where that is running
const client = new MongoClient(url) // creates a new client object that talk to Mongo server on the url provided
// we use the client object and its methods to connect and interact with server basically

const dbName = 'company_db' // database name
const colName = 'employees' // collection name in database

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist')) // all frontend inside dist, after running npm run build

app.get('/get-profile', async function(req, res) {

    // const response = {}

    // connect to database
    // 1. will use client to connect
    await client.connect() // connect async function
    console.log("connected successfully to server")

    // initiating a database(if not there create one) or if already have start it or to switch.
    const db = client.db(dbName)
    const collection = db.collection(colName) // create the collection if not there and return or simply return.

    // get data from database to get profile data to show on frontend.
    const result = await collection.findOne({id: 1})
    // result could be null if db is empty.
    console.log(result)
    client.close()
    // now cam send the result as it is or just what we want
    response = {}
    if( result != null) {
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
        }
    }

    res.send(response)


    // if(result === null) {
    //     res.send({})
    // } else{
    //     const response = {
    //         name: result.name,
    //         email: result.email,
    //         interests: result.interests
    //     }
    //     res.send(response)
    // }
    
})

app.post('/update-profile', async function(req, res) {
    const payload = req.body
    console.log(payload)

/*
    // connect to mongodb database
    await client.connect() // connect async function
    console.log("connected successfully to server")

    // initiating a database(if not there create one) or if already have start it or to switch.
    const db = client.db(dbName)
    const collection = db.collection(colName) // create the collection if not there and return or simply return.

    // saving payload data in database
    await collection.insertOne({_id: 1}) // inserting one document in this collection.
    await collection.insertOne({_id: 2})

*/

    if ( myFuncs.isEmptyPayload(payload) || myFuncs.isInvalidEmail(payload)) {
        res.status(404).send({error: "empty payload. Couldn't update"})
    }else {
        // connect to mongodb database
        await client.connect() // connect async function
        console.log("connected successfully to server")

        // initiating a database(if not there create one) or if already have start it or to switch.
        const db = client.db(dbName)
        const collection = db.collection(colName) // create the collection if not there and return or simply return.

        // save the payload data to db

        // need to provide the id to the playload to add it.
        payload['id'] = 1
        // creating a new var to handle updated value
        const updatedValues = { $set: payload }
        await collection.updateOne({id: 1}, updatedValues, {upsert: true}) // payload itself is an object to which id is provided above
        // upsert tells that if no data to update just create one. Basically can be used to create or insertOne if not there already
        client.close()

        res.send({info: "user profile data updated successfully"})
    }
})

app.listen(3000, function () {
    console.log("app on port 3000")
})