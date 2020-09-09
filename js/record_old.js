class Database {
    
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
    setItem(date, element){
        return window.localStorage.setItem(date, JSON.stringify(element))
    }
    removeItem(key){
        const r = this.getItem(key)
        const str = `Deseja realmente excluir o registro #${key} de ${Date(r).toString}?`
        if(confirm(str)){
            return window.localStorage.removeItem(key)
        }
        return false
    }
}

class Record {
    key
    entrada
    almocoEntrada
    almocoSaida
    saida
    constructor(key){
        try {
            this.key = key
        } catch (error) {
            alert(`Algo nao correu bem :( tente novamente mais tarde`)
            console.log(error)
            return false
        }
        return true
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
    if(!db.itemExists('PrimaryKey')){
        db.setItem('PrimaryKey', 0);
    }
})

$('#btn-recorder').click(e => {

    let date = $('#input-date').val()
    let type = $('#record-type').val()
    let time = $('#input-time').val()

    let element = {type,date,time}
    let key = db.getItem('PrimaryKey')
    let registro = new Record(key)

    if(db.itemExists(key)){
        let item = db.getItem(key)
        registro.jsonToRecord(item)
        console.log('ja existe registro')
    }
    registro.setRecord(type, element)

    console.log(registro)

    try {
        
        db.setItem(date,registro)
        alert(`Registro salvo com sucesso`)

    } catch(error){

        alert(`Algo deu errado na gravação :( tente novamente mais tarde`)
        console.log(error)
        return false
    }

    return $('#form-record').trigger('reset')
})
