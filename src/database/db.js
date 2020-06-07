// importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

// criar objeto para fazer operaçoes no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilzar o objeto de banco de dados para operacoes

// db.serialize(() => {
//     // criar uma tabela com comandos sql
//     db.run(`
//          CREATE TABLE IF NOT EXISTS places (
//              id INTEGER PRIMARY KEY AUTOINCREMENT,
//              image TEXT,
//              name TEXT,
//              address TEXT,
//              address2 TEXT,
//              state TEXT,
//              city TEXT,
//              items TEXT
//          );
//     `)
//     // inserir dados
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//         `
//         const values = [
//             "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//             "Papersider",
//             "Guilherme Gemballa, Jardim América",
//             "Número 260",
//             "Rio do Sul",
//             "Santa Catarina",
//             "Papéis e Papelão"
//         ]
//         function afterInsertData(err){
//             if(err) {
//                 return console.log(err)
//             }
//             console.log("Registered successfully")
//             console.log(this)
//         }
    
//         db.run(query, values, afterInsertData)

    
    // consultar os dados
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Here's your records")
    //     console.log(rows)


    // })
    
        // //deletar um dado de tabela
        // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
        //     if(err){
        //         return console.log(err)
        //     }

        //     console.log("Record sucessfully deleted")
        // })

    // })