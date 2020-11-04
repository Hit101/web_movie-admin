const  express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
//const upload = multer({desk:'upload/'});
const path = require('path')
const Film = require('../models/film');
const auth = require('../middleware/auth')

// const express = require('express');
// const router = express.Router();
// const path = require('path')
// const fs = require('fs')
// const mongoose = require('mongoose');
// const multer = require('multer');
// const auth = require('../middleware/auth');
// const Film = require('../models/film');
// const Rating = require('../models/rating');
// const Category = require('../models/category');
// const Director = require('../models/director');
// const FilmsController = require('../controllers/film');
// const db = mongoose.connection;
// const Comment = require('../models/comment');
// const Film_User_History = require('../models/film_user_history');
// const { resolveSoa } = require('dns');
const category = require('../models/category');
const director = require('../models/director');



// const uploadPath = path.join('public', Film.coverImageBasePath)


// const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'images/gif']
// const upload = multer({
//     // dest: uploadPath,
//     // fileFilter: (req, file, callback) => {
//     //     callback(null, imageMimeTypes.includes(file.mimetype))
//     // }

// })


// // search --------------------------------------------------------------------------
// router.get('/search',(req,res,next)=>{ 
//     const regex= new RegExp(req.query.name,'i');
//     if(req.query.name == ""){
//         res.status(404).json({message:'Null'})
//     }
//     filmManager.find({name:regex})
//     .then(result=>{
//         res.status(201).json(result)
//     })
//     .catch(err=>{
//         res.status(500).json({
//             error:err
//         })
//     })
//   }) 

// // delete -------------------------------------------------------------------
//   router.delete('/delete/:filmId', (req, res, next) => {
//     const id = req.params.filmId;
//     Film.remove({ _id: id })  // remove 1 phim tư FILM
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: 'Film Deleted',
//                 request: {
//                     type: 'POST',
//                     url: 'http://localhost:3000/film',
//                     body: {
//                         name: 'String',
//                         rating: 'Number',
//                         description: 'String',
//                         publishDate: 'Date',
//                         cast: 'String',
//                         coverImageName: 'String',
//                         director: 'directorId',
//                         category: 'categoryId',
//                         releaseDate: 'Datetime',
//                         linkTrailer: 'String'
//                     }
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });


// // Function ALL PHIM ----------------------------------------------------------------
// router.get('/all', auth, async (req, res, next) => {
//     const regex = new RegExp(req.query.text_search, 'i');
//     Film.find({ name: regex })
//     .select('name publishDate description cast coverImageName' +
//         'director category linkTrailer create_at _id viewFilm').limit(10)
//     .exec()
//     .then(docs => {
//         const respond = {
//             count: docs.length,
//             films: docs.map(doc => {
//                 return {
//                     name: doc.name,
//                     viewFilm:doc.viewFilm,
//                     publishDate: doc.publishDate,
//                     description: doc.description,
//                     create_at: doc.create_at,
//                     cast: doc.cast,
//                     coverImageName: doc.coverImageName,
//                     director: doc.director,
//                     category: doc.category,
//                     linkTrailer: doc.linkTrailer,
//                     _id: doc._id,
//                     request: {
//                         type: 'GET',
//                         url: 'http://localhost:4000/filmManager/' + doc._id
//                     }
//                 }
//             }),

//         }

//         res.status(200).json(respond)

//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });

// });

// // save function ----------------------------------------------------------------
// function saveCover(film, coverEncoded) {
//     if (coverEncoded == null) return
//     const cover = JSON.parse(coverEncoded)
//     if (cover != null && imageMineType.includes(cover.type)) {
//         film.coverImageName = new Buffer.from(cover.data, 'base64');
//         film.imgType = cover.type;
//     }
// }

// // New Film ----------------------------------------------------------------
// router.post('/new', auth, upload.single('coverImageName'), async (req, res, next) => {
  
//     console.log(req.file)
//     const film = new Film({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         coverImageName: req.file.buffer.toString('base64'),
//         //imgType:req.body.coverImageName.type,
//         //rating :req.body.rating,
//         publishDate: req.body.publishDate,
//         description: req.body.description,
//         linkTrailer: req.body.linkTrailer,
//         cast: req.body.cast,
//         category: req.body.categoryId,
//         director: req.body.directorId
        
//     })
    
//     film.save()
//         .then(result => {
//             res.status(200).json({
//                 message: "Created film successfully",
//                 createdFilm: {
//                     _id: result._id,
//                     name: result.name,
//                     viewFilm:result.viewFilm,
//                     publishDate: result.publishDate,
//                     description: result.description,
//                     create_at: result.create_at,
//                     cast: result.cast,
//                     coverImageName: result.coverImageName,
        
//                     director: result.director,
//                     category: result.category,
//                     linkTrailer: result.linkTrailer,
                   
//                     request: {
//                         type: 'GET',
//                         url: 'http://localhost:3000/film/' + result._id
//                     }
//                 }


//             });
            
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })

