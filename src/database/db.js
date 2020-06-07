//IMPORTAR A DEPENDÊNCIA DO SQLITE3. 
// após require("sqlite3") ao colocarmos o ponto teremos acesso a vários funções deste objeto, essas funções que residem dentro de um objeto chamamos de métodos. 
const sqlite3 = require("sqlite3").verbose() /*verbose() irá apenas nos dizer que se acontecer algo, ele irá emitir mensagens no terminal. */

//Criar objeto que irá fazer operações no banco de dados.
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados, para nossas operações 
/*Serialize() quer dizer que irá rodar uma sequência de códigos.*/
db.serialize(() => {
  //com comandos SQL eu vou:

  // 1- criar uma tabela 
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)

  //2- inserir dados na tabela
  //No primeiro () colocamos os campos que serão inseridos o valores e no segundo () colocamos os valores. 
  // const query = `
  //   INSERT INTO places (
  //     image,
  //     name,
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES (?,?,?,?,?,?,?);
  // `

  // const values = [
  //   "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1161&q=80",
  //   "Colectoria",
  //   "Guilherme Gemballa, Jardim América",
  //   "Nº 260",
  //   "Santa Catarina",
  //   "Rio do Sul",
  //   "Papéis e Papelão"
  // ]

  // function afterInsertData(err) {
  //   if(err) {
  //     return console.log(err)
  //   }
  
  //   console.log("Cadastrado com sucesso")
  //   console.log(this)

  // }
  //Não colocamos o afterInsertData com os parênteses (), pois não queremos que ela execute a função naquele momento, queremos que ela seja uma função de Callback, irá passar por todas as instruções e quando a função afterInsertData estiver pronta retornará com as informações. 
  // db.run(query, values, afterInsertData)

  //3- consultar os dados da tabela
  //o asterisco significa que estamos selecionando todos os dados, caso quisessemos pegar só o name colocariamos name no lugar do asterisco, se fosse só city, colocariamos city e assim por diante. 
  // db.all(`SELECT * FROM places`, function(err, rows) {
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log("Aqui estão seus registros: ")
  //   console.log(rows)
  // })


  //4- deletar um dado da tabela
  //Quando utilizamos a interrogação, precisamos ter uma coleção de dados, pois a quantidade de interrogações estará ligado com a posição de cada dado. 
  // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log("Registro deletado com sucesso!")
  // })

  
})   