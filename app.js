const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const { Register } = require('./con');
const session = require('express-session');

// Serve static files from the public directory
app.use(express.static('public'));

// Set up paths
const static_path = path.join(__dirname, '/templates/views');
const partial_path = path.join(__dirname, '/templates/partials');
app.use('/images', express.static(path.join(__dirname, '/templates/images')))

// Set up HBS
app.set('view engine', 'hbs');
app.set('views', static_path);
hbs.registerPartials(partial_path);

// Middleware for parsing the request body
app.use(bodyParser.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());

// Session middleware
app.use(session({
    secret: 'mynameissubhadipdutaiamagoodprogrmammer', // Replace with your secret key
    resave: false,
    saveUninitialized: false
}));

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        // Allowing access to certain routes even if the user is not authenticated
        if (req.originalUrl === '/login' || req.originalUrl === '/contact') {
            next();
        } else {
            res.redirect('/login');
        }
    }
};
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



// Routes
app.get('/', isAuthenticated, (req, res) => {
    res.render('index', { message: "Registration successful. Please login." });
});
app.get('/', (req, res) => {
    // res.render('index', { message: "Registration successful. Please login." });
    res.render('index.hbs')
});

app.get('/contact', isAuthenticated, (req, res) => {
    res.render('contact');
});
// Assuming you have an Express app set up
// app.get('/search', (req, res) => {
//     const searchQuery = req.query.searchQuery; // Assuming the search query is sent as a query parameter
//     // You can then perform any necessary processing, such as fetching data from an external API
//     // For simplicity, let's just redirect to the Unsplash search URL
//     res.redirect(`https://unsplash.com/s/photos/${searchQuery}`);
// });


app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/service', (req, res) => {
    res.render('service', { Sdata: Sdata });
});
app.get('/about', isAuthenticated, (req, res) => {
    res.render('about');
});

app.get('/more', isAuthenticated, (req, res) => {
    res.render('more');
});
app.get('/gettouch', isAuthenticated, (req, res) => {
    res.render('gettouch');
});
app.get('*', isAuthenticated, (req, res) => {
    res.render('error');
});

app.post('/', async (req, res) => {
    try {
        // Generate hashed password
        const hashedReg = await bcrypt.hash(req.body.reg, 10);

        const newRegister = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            roll: req.body.roll,
            section: req.body.section,
            reg: hashedReg,
        });

        await newRegister.save();
        console.log('Registration successful:', req.body.firstname);
        
        res.render('login.hbs', { message: 'Registration successful. Please login.' });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send(error.message);
    }
});
app.post('/login', async (req, res) => {
    try {
        const firstname = req.body.firstname;
        const reg = req.body.reg;

        const user = await Register.findOne({ firstname: firstname });

        if (user) {
            const isPasswordValid = await bcrypt.compare(reg, user.reg);
            if (isPasswordValid) {
                req.session.user = firstname; // Set user session upon successful login
                res.render('index');
            } else {
                res.render('error', { message: 'Incorrect password' });
            }
        } else {
            res.render('error', { message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send(error.message);
    }
});

// Assuming you have middleware to check if the user is authenticated

// app.post('/update-image-link', isAuthenticated, async (req, res) => {
//     try {
//         const registrationNumber = req.body.registrationNumber;
//         const imageLink = req.body.imageLink;

//         // Check if the user's registration number matches the allowed registration number
//         if (registrationNumber === '12104729') {
//             // Store the updated image link in local storage or database
//             localStorage.setItem("imageLink", imageLink);
//             res.status(200).send('Image link updated successfully.');
//         } else {
//             // If the user's registration number does not match the allowed registration number, send a forbidden response
//             res.status(403).send('Unauthorized to update image link.');
//         }
//     } catch (error) {
//         console.error('Error updating image link:', error);
//         res.status(500).send(error.message);
//     }
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
