class Database {
    
    keyWord = 'PrimaryKey'
    dateWord = 'dateSrc'
    itemExists(key){
        const e = window.localStorage.getItem(key)
        if(e == undefined){
            return false
        }
        return true
    }
    getItem(key){
        const e = window.localStorage.getItem(key)
        if(e == undefined){
            return false
        }
        return e
    }
    getItemByDate(date = 'yyyy-mm-dd'){
        const lastIndex = parseInt(this.getItem(this.keyWord))
        window.localStorage.setItem(this.dateWord, date)

        for (let index = 0; index <= lastIndex; index++) {
            const element = JSON.parse(this.getItem(index))

            if(element.key == date){
                return JSON.stringify(element)
            }
        }
        return false
    }
    setItem(index, element){
        // const i = this.IndexController()
        return window.localStorage.setItem(index, JSON.stringify(element))
    }
    removeItem(key){
        const r = this.getItem(key)
        const str = `Deseja realmente excluir o registro #${key} de ${Date(r.key).toString}?`
        if(confirm(str)){
            return window.localStorage.removeItem(key)
        }
        return false
    }
    IndexController(){
        return this.getItem(this.keyWord)
    }
    IndexControllerIncrement(){
        return window.localStorage.setItem(
            this.keyWord, 
            parseInt(this.getItem(this.keyWord))+1
        )
    }
}

class Record {
    key
    date
    entrada
    almocoEntrada
    almocoSaida
    saida
    constructor(date){
        try {
            this.date = date
        } catch (error) {
            alert(`Algo nao correu bem :( tente novamente mais tarde`)
            console.log(error)
            return false
        }
        return true
    }
    getKey(){
        return this.key
    }
    setKey(key){
        this.key = key
    }
    setRecord(type, element){
        switch(parseInt(type)){
            case 1:
                this.__setEntrada(element)
                break
            case 2:
                this.__setAlmocoEntrada(element)
                break
            case 3:
                this.__setAlmocoSaida(element)
                break
            case 4:
                this.__setSaida(element)
                break
            default:
                return false
        }
        return true
    }
    jsonToRecord(jsonElement){
        let e = JSON.parse(jsonElement)
        try {
            this.setKey(e.key)                  // Chave do elemento no armazenamento
            this.setRecord(1, e.entrada)        // 1 - Entrada
            this.setRecord(2, e.almocoEntrada)  // 2 - Almoço - início
            this.setRecord(3, e.almocoSaida)    // 3 - Almoço - fim
            this.setRecord(4, e.saida)          // 4 - Saída
        } catch (error) {
            console.log(error)
            return false
        }
        return true
    }
    __setEntrada(element){
        this.entrada = element
    }
    __setAlmocoEntrada(element){
        this.almocoEntrada = element
    }
    __setAlmocoSaida(element){
        this.almocoSaida = element
    }
    __setSaida(element){
        this.saida = element
    }
}

const db = new Database

$(document).ready(() => {
    if(!db.itemExists(db.keyWord)){
        window.localStorage.setItem(db.keyWord, 0)
    }
})

$('#btn-recorder').click(event => {

    let date = $('#input-date').val()
    let type = $('#record-type').val()
    let time = $('#input-time').val()

    let element = {type,date,time}
    // Recupera os elementos armazenados através da data
    let e = JSON.parse(db.getItemByDate(date))

    let registro = new Record(date)

    if(db.itemExists(e.key)){
        let item = db.getItem(e.key)
        registro.jsonToRecord(item)
    } else {
        db.IndexControllerIncrement()
    }
    registro.setRecord(type, element)

    try {
        
        db.setItem(e.key, registro)
        alert(`Registro salvo com sucesso`)

    } catch(error){

        alert(`Algo deu errado na gravação :( tente novamente mais tarde`)
    }

    return $('#form-record').trigger('reset')
})
