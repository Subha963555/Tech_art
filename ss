const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
app.use(express.static('public'));

// Set up paths
const static_path = path.join(__dirname, '/templates/views');
const partial_path = path.join(__dirname, '/templates/partials');
app.use('/images', express.static(path.join(__dirname, '/templates/images')))
// Set the view engine to use Handlebars
app.set('view engine', 'hbs');

// Set the path to the views directory
app.set('views', path.join(__dirname, 'templates', 'views'));

// Set the path to the partials directory
hbs.registerPartials(path.join(__dirname, 'templates', 'partials'));

// Define a route to render the index HBS page
app.get('/', (req, res) => {
    // Render the index.hbs file
    res.render('index', { title: 'Handlebars Example', message: 'Hello, Handlebars!' });
});
app.get('/login', (req, res) => {
    // Render the index.hbs file
    res.render('login');
});
app.get('/about', (req, res) => {
    // Render the index.hbs file
    res.render('about');
});

app.get('/more', (req, res) => {
    // Render the index.hbs file
    res.render('more');
});
const Sdata = [
    {
        icon: 'fas fa-pencil-alt',
        title: 'Sketching',
        description: 'Sketching is the practice of drawing a rough outline or draft version of a final piece of art.',
        image: 'art1.JPG' // Add image file name or path
    },
    {
        icon: 'fas fa-paint-brush',
        title: 'Painting',
        description: 'Painting involves the application of pigment to a surface using various techniques such as brush, palette knife, or sponge.',
        image: 'art2.JPG' // Add image file name or path
        // image: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Add image file name or path
    },
    {
        icon: 'fas fa-vector-square',
        title: 'Vector Art',
        description: 'Vector art is created using mathematical equations to define shapes and curves, allowing for scalability without loss of quality.',
        image: 'art3.JPG' // Add image file name or path
        // image: 'vector_art.jpg' // Add image file name or path
    },
    {
        icon: 'fas fa-pencil-ruler',
        title: 'Technical Drawing',
        description: 'Technical drawing involves the creation of precise and accurate drawings used in fields such as engineering and architecture.',
        // image: 'technical_drawing.jpg' // Add image file name or path
        image: 'art4.JPG' 
    },
    {
        icon: 'fas fa-paint-brush',
        title: 'Digital Painting',
        description: 'Digital painting is an emerging art form that involves creating artwork digitally using specialized software and hardware.',
        image: 'art5.JPG' 
        // image: 'digital_painting.jpg' // Add image file name or path
    },
    {
        icon: 'fas fa-paint-brush',
        title: 'Digital Crafting',
        description: 'Digital Crafting is an emerging art form that involves creating artwork digitally.',
        image: 'art6.JPG' 
        // image: 'digital_painting.jpg' // Add image file name or path
    }
    // Add more drawing art styles as needed
];

app.get('/gettouch', (req, res) => {
    // Render the index.hbs file
    res.render('gettouch');
});
app.get('/service', (req, res) => {
    // Render the service.hbs file and pass the Sdata array to it
    res.render('service', { Sdata });
});
app.get('/contact', (req, res) => {
    // Render the index.hbs file
    res.render('contact');
});
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
