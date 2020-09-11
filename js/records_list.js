class Database {
    getAllRegisters(){
        let index = window.localStorage.getItem('PrimaryKey')
        let arr = []

        for (let i = 0; i <= index; i++) {
            const record = JSON.parse(localStorage.getItem(i))
            
            if(record == null){
                continue
            }
            arr.push(record)
        }
        return arr
    }
}

const db = new Database

$(document).ready(() => {

    let listaRegistros = document.getElementById('listaRegistros')
    listaRegistros.innerHTML = ''

    if(window.localStorage.getItem('PrimaryKey') != undefined && parseInt(window.localStorage.getItem('PrimaryKey')) > 0){
        $('#alert-not-records').css('display', 'none')
    }

    let registros = db.getAllRegisters()

    registros.forEach(e => {

        let horario = []
        
        horario['entrada'] = e.entrada.time
        horario['almocoEntrada'] = e.almocoEntrada.time
        horario['almocoSaida'] = e.almocoSaida.time
        horario['saida'] = e.saida.time

        // horario.forEach(e => {
        //     if(e == undefined){
        //         e = '--:--'
        //     }
        // })

        let line = listaRegistros.insertRow();
        line.insertCell(0).innerHTML = `<b>${e.date}</b>`;
        line.insertCell(1).innerHTML = `${horario['entrada']}`; 
        line.insertCell(2).innerHTML = `${horario['almocoEntrada']}`; 
        line.insertCell(3).innerHTML = `${horario['almocoSaida']}`; 
        line.insertCell(4).innerHTML = `${horario['saida']}`; 
        
    })

})
