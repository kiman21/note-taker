const express = require('express');
const path = require('path');
const app = express();
const db = require ("./db/db.json");
const fs = require ("fs");
const PORT = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/notes", (req,res)=>{
  res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get("/api/notes",(req,res) => {
  return res.json(db)
})

app.post("/api/notes",(req,res)=>{
  req.body.id= uuidv4()
  db.push(req.body)
  fs.writeFile("db/db.json", JSON.stringify(db, null, 4), (err) => {
      if (err) {
        res.status(500).send("Error, could not post");
        throw err;
      } else {
        res.send("Note updated!");
      }
    });
  })

app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.listen(Port,function(){
  console.log("App listening on port ${PORT}")
})
