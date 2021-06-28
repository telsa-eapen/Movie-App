module.exports = app => {
    const movies = require("../controllers/movie.contrller.js");
 
    var router = require("express").Router();
    
    router.get("/", movies.findAllMovies);
    router.get("/:id", movies.findOne);
   //router.get("/:id/shows", movies.find);
    app.use('/api/movies', router);
};