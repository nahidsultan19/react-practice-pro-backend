const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// E1K8EVTulaURuniB



const uri = "mongodb+srv://nahid:E1K8EVTulaURuniB@cluster0.tyhvkrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const productsCollection = client.db("productCollection").collection('electronics');

    app.post('/product',async(req, res)=>{
        const product = req.body;
        console.log(product);
        const result = await productsCollection.insertOne(product);
        res.send(result);
    });

    app.get('/products', async(req,res)=>{
      const query = {};
      const products = await productsCollection.find(query);
      const result = await products.toArray()
      res.send(result);

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req, res)=>{
    res.send('node server is running');
})


app.listen(port,()=>{
    console.log(`node server is running on port, ${port}`)
})
