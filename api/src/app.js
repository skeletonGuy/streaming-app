const express = require('express');
const cors = require('cors');
const path = require('node:path');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 3000;
const authDomain = process.env.AUTH0_DOMAIN;
const authIdentifier = process.env.AUTH0_IDENTIFIER;

const checkJwt = auth({
  audience: authIdentifier,
  issuerBaseURL: `http://${authDomain}`,
});

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api/key/:file', checkJwt, (req, res) => {
  const file = req.params.file;
  const filePath = path.join('/keys', file);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send('error serving file');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});