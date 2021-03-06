class Database {
    
    keyWord = 'PrimaryKey'
    dateWord = 'dateSrc'

    itemExists(key){
        const e = window.localStorage.getItem(key)
        return e == undefined ? false : true
    }
    getItem(key){
        const e = window.localStorage.getItem(key)
        return e == undefined ? false : e
    }
    getItemByDate(date = 'yyyy-mm-dd'){
        const lastIndex = parseInt(this.getItem(this.keyWord))
        // window.localStorage.setItem(this.dateWord, date)

        for (let index = 0; index <= lastIndex; index++) {
            const element = JSON.parse(this.getItem(index))

            if(element.date == date){
                return JSON.stringify(element)
            }
        }
        return false
    }
    setItem(index, element){
        return window.localStorage.setItem(index, JSON.stringify(element))
    }
    removeItem(key){
        const r = JSON.parse(this.getItem(key))
        const str = `Deseja realmente excluir o registro #${key} de ${r.date}?`
        
        return confirm(str) ? window.localStorage.removeItem(key) : false
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
    parseObject(json){
        return JSON.parse(json)
    }
}

class Record {
    index
    date
    entrada
    almocoEntrada
    almocoSaida
    saida
    /**
     * 
     * @param {String} date yyyy-mm-dd
     */
    constructor(date){
        try {            
            
            let d = String(date).split('-')

            let dateFormated = `${d[2]}/${d[1]}/${d[0]}`

            this.date = dateFormated

            let elementDefault = {
                type: "-",
                date: dateFormated,
                time: "--:--",
                setType(type){
                    this.type = type
                    return this
                }
            }
            
            this.__setEntrada(elementDefault.setType(1))
            this.__setAlmocoEntrada(elementDefault.setType(2))
            this.__setAlmocoSaida(elementDefault.setType(3))
            this.__setSaida(elementDefault.setType(4))

        } catch (error) {
            alert(`Algo nao correu bem :( tente novamente mais tarde`)
            console.log(error)
            return false
        }
        return true
    }
    setRecord(type, element){

        let d = String(element.date).split('-')

        element.date = `${d[2]}/${d[1]}/${d[0]}`
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
    setIndex(index){
        this.index = index
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

    let d = new Date()

    let today = `${d.getFullYear()}-${String(parseInt(d.getMonth())+1).padStart(2, '0')}-${d.getDate()}`
    $('#input-date').val(today)

    let now = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    $('#input-time').val(now)
    
})

$('#btn-recorder').click(event => {

    // let d = String($('#input-date').val()).split('-')
    // console.log(d)
    // let date = `${d[2]}/${d[1]}/${d[0]}`
    // console.log(date)
    let date = $('#input-date').val()
    let d = String(date).split('-')
    let dateFormated = `${String(d[2]).padStart(2, '0')}/${String(d[1]).padStart(2, '0')}/${d[0]}`
    
    let type = $('#record-type').val()
    let time = $('#input-time').val()
    let index = undefined
    // let registro = null

    let recordByType = {type,date,time}
    // Recupera os elementos armazenados através da data

    let registro = new Record(date)

    let element = JSON.parse(db.getItemByDate(dateFormated))

    console.log(element)

    if(db.itemExists(element.index)){

        index = element.index

        // captura o elemento do armazenamento e inicializa o objeto Record com os dados coletados
        let item = db.getItem(index)
        registro.jsonToRecord(item)

    } else {
        // Define o proximo index de registros
        db.IndexControllerIncrement()
        index = db.IndexController()

    }

    // Define o index do registro após a atualização de indices no armazenamento
    registro.setIndex(index)
    // Insere o registro atual capturado do form
    registro.setRecord(type, recordByType)

    try {
        
        db.setItem(index, registro)
        alert(`Registro salvo com sucesso`)

    } catch(error){

        alert(`Algo deu errado na gravação :( tente novamente mais tarde`)
    }

    return $('#form-record').trigger('reset')
})
