function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {
        for(const state of states ){
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    } )
}
populateUfs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Select a City</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then( cities => {
        for(const city of cities ){
            citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


// Itens de coleta


const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelecteditem)

    }
    const collectedItems = document.querySelector("input[name=items]")

    let selectedItems = []

    function handleSelecteditem(event){
        
        const itemLi = event.target


         // add ou remover uma classe com js (toggle)
        itemLi.classList.toggle("selected")

        const itemId = itemLi.dataset.id
        
        // verificar se existem itens selecionados, se sim
        // pegar os itens selecionados
        const alreadySelected = selectedItems.findIndex(function (item){
            const itemFounded = item == itemId
            return itemFounded

            // msm com arrow function (=>)
            // const alreadySlected = selectedItems.findIndex(item => item == itemId)

        })


        // se já estiver selecionados, tirar selecao
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => {
                const ItemDifferent = item != itemId
                return ItemDifferent
            })
            selectedItems = filteredItems
        }else{
       // se nao estiver, add selecao
       selectedItems.push(itemId)

        }
       //att o campo escondido com os itens selecionados
       collectedItems.value = selectedItems
    }