const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");



app.use(cors())
const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"crudnew"
});

app.use(express.json());

app.post("/register", (req,res)=>{

    const {name} = req.body;
    const {valor} = req.body;
    const {codigo} = req.body;
    
    let SQL = `INSERT INTO books (Nome, Preço, Codigo) VALUES (?,?,?)`;
    db.query(SQL,[name, valor, codigo], (err, result)=>{
        if (err) {
            console.log(err);
          } else {
            res.send(result);
        }
    })
})

app.get("/getCards", (req,res)=>{
    let SQL = "SELECT * from books"
    db.query(SQL, (err, result)=>{
        if (err) {
            console.log(err);
          } else {
            res.send(result);
        }
    })
})
app.put("/edit", (req,res)=>{
    const {id} = req.body;
    const {nome} = req.body;
    const {valor} = req.body;
    const {codigo} = req.body;
    
    let SQL = "UPDATE books SET Nome = ?, Preço = ?, Codigo = ? WHERE ID = ? "
    db.query(SQL,[nome,valor,codigo,id],(err,result)=>{
        if (err) console.log(err)
        else res.send(result)
    })
})
app.delete("/delete/:id",(req,res)=>{
    const {id} = req.params;

    let SQL = "DELETE FROM books WHERE ID =  ?"
    db.query(SQL,[id],(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
app.post("/login",(req,res)=>{
    const {email} = req.body
    const {password} = req.body
    let SQL = 'SELECT * FROM accounts WHERE user = ? AND password = ?'
    
    db.query(SQL, [email,password], (err,result)=>{
        if (result.length>0){
            return res.send(true)
            
        }else {
            return res.send(false)
        }
    })
})
app.listen(4001, ()=>{
    console.log("rodando servidor");
})

