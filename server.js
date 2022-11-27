
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


// home page
    app.get('/home', (req, res)=>{
    //     // insert previous DATA if collection is empty
    //     db.collection('classes').count(function(err, count) {
    //         console.log(err);
    //         console.log(count);
    //         if( count < 1) {
    //             Classes.create(Data);
    //         } else {
    //         console.log('Nothing was done')
    //         }
    //     });
        res.render('home.ejs')
    });

//Index Categories ------------------------
app.get('/index', (req, res)=>{
    res.render('index.ejs')
});

app.get('/index/cm', (req, res)=>{
    res.render('cm.ejs')
});

app.get('/index/di', (req, res)=>{
    res.render('ie.ejs')
});

// categories list page
    app.get('/index/int/', (req, res)=>{
        interventions.find({}).exec((error, intervention)=>{ 
            res.render('cm.ejs',
            {
                Interventions:intervention
            })
        });
    });

// adding a new intervention page
//    app.get('/index/int/add', (req, res)=>{
//        res.render('add.ejs')
//    });

// // ---------------interventionlist pages
//    app.get('/index/int/', (req, res)=>{
//         Classes.find({_id:req.params.id}, (error, classRoom)=>{
//             console.log(classRoom)
//           res.render('int.ejs')
//            , {
//                 classRoom: classRoom,
//                 id: req.params.id
//             });
//        });
//    });

// // edit page
    app.get('/index/int/edit', (req, res)=>{
//         Classes.find({_id:req.params.id}, (error, classRoom)=>{
//             console.log(classRoom)
            res.render('edit.ejs')
            //, {
//             classRoom: classRoom,
//             id: req.params.id
//         });
//     });
});

//----------------Seed----------------------------
app.get('/home/seed', (req, res)=>{
    Intervention.create(
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
// adding new class
//     app.post('/classes', (req, res)=>{
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
//     Classes.create(req.body, (error, newClass)=>{
//         console.log(newClass);
//         res.redirect('/classes')
//     });
// });

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