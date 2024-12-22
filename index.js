require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qo68l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const foodsCollection = client.db("foodsDB").collection("foods");

    // food related apis
    app.post("/foods", async (req, res) => {
      const food = req.body;
      const result = await foodsCollection.insertOne(food);
      res.send(result);
    });
    app.get("/foods", async (req, res) => {
      const status = req.query.status || "available";
      const search = req.query?.search;
      const sort = req.query?.sort;

      const query = { status };
      if (search) {
        query.food_name = {
          $regex: search,
          $options: "i",
        };
      }
      const options = {};
      if (sort) {
        options.sort = { expired_date: sort === "asc" ? 1 : -1 };
      }

      const result = await foodsCollection.find(query, options).toArray();
      res.send(result);
    });

    app.get('/foods/:id',async(req,res)=>{
      const id = req.params.id
      const query = {
        _id : new ObjectId(id)
      }
      const result = await foodsCollection.findOne(query)
      res.send(result)
    })

    app.get('/myFoods/:email', async(req,res)=>{
      const email = req.params.email
      const query ={donator_email:email}
      const result = await foodsCollection.find(query).toArray()
      res.send(result)
    })
    
    app.get('/foodRequests/:email',async(req,res)=>{
      const email = req.params.email
      const query ={
        donee_email: email
      }
      const result = await foodsCollection.find(query).toArray()
      res.send(result)
    })

    app.patch('/foods/:id',async(req,res)=>{
      const id = req.params.id
      const status=req.body.status
      const donee_email=req.body.donee_email
      const additional_notes=req.body.additional_notes
      const requested_time=req.body.requested_time
      const query={
        _id: new ObjectId(id)
      }
      const updatedDoc = {
        $set:{
            status , requested_time,additional_notes,donee_email
        }
      }
      const result = await foodsCollection.updateOne(query,updatedDoc)
      res.send(result)
    })

    app.put('/food/:id', async(req,res)=>{
      const id= req.params.id
    const query = {_id : new ObjectId(id)}
    const foodData = req.body
    const updatedData = {
       $set:foodData
    }
    const result = await foodsCollection.updateOne(query,updatedData)
    res.send(result)
    })

    app.delete('/foods/:id', async(req,res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await foodsCollection.deleteOne(query)
      res.send(result)
    })
     


    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Meal Bridge server is running");
});

app.listen(port, () => {
  console.log(`meal-bridge Server is running at port: ${port}`);
});
