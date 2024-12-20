require('dotenv').config();
const db = require('./config/connection');
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const path = require('path');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinaryConfig');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Creates a new instance of an Apollo server with the GraphQL schema.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
  cache: 'bounded'
});

// Set up Cloudinary storage.
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mythweaver',
    format: async (req, file) => 'png',
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage: storage });

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Cloudinary image upload endpoint.
  app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  // Serve static files from the React app
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), 'client', 'dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server.
startApolloServer();
