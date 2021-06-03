const { mongo } = require('mongoose');
const db = require('../models');
module.exports = function(app) {

    app.post('/api/workouts', ({body}, res) => {
        db.Workout.create(body)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });
    
    app.put('/api/workouts/:id', (req, res) =>{
        db.Workout.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $inc: {totalDuration: req.body.duration},
                $push: {exercises: req.body}
            },
            {
                upsert: true
            }
        )
        .then(dbWorkouts => {
            res.json(dbWorkouts)
        })
        .catch(err => {
            res.json(err)
        })
    });

    app.get('/api/workouts', (req, res) => {
        db.Workout.find({}, (err, data) => {
            if(err) {
               console.log(err)
            } else {
                res.json(data)
            }
        });

    });

    app.get('/api/workouts/range', (req, res) => {
        db.Workout.find({}, (err, data) => {
            if(err) {
                console.log(err)
            } else {
                res.json(data)
            }
        })
    })
}

