//Iremos requerer o express na variável express.
const express = require("express")

//Como a variável express recebe uma função, nós a executaremos chamando a variável server. 
const server = express()

//Pegar o banco de dados, que está sendo exportado no arquivo db.js
const db = require("./database/db.js")

//Configurando a pasta publica. Sem esta configuração, o servidor estará pegando apenas os arquivos de Views, sem os scripts, css e assets, ficará toda quebrada. 
//use() é configuração específica do servidor. 
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//CONFIGURANDO CAMINHOS DA MINHA APLICAÇÃO. 

//O Get é um verbo HTTP. HTTP são protocolos (regras) uma dessas regras é trabalhar com verbos, então ao colocar um endereço de uma página, o navegador irá requerer esta conversa, por isso nós respondemos através do GET, que é um modo de pedir para acessar aquela página. 
//Req = requisição / Res = resposta
//pagina inicial 
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um título"}) /*A resposta irá me enviar um arquivo que está na rota colocada. A variável __dirname é uma variável já definida pelo javascript. Como já configuramos o nunjucks, não precisamos utilizar 
  o 2º Parâmetro é um objeto, onde colocamos as variáveis que podemos utilizar para adicionar conteúdos no HTML através do nunjucks.  */
})

server.get("/create-point", (req, res) => {

  //req.query: query strings da nossa url
  console.log(req.query)

  return res.render("create-point.html") 
})

server.post("/savepoint", (req, res) => {

  //req.body: é o corpo do nosso formulário
  // console.log(req.body)


  //inserir dados no banco de dados 
  //No primeiro () colocamos os campos que serão inseridos o valores e no segundo () colocamos os valores. 
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

  function afterInsertData(err) {
    if(err) {
      return console.log(err)
    }
    
    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render("create-point.html",{ saved: true })
  }
  //Não colocamos o afterInsertData com os parênteses (), pois não queremos que ela execute a função naquele momento, queremos que ela seja uma função de Callback, irá passar por todas as instruções e quando a função afterInsertData estiver pronta retornará com as informações. 
  db.run(query, values, afterInsertData)

  
})

server.get("/search", (req, res) => {

  const search = req.query.search

  if(search == "") {
    //pesquisa vazia - Se total for maior que 0 ele mostra, se for igual a zero, não mostrará nada. 
    return res.render("search-results.html", { total: 0 }) 
  }

  //pegar os dados do banco de dados
  //O like combinado com as % antes e depois, quer dizer que durante a pesquisa, qualquer palavra que vier tanto antes, quanto depois, será mostrado no filtro. Está sendo utilizado desta maneira, pois são comandos SQL. 
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err, rows) {
    if(err) {
      return console.log(err)
    }

    const total = rows.length

    //mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total }) 
  })
  //como o total tem o mesmo nome da variável, podemos colocar apenas total como parâmetro, no momento deixei total: total para ficar mais fácil a visualização. 

 
})



//ligando o servidor.
server.listen(3000)