const ingredients =  require('express').Router();
var mongoose = require('mongoose');
var EssentialIng = require('./../models/DiyDetailsSchema.js');
var db = require('./../connections/dbconnect.js');
db.on('error', console.error.bind(console, 'connection error:'));
const passport = require('passport');
const users = require('../models/registerForm');
let sendMail = require('./sendMail.js');
db.once('open', function() {
  console.log('connected to DB!');
});

ingredients.post('/userIngredientDetails', (req,res)=>{
  let val = JSON.parse(req.query.details);
  let a = new EssentialIng(val);
  console.log('before saving : ',val);
  a.save( (err, reply)=>{
    if (err) {
      console.log('err in saving : ',err);
    }
    else {
      console.log('res from saving : ', reply);
    }
    res.send('data saved succesfully');
  });
  console.log(req.query.details.url);
});

ingredients.post('/login',passport.authenticate('local'),(req,res)=>{
  console.log("req.user ",req.user);
  if(res){
    // console.log(req.user);
    res.send(req.user);
  }
});

ingredients.get('/checkVerification', (req,res)=>{
  //let val =JSON.parse(req.query.UserDetails);
        console.log(req.query.username);
        users.find({username:req.query.username},function(err,user){
        if(err){
            res.send(err);
        }
        // user already exists
        if(user){
          console.log(user);
          res.send({user});
        }
        else{
          res.send("User not registered");
        }
      })
    });

ingredients.post('/logout', function(req, res){
    // req.flash('success_msg', 'You are logged out');
    console.log("you are logging out ",req.query.email);
    res.send(req.query.email);
});

ingredients.post('/register', (req,res)=>{
          let code = Math.floor(100000 + Math.random() * 900000);
          let receiver = req.query.email;
           users.findOne({'email':receiver},function(err,user){
            if(err){
                res.send("Error");
            }
            // user already exsist
            if(user){
                res.send("User already registered");
            } else {
                let newUser= new users();
                //set the user's credentials
                newUser.name = req.query.name;
                newUser.email = req.query.email;
                newUser.password =req.query.password;
                newUser.username = req.query.username;
                newUser.value = req.query.value;
                newUser.verificationCode = code;
                newUser.Subscribers=req.query.Subscribers;
                newUser.YouTubeId=req.query.YouTubeId;
                newUser.verificationStatus = false;
                console.log(newUser,"USER sCHEMA");
                newUser.save(function(err,reply) {
                          if (err) {
                              res.send('Error in registration');
                          } else {
                            sendMail.send({
                            	to:receiver,
                            	subject:'Welcome to DIY Portal',
                              html:'<center><h1>Welcome to DIY Supplies Ordering Portal</h1>'+
                              '<br><h3>Hey, thanks for signing up!</h3><br>'+
                              '<p> You are just one click away from activating your account</p><br>'+
                              '<p>This is your activation code <b>'+code+'</b></p><br><br></center><p</p><br>'
                            });
                            res.send({status:'User details saved successfully',email:receiver});
                          }
                        });
                      }
                    });
});

ingredients.post('/verify', (req,res)=>{
  //let val =JSON.parse(req.query.UserDetails);
        console.log(req.query.email);
        users.find({email:req.query.email},function(err,user){
        if(err){
            res.send(err);
        }
        // user already exists
        if(user){
          console.log(user);
          res.send({user});
        }
        else{
          res.send("User not registered");
        }
      })
    });

    ingredients.post('/resendCode', (req,res)=>{
      //let val =JSON.parse(req.query.UserDetails);
              let code = Math.floor(100000 + Math.random() * 900000);
              console.log(code);
              let receiver = req.query.email;
              console.log(receiver);
              users.updateOne({
                  "email": receiver
              }, {
                  $set: {
                      "verificationCode": code
                  }
              }, function(err, results) {
                if (err) {
                    res.send('Error in registration');
                } else {
                  sendMail.send({
                    to:receiver,
                    subject:'Welcome to DIY Portal',
                    html:'<center><h1>Welcome to DIY Supplies Ordering Portal</h1>'+
                    '<br><h3>Hey, thanks for signing up!</h3><br>'+
                    '<p> You are just one click away from activating your account</p><br>'+
                    '<p>This is your activation code <b>'+code+'</b></p><br><br></center><p</p><br>'
                  });
                  res.send({status:'User details saved successfully',email:receiver});
                }
              });
            });

              ingredients.post('/verificationStatus', (req,res)=>{
                        let receiver = req.query.email;
                        console.log("receiver"+receiver);
                        users.updateOne({
                            "email": receiver
                        }, {
                            $set: {
                                "verificationStatus": true
                            }
                        }, function(err, results) {
                          if (err) {
                              res.send('Error in verification');
                          } else {
                              res.send('Verified successfully');
                          }
                        });

                      });

module.exports = ingredients;
