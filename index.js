const express= require("express");
const mongoose=require("mongoose");
const app=express();
const User=require('./models/user');
const bcrypt=require("bcrypt");

const port=3000;

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    //console.log("signup done");
    res.render('homepage');
})

app.get('/signup',(req,res)=>{
    res.render('signup');
})

app.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body;
    const hash=await bcrypt.hash(password,12);
    const user=new User({
        username,
        email,
        password:hash
    })
    // const collection = client.db('UserCredentials').collection('UserCollection');
    // const result = await collection.insertMany(user);
    // console.log(`${result.insertedCount} documents uploaded`);
    await user.save();
    //res.send(req.body);
    res.redirect('/');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username});
    const validPassword=await bcrypt.compare(password,user.password);
    if(validPassword){
        res.send("Welcome!!")
    }
    else{
        res.send("TRY AGAIN")
    }
    //res.redirect("/landingpage");
})

mongoose.connect('mongodb+srv://FinanceApp:qwertyui123@financeapp.lztb8v3.mongodb.net/?retryWrites=true&w=majority&appName=FinanceApp')
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch(err=>{
        console.log("Failed to Connect to MongoDb")
        console.log(err)
    })

app.listen(port,()=>{
    console.log("Server Started");
})