const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/login', async(req, res, next)=>{
        //then we need to call the self invoking function with the req, res, next params.
        authentification(req, res, next)
})

router.post('/register', async(req, res, next)=>{
        const user = await userModel.findOne({email:req.body.email});
        
        if(user){
                return res.status(409)
                .json({message:"this user already exist"});
        }

        if(!req.body.email || !req.body.password){
                return res.status(400).json({message:"vous devez rentrer de bonnes informations"});
        }
        const newUser = await userModel.create({
                        email: req.body.email, 
                        password: await bcrypt.hash(req.body.password,10),
                });
        authentification(req, res, next);
})

router.get('/islogged', (req, res, next)=>{
        passport.authenticate('jwt', async(err, user, info)=>{
                if(err || !user){
                        return res.status(401).json({isLogged: false});
                }
                res.status(200).json({isLogged: true});
        })(req, res, next)
});

router.post('/logout', async(req, res)=>{
        res.cookie('jwtToken', '', {
                httpOnly: true,
                sameSite: 'strict',
                secure: false, 
                maxAge: 0,

        })
        .status(200).json({isLogged:false});
})


    


const authentification = (req, res, next)=>{
        //authenticate the user using the local strategy
        passport.authenticate('local', async(err, user, info)=>{
                
                //if the last middleware generate an error or the email or password is invalid
                if(err || !user){
                        return res.status(403)
                                .json({message:"invalid email or password"})
                }
                
                //if the authentification succeed we need to logged the user. the req.login establish
                //a session for the user. So here we use a jwt token so the the session is false
                req.login(user, {session:false}, (err)=>{

                        //if the login didnt work we send an error
                        if(err){
                                res.send(err);
                        }
                        console.log(user.id);
                        //if the login pass we generate a token to the client
                        const token = jwt.sign({_id:user.id, email:user.email}, process.env.JWT_SECRET,{expiresIn:'1h'});

                        //the token is stored in the response header cookie.
                        //So every time the client want to do a request he can use the cookie
                        
                        res.cookie('jwtToken', token, {
                                httpOnly: true,
                                sameSite: 'strict',
                                secure: false, //we using http in our app (not recommanded)
                                maxAge: 60*60*1000, //the expiration of the cookie (1h)

                        })
                        /* .set('Content-Type:', 'text/html; charset=utf-8') */
                        .status(200)
                        .json({_id:user.id, email:user.email})
                });
        })(req, res, next)
}

module.exports = router;