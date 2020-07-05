const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/positive-vibes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Auth = require('./routes/auth/auth');
const News = require('./routes/parser/news');
const UserMiddleware = require ('./middlewares/userMiddleware');

app.use('/news', UserMiddleware, News);
app.use('/auth', Auth);
app.get('/', (req, res) => {
    res.send("Hello")
});

app.listen(8000, () => {
    console.log('app listening on port 8000!');
}); 