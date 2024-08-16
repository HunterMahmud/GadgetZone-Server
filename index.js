const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      //   "",
      //   "",
      //other links will be here
    ],
    credentials: true,
  })
);

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9wkdqn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const productCollection = client.db("gadgetDB").collection("products");

    //----------------------------------------------------
    //----------------------------------------------------

    // app.get("/products", async (req, res) => {
    //   try {
    //     const result = await productCollection.find({}).toArray();
    //     res.send(result);
    //   } catch (err) {
    //     res.status(500).send({ message: "internal Server Error" });
    //   }
    // });
    app.get("/products", async (req, res) => {
      try {
        const {
          searchTerm,
          category,
          brand,
          minPrice,
          maxPrice,
          sort,
          page = 1,
          limit = 8,
        } = req.query;

        const query = {};
        // console.log("maxp: ",maxPrice, " Minp: ", minPrice);
        if (searchTerm) {
          query.ProductName = { $regex: searchTerm, $options: "i" };
        }
        if (category) {
          query.Category = category;
        }
        if (brand) {
          query.Brand = brand;
        }
        if (minPrice && maxPrice) {
          query.Price = {
            $gte: parseFloat(minPrice),
            $lte: parseFloat(maxPrice),
          };
        }
        console.log(query);
        let sortQuery = {};
        if (sort === "priceLowToHigh") {
          sortQuery.Price = 1;
        } else if (sort === "priceHighToLow") {
          sortQuery.Price = -1;
        } else if (sort === "newestFirst") {
          sortQuery.CreationDate = -1;
        }

        const options = {
          sort: sortQuery,
          skip: (page - 1) * limit,
          limit: parseInt(limit),
        };

        const products = await productCollection.find(query, options).toArray();
        const totalProducts = await productCollection.countDocuments(query);

        res.send({
          products,
          totalPages: Math.ceil(totalProducts / limit),
          currentPage: parseInt(page),
        });
      } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    // Assuming you already have a MongoDB collection for products

    app.get("/categories", async (req, res) => {
      try {
        const categories = await productCollection.distinct("Category");
        res.send(categories);
      } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    app.get("/brands", async (req, res) => {
      try {
        const brands = await productCollection.distinct("Brand");
        res.send(brands);
      } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("gadgetzone server is running...");
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
