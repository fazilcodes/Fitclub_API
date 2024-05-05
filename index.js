const express = require('express');
const data = require('./apiData.json');
const data2 = require('./apiData2.json')
require('dotenv').config();

const app = express();

// middleWare
const checkAuth = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization !== `Bearer ${process.env.API_KEY}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};


// Routes
// -----------------HOME WORKOUTS-----------------------
// all workout data
app.get("/api/home/workouts", checkAuth, (req, res) => {
    return res.json(data)
})

// all bodyparts
app.get("/api/home/bodyparts", checkAuth, (req, res) => {
    const bodyparts = data.map((workout) => workout.name)
    return res.json(bodyparts)
})

// dynamic bodyparts
app.get('/api/home/workouts/:bodypart', checkAuth, (req, res) => {
        const bodypart = req.params.bodypart
        const workouts = data.find((data) => data.name === bodypart)   
        
        return res.json(workouts)

})



// -----------------GYM WORKOUTS-----------------------
// all workout data
app.get("/api/gym/workouts", checkAuth, (req, res) => {
    return res.json(data2)
})

// all bodyparts
app.get("/api/gym/bodyparts", checkAuth, (req, res) => {
    const bodyparts = data2.map((workout) => workout.name)
    return res.json(bodyparts)
})

// dynamic bodyparts
app.get('/api/gym/workouts/:bodypart', checkAuth, (req, res) => {
        const bodypart = req.params.bodypart
        const workouts = data2.find((data) => data.name === bodypart)   
        
        return res.json(workouts)

})


app.listen(process.env.PORT, () => {
    console.log('server started');
})