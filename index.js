require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors(
  {
    origin : ['http://localhost:5173'],
    credentials:true
  }
));
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
    app.post('/foods',async(req,res)=>{
      const food = req.body
      const result = await foodsCollection.insertOne(food);
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
