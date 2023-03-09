const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());;



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@complete-projects.f8rypku.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{

        // database collection
        const projectsCollection = client.db("portfolio").collection("projects");
        const contactsCollection = client.db("portfolio").collection("contacts");


        // get request for all the projects name
        app.get("/projects", async(req, res) => {
            const query = {};
            const projects =await projectsCollection.find(query).toArray();
            res.send(projects);
        });

        // get request for individual project
        app.get("/projects/:id", async(req, res) => {
            const id = req.params.id;
            const query = {_id : new ObjectId(id)};
            const project = await projectsCollection.findOne(query);
            res.send(project);
        })

    }

    finally{

    }
};

run().catch(err => console.error(err))


app.get("/", (req, res) => {
    res.send("Application running");
})


app.listen(port, (req, res) => {
    console.log(`portfolio server is listening ${port}`)
});