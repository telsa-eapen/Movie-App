module.exports = app => {
    const artists = require("../controllers/artist.conntroller.js");
    var router = require("express").Router();
    router.get("/", artists.findAllArtists);
    app.use('/api/artists', router);
    };