const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const typeDefs = require('./schema');   // ✅ Import Schema
const resolvers = require('./resolvers');  // ✅ Import Resolvers

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(' MongoDB Connected');
    } catch (error) {
        console.error(`❌ Error: Unable to connect to DB - ${error.message}`);
        process.exit(1);
    }
};


const app = express();
app.use(express.json());
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    await connectDB();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
