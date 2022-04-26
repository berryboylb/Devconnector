const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
//require the db
const connectDB = require('./config/db');
//callthe function
connectDB();

//init middleware 
//for getting requests from body
app.use(express.json({ extended: false }));

//defining all our routes
app.use('/api/users', require("./routes/api/users"));
app.use('/api/auth', require("./routes/api/auth"));
app.use('/api/profile', require("./routes/api/profile"));
app.use('/api/posts', require("./routes/api/posts"));
app.all('*', (req, res) => {
    res.send({
      code: 404,
      message: "route doesn't exist"
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))