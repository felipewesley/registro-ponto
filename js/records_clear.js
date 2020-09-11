$('#btn-clear').click(function(e){
    const ask = `Realmente deseja apagar todos os seus registros atuais?`

    if(confirm(ask)){
        window.localStorage.clear()
        return alert('Registros excluídos com sucesso!')
    }
    return alert('Operação cancelada!')
})