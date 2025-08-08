9const express = require('express');
const moment = require('moment-timezone');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Global Time Converter',
        currentTime: moment().format('YYYY-MM-DD HH:mm:ss')
    });
});

app.listen(PORT, () => {
    console.log(`Global Time Converter running on port ${PORT}`);
});