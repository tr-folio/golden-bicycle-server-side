const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const products = [
    {
        id: 1,
        name: 'City Bike',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        img: 'https://i.ibb.co/dKycf1w/robert-bye-t-G36rv-Ceqng-unsplash.jpg'
    },
    {
        id: 2,
        name: 'Road Bike',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        img: 'https://i.ibb.co/dKycf1w/robert-bye-t-G36rv-Ceqng-unsplash.jpg'
    },
    {
        id: 3,
        name: 'Touring Bike',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        img: 'https://i.ibb.co/dKycf1w/robert-bye-t-G36rv-Ceqng-unsplash.jpg'
    },
    {
        id: 4,
        name: 'Fitness Bike',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        img: 'https://i.ibb.co/dKycf1w/robert-bye-t-G36rv-Ceqng-unsplash.jpg'
    },
    {
        id: 5,
        name: 'Hybrid Bike',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        img: 'https://i.ibb.co/dKycf1w/robert-bye-t-G36rv-Ceqng-unsplash.jpg'
    },
    {
        id: 6,
        name: 'Mountain Bike',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        img: 'https://i.ibb.co/dKycf1w/robert-bye-t-G36rv-Ceqng-unsplash.jpg'
    }
]

// mongodb local database server connection
const uri = 'mongodb://127.0.0.1:27017'; // 127.0.0.1 = localhost
// const uri = 'mongodb://localhost:27017'; // 127.0.0.1 = localhost
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connected successfully');

        // GET method for products API
        app.get('/readproducts', (req, res) => {
            res.send(products);
        });
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

// mongodb atlas database server connection
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.budis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function run() {
//     try {
//         await client.connect();
//         console.log('database connected successfully');
//     }
//     finally {
//         await client.close();
//     }
// }

// run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running doctors portal server');
});

app.listen(port, () => {
    console.log(`Doctors portal app listening at http://localhost:${port}`);
});