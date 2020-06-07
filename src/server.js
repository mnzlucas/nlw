const express = require("express")

const server = express()

// pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true}))

//template engine 
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos
server.get("/", (req, res) => {
    return res.render("index.html")
})
server.get("/create-point", (req, res) => {
    //req.query - pegas as strings da url
    return res.render("create-point.html")
})
server.post("/savepoint", (req, res) => {
    //req.body: pega o corpo do formulario
    //console.log(req.body)


    // inserir dados no banco de dados

    //     // inserir dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
        `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
        function afterInsertData(err){
            if(err) {
             console.log(err)
             return res.send("registration error")
            }
            console.log("Registered successfully")
            console.log(this)

            return res.render("create-point.html", { saved: true})
        }
    
        db.run(query, values, afterInsertData)

    //
})
server.get("/search", (req, res) => {
    
    const search = req.query.search

    if(search == ""){
        // mostrar a pagina do html sem dados
    return res.render("search-results.html", { total: 0})
    }
     //pegar os dados do banco de dados
    // db.all(`SELECT * FROM places city `, function(err, rows){
     db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if(err) {
        return console.log(err)
    }
    // console.log("Here's your records")
    // console.log(rows)
    const total = rows.length
    // mostrar a pagina do html com os dados
    return res.render("search-results.html", {places: rows, total})
    })

})

//ligar servidor
server.listen(3000)