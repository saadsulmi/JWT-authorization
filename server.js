const express = require('express');
const app =express();
require('dotenv').config();
const jwt =require('jsonwebtoken');


const post = [{
    user : 'saad',
    title :'mern stack'
},
{
    user : 'achu',
    title : 'python'
}
]

app.use(express.json());


app.post('/login',(req,res)=>{

    const username = req.body.username;
    const user = {name:username}
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken});

});


app.get('/posts',authenticateToken,(req,res)=>{
    res.json(post.filter(post=> post.username===req.user.name))
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader&&authHeader.split(' ')[1]
    if(token===null) return res.sendStatus(404)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


app.listen(3000,()=>console.log('server connected'))