//   // }
// })
// //----------------------------------------------------------------

// //- edit film ---------------------------------------------------------------
//     router.put('/edit/:filmId', auth, upload.single('coverImageName'), async (req, res, next) => {
       
//         let film;
//         film = await Film.findById(req.params.filmId)
    
//         const fileName = req.file != null ? req.file.filename : null
    
//                         film.name =             req.body.name,
//                         film.coverImageName =   fileName,
//                         film.publishDate =      req.body.publishDate,
//                         film.description =      req.body.description,
//                         film.linkTrailer =      req.body.linkTrailer,
//                         film.create_at=         req.body.create_at,
//                         film.cast =             req.body.cast,
//                         film.category =         req.body.categoryId,
//                         film.director =         req.body.directorId
    
//         film.save()
//             .then(result => {
//                 if (result) {
//                     res.status(200).json({
//                         message: "Update film successfully",
//                         createdFilm: {
//                             name:             result.name,
//                             coverImageName:   result.coverImageName,
//                             publishDate:      result.publishDate,
//                             description:      result.description,
//                             linkTrailer:      result.linkTrailer,
//                             create_at:        result.create_at,
//                             cast:             result.cast,
//                             director:         result.director,
//                             category:         result.category,
//                             _id: result._id,
//                             request: {
//                                 type: 'GET',
//                                 url: 'http://localhost:4000/filmManager/' + result._id
//                             }
//                         }
    
//                     });
//                 }
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     error: err
//                 })
//             })
//     });
//     //---------------------------------------------------------------

// fiml manager : search , search ID , Newfiml, Edit,Delete 

// multer
const uploadPath = path.join('public', Film.coverImageBasePath)

const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'images/gif']
const upload = multer({
    // dest: uploadPath,
    // fileFilter: (req, file, callback) => {
    //     callback(null, imageMimeTypes.includes(file.mimetype))
    // }

})
//----------------


//seach  -----------------
router.get('/search', async (req, res, next) => {
    const regex = new RegExp(req.query.name, 'i');
    Film.find({ name: regex })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
//----------------------------------------------------------------

// Post Phim
router.post('/new', auth, upload.single('coverImageName'), async (req, res, next) => {
   // tao 2 bien de tim kiem Name vs Category
    const film_search = await Film.findOne({name:req.body.name});
    const film_search_category =await Film.findOne({"categories": { $elemMatch: { category: req.body.categoryId}}})
    if(film_search){ // check xem tên có trùng để đưa vào Danh mục
        let film;
        film = await Film.findOne(film_search._id)
        const categoryId = req.body.categoryId
        const category =await film.Save_Category(categoryId)
        res.status(200).json({
            message: 'Login Successful',
            category: category,
            film: film,

        })    
    }else{
        try { //tao phim
            const film = new Film({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                coverImageName: req.file.buffer.toString('base64'),
                publishDate: req.body.publishDate,
                description: req.body.description,
                linkTrailer: req.body.linkTrailer,
                cast: req.body.cast,
                director: req.body.directorId
            })
            //save
            await film.save()
            const categoryId = req.body.categoryId
            const category = film.Save_Category(categoryId)
            res.status(200).json({
                message:'Success',
                film: film,
                category: category
            })
        } catch (err) {
            res.status(500).json({
                error: err,
                message: 'Add film fail'
            })
        }
    }
})

router.put('/edit/:filmId', auth, upload.single('coverImageName'), async (req, res, next)=>{
    //tao 1 bien lay ID

    let film = await Film.findById(req.params.filmId)
    
    film.name = req.body.name,
    film.coverImageName = req.file.buffer.toString('base64'),
    film.publishDate = req.body.publishDate,
    film.description = req.body.description,
    film.linkTrailer = req.body.linkTrailer,
    film.cast = req.body.cast,
    film.director = req.body.directorId

        film.save()
        .then(result => {
                res.status(200).json({
                    message: "Update film successfully",
                    createdFilm: {
                        name: result.name,
                        publishDate: result.publishDate,
                        description: result.description,
                        create_at: result.create_at,
                        cast: result.cast,
                        coverImageName: result.coverImageName,
                        director: result.director,
                        category: result.category,
                        linkTrailer: result.linkTrailer,
                        // rating: rating,
                        // comment: comment,
                        // ratingAverage: avg,
                        _id: result._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/filmManager/' + result._id
                        }
                    }

                });          
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
        const categoryId = req.body.categoryId
        const category=await Film.Save_Category(categoryId)
})

router.delete('/delete/:filmId', (req, res, next) => {
    const id = req.params.filmId;
    Film.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Film Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/filmManager/',
                    body: {
                        name: 'String',
                        rating: 'Number',
                        description: 'String',
                        publishDate: 'Date',
                        cast: 'String',
                        coverImageName: 'String',
                        director: 'directorId',
                        category: 'categoryId',
                        releaseDate: 'Datetime',
                        linkTrailer: 'String'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

module.exports =router;









