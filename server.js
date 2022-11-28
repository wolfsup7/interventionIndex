
//  = = = = = = = = = = = = STRUCTURE = = = = = = = = = = = = = = =
    // - - - - -  app.GET - - - - -
        // Home Page 
        // Intervention categories Index
        // Intervention show
        // Add an Intervention
        // Edit - able to change a certain portion of the intervention or add notes

    // - - - - - - app. - - - - - - 
        // POST - for creating
        // PUT -for updating
        // DELETE - for deleting intervention 

    // - - - - - - files - - - - -  
        // intervention categories
        // interventions array
        // schema - make 2 , mongoose sub documents
        // server
        // ejs (5)

//  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

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


    // editing class
//     app.put('/classes/:id', (req, res)=>{
//         let student1 = {
//             name: req.body.name1,
//             age: Number(req.body.age1),
//             readingLevel: req.body.readingLevel1,
//             mathLevel: req.body.mathLevel1,}
//         let student2 ={
//             name: req.body.name2,
//             age: Number(req.body.age2),
//             readingLevel: req.body.readingLevel2,
//             mathLevel: req.body.mathLevel2,}
//         let student3 ={
//             name: req.body.name3,
//             age: Number(req.body.age3),
//             readingLevel: req.body.readingLevel3,
//             mathLevel: req.body.mathLevel3,}
//         let student4 ={
//             name: req.body.name4,
//             age: Number(req.body.age4),
//             readingLevel: req.body.readingLevel4,
//             mathLevel: req.body.mathLevel4,}
//         let student5 ={
//             name: req.body.name5,
//             age: Number(req.body.age5),
//             readingLevel: req.body.readingLevel5,
//             mathLevel: req.body.mathLevel5,}
//         req.body.students = [student1, student2, student3, student4, student5]
//     console.log(req.body)
//     Classes.findById(req.params.id).update(req.body, (error, updateClass)=>{
//         console.log(updateClass);
//         res.redirect('/classes')
//     });
// });

// // removing a class
//     app.delete('/classes/:id', (req, res)=>{
//         Classes.findById(req.params.id).deleteOne((err, data)=>{
//             res.redirect('/classes');
//         });
//     });

mongoose.connect('mongodb://localhost:27017/interventions', () => {
    console.log('The connection with mongod is established');
})

app.listen(3000, () => {
    console.log('listening...');
})