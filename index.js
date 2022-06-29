const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors({
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
}))
app.use(express.json())
require('dotenv').config()
const port = process.env.PORT || 5000

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3s80f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect();
    const productCollection = client.db("mango_jelly").collection('allPhone');




    app.get('/products', async (req, res) => {
      const result = await productCollection.find().toArray()
      res.send(result)

    })
    app.delete('/product/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await productCollection.deleteOne(query)
      res.send(result)
    })
    app.put('/product/:id', async (req, res) => {
      const id = req.params.id
      const updateproduct = req.body
      const filter = { _id: ObjectId(id) }
      const option = { upsert: true }
      const updatedoc = {
 
        $set: {
         brand:updateproduct.brand,
         phone_name:updateproduct.pname,
         description:updateproduct.desc,
         display:updateproduct.display,
         storage:updateproduct.storage,
         ram:updateproduct.ram

        }
      }
      const result = await productCollection.updateOne(filter, updatedoc, option)
      res.send(result)

    })
    app.post('/addProduct',async(req,res)=>{
      const newProduct=req.body
      const result=await productCollection.insertOne(newProduct)
      console.log(newProduct);
      res.send(result)
  
  })


  } finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Welcome to mango jelly server ')
})

app.listen(port, () => {
  console.log(`Welcome to  port ${port}`)
})