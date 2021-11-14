const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb local database server connection
const uri = 'mongodb://127.0.0.1:27017'; // 127.0.0.1 = localhost
// const uri = 'mongodb://localhost:27017'; // 127.0.0.1 = localhost
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// mongodb atlas database server connection
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.budis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connected successfully');
        // const database = client.db('golden_bicycle');
        // const productsCollection = database.collection('products');

        // special GET method to make admin
        // app.get('/makeDefaultAdmin', async (req, res) => {
        //     await client.connect();
        //     console.log('database connected successfully');
        //     const database = client.db('golden_bicycle');
        //     const usersCollection = database.collection('users');
        //     const result = await usersCollection.update({'email': 'admin@admin.com'}, {$set: {'role': 'admin'}});
        //     res.send(result);
        // })

        // GET method for products API
        app.get('/readproducts', async (req, res) => {
            await client.connect();
            console.log('database connected successfully');
            const database = client.db('golden_bicycle');
            const productsCollection = database.collection('products');
            const result = await productsCollection.find().toArray();
            res.send(result);
        });

        // GET method for limitted products API
        app.get('/readLimittedProducts/:limit', async (req, res) => {
            await client.connect();
            console.log('database connected successfully');
            const database = client.db('golden_bicycle');
            const productsCollection = database.collection('products');
            const result = await productsCollection.find().toArray();
            const limit = req.params.limit;
            // console.log(limit);
            const limittedProducts = [];
            for (let i = 0; i < limit; i++) {
                limittedProducts.push(result[i]);
            }
            res.send(limittedProducts);
        });

        // GET method for reviews API
        app.get('/readreviews', async (req, res) => {
            await client.connect();
            console.log('database connected successfully');
            const database = client.db('golden_bicycle');
            const reviewsCollection = database.collection('reviews');
            const result = await reviewsCollection.find().toArray();
            res.send(result);
        });

        // GET method to retrieve single product
        app.get('/readSingleProduct/:id', async (req, res) => {
            await client.connect();
            console.log('database connected successfully');
            const database = client.db('golden_bicycle');
            const productsCollection = database.collection('products');
            const id = req.params.id;
            // console.log(id);
            const result = await productsCollection.find().toArray();
            // console.log(result);
            let selectedProduct = [];
            for (let i = 0; i < result.length; i++) {
                if (result[i].id == id) {
                    // console.log(result[i]);
                    selectedProduct.push(result[i]);
                }
            }
            res.send(selectedProduct);
        });

        // GET method to retrieve users
        app.get('/checkAdmin/:email', async (req, res) => {
            await client.connect();
            console.log('database connected successfully');
            const database = client.db('golden_bicycle');
            const usersCollection = database.collection('users');
            const email = req.params.email;
            const query = {email: email};
            const result = await usersCollection.findOne(query);
            let isAdmin = false;
            if (result.role === 'admin') {
                isAdmin = true;
            }
            res.json({admin: isAdmin});
        })

        // POST method to create users
        app.post('/postusers', async (req, res) => {
            await client.connect();
            console.log('database connected successfully');
            const database = client.db('golden_bicycle');
            const usersCollection = database.collection('users');
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            // console.log(result);
            res.json(result);
        });

        // POST method to place orders
        app.post('/placeOrders', async (req, res) => {
            await client.connect();
            console.log('database connected successfully');
            const database = client.db('golden_bicycle');
            const ordersCollection = database.collection('orders');
            const order = req.body;
            // console.log(order);
            const result = await ordersCollection.insertOne(order);
            res.json(result);
        })
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running golden bicycle server');
});

app.listen(port, () => {
    console.log(`golden bicycle app listening at http://localhost:${port}`);
});