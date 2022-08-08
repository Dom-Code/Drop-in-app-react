const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PgPersistence = require('./db/pg-persistence');
const port = process.env.PORT || 5000;

const app = express();
const verifyJWT = require('./middleware/verifyJWT');
require('dotenv').config();

// const whiteList = ['http://localhost:3000/', 'http://127.0.0.1:3000'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whiteList.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   optionsSuccessStatus: 200,
//   credentials: true,
// };

const handleCors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.set('Access-Controll-Allow-Credentials', true)
  res.set('Access-Control-Allow-Headers', "Accept, Content-Type, Referer, sec-ch-ua, sec-ch-ua-platform, User-Agent, withCredentials, Authorization")
  res.set('Access-Control-Request-Method', "POST, GET, PUT")
  next()
}

app.use((req, res, next) => {
  res.locals.store = new PgPersistence(req.session);
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(handleCors)


app.use('/api/auth', require('./routes/login'));
app.use('/api/register', require('./routes/register'));
app.use('/api/refresh', require('./routes/refresh'));
app.use('/api/partial-providers', require('./routes/partialProviders'));
app.use(cors({ exposedHeaders: 'Authorization' }))

app.use(verifyJWT);

app.use('/api/logout', require('./routes/logout'));
app.use('/api/full-providers', require('./routes/fullProviders'));

app.listen(port, () => console.log(`Server started on port ${port}`));


