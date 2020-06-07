//adicionando as opções de estados e cidades no input Form com name UF através de uma fetch e promise.
//Selecionamos o campo e para uma melhor aplicação, salvamos em uma variável e dentro de uma função. 

// function populateUFs() {
//   const ufSelect = document.querySelector('select[name=uf]')

// }


//Então fazemos o fetch, com o endereço que pegamos no site do IBGE. 

// function populateUFs() {
//   const ufSelect = document.querySelector('select[name=uf]');

//   fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
//   .then( (res) => {return res.json()})
//   //Como o arquivo do site do IBGE é um json, nós precisamos pedir que a resposta (res) retorne um arquivo json.
// }


//AGORA ADICIONAREMOS PELO JAVASCRIPT MAIS OPÇÕES NO SELECT COM NAME UF. 
// function populateUFs() {
//   const ufSelect = document.querySelector('select[name=uf]');

//   fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
//   .then( (res) => {return res.json()})
//   .then( (states) => {
//     ufSelect.innerHTML += `<option value="1">Valor</option>` 
//     //Colocamos o ufSelect como += para que ele não escreva por cima do Selecione o Estado. É a mesma coisa que escrever ufSelect.innerHTML = ufSelect.innerHTML + `<option value="1">Valor</option>`. Desta maneira ele se torna mais uma opção de estado para o cliente selecionar. 
//   })
  
// }


//AINDA É NECESSÁRIO DEIXAR O STATE MAIS DINÂMICO, PARA ISSO PRECISAMOS DE UMA ESTRUTURA DE REPETIÇÃO. 

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( (res) => {return res.json()})
  .then( (states) => {

    for ( const state of states ) { /*Para cada variável state de states, executar esse código. */
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
    }
    
  })
  
}
populateUFs()


//AGORA IMPLEMENTAMOS PARA CITIES
function getCities(event) {
  const citySelect = document.querySelector('[name=city]');
  const stateInput = document.querySelector('[name=state]');

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex /*Irá falar qual o número do index selecionado.  */
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = '<option value> Selecione a Cidade </option>'; //Necessário colocar citySelected como vazio para que ao selecionar o estado, não fique salvo as cidades desse estado, caso troque por outro estado. 
  citySelect.disabled = true;

  fetch(url)
  .then( (res) => {return res.json()})
  .then( (cities) => {
    for ( const city of cities ) { /*Para cada variável city de cities, executar esse código. */
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` 
    }
    citySelect.disabled = false; //retira o disabled assim que for selecionado o estado. 
  })
}

document
  .querySelector('select[name=uf]')
  .addEventListener("change", getCities)




//ITENS DE COLETA - SELECIONADO -
//PEGANDO TODOS OS LI's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem) 
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  //add  ou remover classe selected para mostrar qual elemento está sendo selecionado. 
  const itemLi = event.target
  //usamos o Toggle pois ele adiciona ou remove, assim não precisamos criar o add e remove. 
  itemLi.classList.toggle("selected")

  //dataset pega os números que colocamos como data id nos Li's
  const itemId = event.target.dataset.id 
  
  

  //verificar se existem itens selcionados, se sim, pegar os itens selecionados. 
  const alreadySelected = selectedItems.findIndex(function(item) {
    const itemFound = item == itemId //isso será true ou false
    return itemFound

    /*outra forma que pode ser escrito a função anônima é através da arrow function.

    const alreadySelected = selectedItems.findIndex( item => item == itemId)

    como tem só um argumento podemos retirar os parênteses do item e quando retornamos algo direto de uma arrow function, podemos retirar o return. 
    */
  }) 


  //Se ja estiver selecionado, tirar da seleção.
  //Quando ele procurar na lista e não achar o item, ele irá retornar -1, se o item for achado, ele retornará o index do item que será 0 ou maior. Por isso colocamos no if(alreadySelected >= 0) 
  if(alreadySelected >= 0) {
    

    //tirar da seleção
    const filteredItems = selectedItems.filter( function(item) {
      const itemIsDifferent = item != itemId //false
      return itemIsDifferent
    })

    selectedItems = filteredItems
  } else {
  //se não estiver selecionado, adicionar a seleção. 
    selectedItems.push(itemId);
    
  }

  
  //atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems

}