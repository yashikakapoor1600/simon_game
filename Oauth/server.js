import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"/auth/google/callback"
},(accessToken,refreshToken,profile,done)=>{
    return done(null,profile);
}))


passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((user,done)=>done(null,user));

app.get('/',(req,res)=>{
    res.send(`<h1>home</h1> <a href="/auth/google">Login with Google </a>`);
});

app.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",
    passport.authenticate("google",{
        failureRedirect:'/',
        successRedirect:'/profile'
    })
);

app.get('/profile',(req,res)=>{
    if(!req.user) return res.redirect('/');
    res.send(`<h1> Hello ${req.user.displayName}</h1>`);
});



app.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/');
    });
});

app.listen(3000,()=>{
    console.log("http://localhost:3000");
})