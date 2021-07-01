const TokenGenerator = require('uuid-token-generator');
const { fromString } = require('uuidv4');
// load the schema models 
const db = require("../models");
// use the users schema 
const User = db.users;
const {atob,btoa}  = require("b2a");

exports.login = (req, res) => {
    console.log(req.headers.authorization);
    const authHeader  = req.headers.authorization.split(" ")[1];
    console.log(authHeader);
    console.log(atob(authHeader));
    let unamePwd = atob(authHeader);
    const uname =  unamePwd.split(":")[0];
    const pwd = unamePwd.split(":")[1];
    console.log(uname);
    console.log(pwd);
    if (!uname && !pwd) {
        res.status(400).send({ message: "Please provide username and password to continue." });
        return;
      }
    
       const filter = { username: uname };
       User.find(filter, (err, usersFound)=>{
        let user = usersFound[0];
        if(err || user === null){
            console.log("IN ERR");
            res.status(500).send({
            message: "User Not Found."
          });
        }else {
    
          if(pwd === user.password){
            const tokgen = new TokenGenerator(); 
            const accessTokenGenerated = tokgen.generate();
            console.log(accessTokenGenerated);
            
            const uuidGenerated = fromString(uname);
            user.isLoggedIn = true;
            user.uuid = uuidGenerated;
            user.accesstoken = accessTokenGenerated;
            User.findOneAndUpdate(filter, user, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: "Some error occurred, please try again later."
                });
              } else 
              { 
                res.header('access-token', user.accesstoken); 
              
                res.send({"id":user.uuid, "access-token":user.accesstoken}); 
                //res.send(user);
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating."
            });
          });
  
        }else{
          res.status(500).send({
            message: "Please enter valid password."
          });
        }
      }
      
    });
  
  };
  exports.signUp = (req, res) => {
   
    console.log(req.body);
   // Validate request
   if (!req.body.email_address && !req.body.password) {
     res.status(400).send({ message: "Please provide email and password to continue." });
     return;
   }
 
   const user = new User({
    email: req.body.email_address,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.first_name + req.body.last_name,
    password: req.body.password,
    contact: req.body.mobile_number,
    role: req.body.role ? req.body.role : 'user',
    isLoggedIn : false,   
    uuid : "",
    accesstoken : "",
    coupens: [],
    bookingRequests : []
  });

  user
  .save(user)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred, please try again later."
    });
  });
};


exports.logout = (req, res) => {

// Validate request
if (!req.body.uuid) {
  res.status(400).send({ message: "ID Not Found!" });
  return;
}

const update = { isLoggedIn: false, uuid: "",accesstoken: ""  };

User.findOneAndUpdate({"uuid": req.body.uuid}, update)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: "Some error occurred, please try again later."
      });
    } else res.send({ message: "Logged Out successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating."
    });
  });
};
             