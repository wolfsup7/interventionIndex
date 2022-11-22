
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
    
    
    // - - - - - - - - Useful variables - - - - - - - - - - -
    const Category = require('./models/schema.js')
    const Intervention = require('./models/schema.js')
//find the sub----------------------------------


//add the subdoc to an array----------------
// const Parent = mongoose.model('Parent');
// const parent = new Parent();

// create a comment
// parent.children.push({ name: 'Liesl' });
// const subdoc = parent.children[0];
// console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
// subdoc.isNew; // true

// parent.save(function (err) {
//     if (err) return handleError(err)
//     console.log('Success!');
// });

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
    
// classes list page
    app.get('/index', (req, res)=>{
    //     Classes.find({}).exec((error, classData)=>{ // ATTENTION TO SORT .sort({id:1})
            res.render('index.ejs')
    //, {
    //             classData
    //         });
    //     });
    });
    
// adding a new class page
    // app.get('/classes/add', (req, res)=>{
    //     res.render('add.ejs')
    // });

// // class info page
    app.get('/index/int/', (req, res)=>{
//         Classes.find({_id:req.params.id}, (error, classRoom)=>{
//             console.log(classRoom)
            res.render('int.ejs')
//            , {
//                 classRoom: classRoom,
//                 id: req.params.id
//             });
//        });
    });

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
    Category.create(
        [
            {
            name: "Classroom Management",
            intervensions: ["High-Probability Requests", "Choice Making", "Behavior-Specific Praise"]
            }, 
            {
            name: "Diversity and Inclusion",
            intervensions: ["Culturally Responsive Teaching", "Managing Classroom Design Environments", "Natural Environment Teaching and Inclusion"]
            }, 
            {
            name: "Individualized Education",
            intervensions: ["Peer-Mediated Instruction and Intervention", "Self-Management", "Pivotal Response Training"]
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

mongoose.connect('mongodb://localhost:27017/basiccrud', () => {
    console.log('The connection with mongod is established');
})

app.listen(3000, () => {
    console.log('listening...');
})