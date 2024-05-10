const express = require("express");
const app =  express();
const port = 8200;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method')); 

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username : " nihal ",
        content : " java "       
    },
    {
            id: uuidv4(),
            username : " suyash ",
            content : " BKL"
    },
    {
            id:uuidv4(),
            username : " kshitij ",
            content : " bkl "
    }
];


app.get("/posts", (req,res)=> {
    res.render("index.ejs",{ posts }); 
});

app.get("/posts/new", (req,res)=> {
    res.render("new.ejs"); 
});

app.post("/posts", (req,res)=> {
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    res.redirect("/posts"); 
});

app.get("/posts/:id", (req,res)=> {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post}); 
});

app.patch("/posts/:id", (req,res) => {
    let id = req.params; 
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent; 
    res.send("patch request working");
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params; 
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.listen(port, () => {
    console.log(`Server Running on ${port}`);
});