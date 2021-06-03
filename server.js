const express = require('express');
const Mongoose = require('mongoose');


const PORT = process.env.PORT || 3001
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

Mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

require('./routes/api')(app)
require('./routes/htmlRoutes')(app)

app.listen(PORT, () => {
    console.log(`app is running on port: ${PORT}`)
})