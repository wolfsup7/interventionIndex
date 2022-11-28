
// - - - - - - - - - - Set Up - - - - - - - - - - - - - - 
// npm init
    // npm install express ejs mongoose method-override
    const express = require('express');
    const mongoose = require('mongoose');
    const app = express();

    const methodOverride = require('method-override');
    
    // app.use(express.static('public'));
    app.use(express.urlencoded({extended: true}));
    app.use(methodOverride('_method'));
    app.use(express.static('public'));
    
    
    // - - - - - - - - Useful variables - - - - - - - - - - -
    const interventions = require('./models/schema.js');


// -----------------------ROUTES------------------------------------
app.get('/home', (req, res)=>{
    res.render('home.ejs')
});

app.get('/index', (req, res)=>{
    res.render('index.ejs')
});

app.get('/index/int-cm', (req, res)=>{
    interventions.find({category: "Classroom Management"}).exec((error, intervention)=>{ 
        res.render('cm.ejs',
        {
            Interventions:intervention
        })
    });
});

app.get('/index/int-di', (req, res)=>{
    interventions.find({category: "Diversity and Inclusion"}).exec((error, intervention)=>{ 
        res.render('di.ejs',
        {
            Interventions:intervention
        })
    });
})

app.get('/index/int-ie', (req, res)=>{
    interventions.find({category: "Individualized Education"}).exec((error, intervention)=>{ 
        res.render('ie.ejs',
        {
            Interventions:intervention
        })
    });
});

app.get('/index/int/add', (req, res)=>{
    res.render('add.ejs')
});

app.get('/index/int/:id/edit', (req, res)=>{
    interventions.findById(req.params.id, (err, foundIntervention)=>{ 
        res.render(
    		'edit.ejs',
    		{
    			intervention: foundIntervention
    		}
    	);
    });
});



//----------------Seed----------------------------
app.get('/home/seed', (req, res)=>{
    interventions.create(
        [
            {
                name: "High-Probability Requests", 
                category: "Classroom Management",
                outcomes: 'String',
                resources: 'String'
                }, 
                {
                name: "Choice Making", 
                category: "Classroom Management",
                outcomes: 'String',
                resources: 'String'
                }, 
                {
                name: "Behavior-Specific Praise", 
                category: "Classroom Management",
                outcomes: 'String',
                resources: 'String'
                },
                {
                name: "Culturally Responsive Teaching", 
                category: "Diversity and Inclusion",
                outcomes: 'String',
                resources: 'String'
                },
                {
                name: "Managing Classroom Design Environments", 
                category: "Diversity and Inclusion",
                outcomes: 'String',
                resources: 'String'
                },
                {
                name: "Natural Environment Teaching and Inclusion", 
                category: "Diversity and Inclusion",
                outcomes: 'String',
                resources: 'String'
                },
                {
                name: "Peer-Mediated Instruction and Intervention", 
                category: "Individualized Education",
                outcomes: 'String',
                resources: 'String'
                },
                {
                name: "Self-Management", 
                category: "Individualized Education",
                outcomes: 'String',
                resources: 'String'
                },
                {
                name: "Pivotal Response Training", 
                category: "Individualized Education",
                outcomes: 'String',
                resources: 'String'
                }
        ], 
        (err, Category)=>{
            res.redirect('/home');
        }
    )
});


// - - - - - - - - Pages Actions - - - - - - - - - - -
app.post('/index/int', (req, res)=>{
    interventions.create(req.body, (error, addedIntervention) => {
        res.redirect('/index');
    })
});

app.delete('/index/int/:id', (req, res)=>{
    interventions.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/index');
    });
});

app.put('/index/int/:id', (req, res)=>{
    interventions.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/index');
    });
});

//-------------------footer/connections---------------------
mongoose.connect('mongodb://localhost:27017/interventions', () => {
    console.log('The connection with mongod is established');
})

app.listen(3000, () => {
    console.log('listening...');
})