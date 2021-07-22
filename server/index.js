require('dotenv/config');
const express = require('express');
const pg = require('pg');
const jsonMiddleWare = express.json();
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(staticMiddleware);
app.use(jsonMiddleWare);

app.get('/api/feed', (req, res) => {
  const sql = `
  select
      "postId",
      "gamerTag",
      "description"
      from "posts"
      join "users" using ("userId");
  `;

  db.query(sql)
    .then(result => {
      // console.log('db results :', result);
      const posts = result.rows;

      res.json(posts);

    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
