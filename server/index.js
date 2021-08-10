require('dotenv/config');
// const { parse } = require('dotenv');
const express = require('express');
const pg = require('pg');
const jsonMiddleWare = express.json();
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');

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

// feed
app.get('/api/feed', (req, res, next) => {
  const sql = `
  select
      "postId",
      "gamerTag",
      "photo",
      "userId",
      "description"
      from "posts"
      join "users" using ("userId")
      order by "postId" desc;

  `;

  db.query(sql)
    .then(result => {
      const posts = result.rows;
      res.json(posts);
    });
});

// get for users profiles
app.get('/api/profile/:userId', (req, res, next) => {
  const id = parseInt(req.params.userId);

  if (!id) {
    throw new ClientError(400, 'productId must be a positive integer');
  }

  const sql = `
  select
      "postId",
      "gamerTag",
      "photo",
      "userId",
      "description"
      from "posts"
      join "users" using ("userId")
      where "userId" = $1;
  `;

  const params = [id];

  db.query(sql, params)
    .then(result => {
      const posts = result.rows;
      res.json(posts);
    });
});

// liveSeach
app.get('/api/feed/search', (req, res, next) => {
  const sql = `
  select
      "gamerTag",
      "firstName",
      "userId"
      from "users";
  `;

  db.query(sql)
    .then(result => {
      const posts = result.rows;

      res.json(posts);
    });
});

// user profile
app.get('/api/feed/profile', (req, res, next) => {
  const sql = `
  select
      "postId",
      "gamerTag",
      "photo",
      "description"
      from "posts"
      join "users" using ("userId")
      WHERE "userId" = '1'
      order by "postId" desc;
  `;

  db.query(sql)
    .then(result => {
      res.json(result.rows);
    }
    );

});

app.post('/api/feed/post', uploadsMiddleware, (req, res, next) => {
  const { description } = req.body;
  if (!description) {
    throw new ClientError(400, 'description is required');
    // res.status(400).json({
    //   error: 'description needs to be filled out'
    // });
    // res.json({ description: 'this is working' });
  }
  const sql = `
  insert into "posts" ("description", "photo", "userId")
  values ($1, $2, 1)
  returning *
  `;
  const params = [description, `/images/${req.file.filename}`];

  db.query(sql, params)
    .then(result => {
      const [post] = result.rows;
      res.json(post);
    })
    .catch(err => next(err));

});

app.put('/api/feed/profile/posts', (req, res, next) => {
  const postId = parseInt(req.body.postId);
  const postDesc = req.body.description;

  if (postId < 0) {
    res.status(400).json({
      error: 'an unexpected error'
    });
    return;
  }
  const sql = `
  update "posts"
  set "description" = $1
  where "postId" = $2
  returning *
`;

  const params = [postDesc, postId];
  db.query(sql, params)

    .then(result => {
      const [post] = result.rows;
      if (!post) {
        res.status(404).json({ error: `cannot find todo with postId ${postId}` });
        return;
      }
      res.json(post);
    })
    .catch(err => next(err));

});

app.delete('/api/feed/profile/post', (req, res, next) => {
  const post = parseInt(req.body.postId);
  if (post < 0 || !Number.isInteger(post)) {
    res.status(400).json({ error: 'postId must be a positive number' });
  }

  const sql = `
  delete from "posts"
    where "postId" = $1
    returning *
  `
  ;

  const params = [post];
  db.query(sql, params)
    .then(result => {
      const [post] = result.rows;
      if (!post) {
        throw new ClientError(404, 'cannot find post');
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
