const { genres } = require("../models");
const db = require("../models");
const Genres = db.genres;

  exports.findAllGenres = (req, res) => {
      Genres.find()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Genres."
          });
        });
     };