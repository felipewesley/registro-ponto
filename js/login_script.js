const USERNAME_LENGTH = 6

$('.input-value').focus(e => {
    $(e.target).toggleClass('init-focus')
}).blur(e => {
    $(e.target).toggleClass('init-focus')
})

$(document).ready(() => {
    $('#input-user').on('focus')
    $('button#btn-entrar').attr("disabled", "disabled")
})

$('#input-user').keyup(e => {
    
    let val = String(e.target.value)
    $(e.target).val(val.toUpperCase())
    
    if (val.length == USERNAME_LENGTH){
        $(e.target).removeClass('init-focus, error').addClass('success')
        $('button#btn-entrar').prop('disabled', false)
        return true
    } else if (val.length > USERNAME_LENGTH) {
        $(e.target).removeClass('success').addClass('error')
    } else {
        $(e.target).removeClass('error, success')
    }
    $('button#btn-entrar').attr("disabled", "disabled")
}).focus(e => {

    let element = e.target
    $(element).removeClass('error').addClass('init-focus')

}).blur(e => {
    
    let element = e.target
    $(element).removeClass('init-focus')

    if(String(element.value).length == USERNAME_LENGTH){
        $(element).removeClass('error').addClass('success')
    } else{
        $(element).removeClass('success').addClass('error')
    }
})

$('#input-password').keyup(e => {
    
    let val = String(e.target.value)

    if(val.length >= minLengthPassword){
        $(e.target).removeClass('init-focus, error').addClass('success')
    } else {
        $(e.target).removeClass('success').addClass('init-focus')
    }
}).blur(e => {
    let val = String(e.target.value)

    if(val.length < minLengthPassword && val.length != 0){
        $(e.target).addClass('error')
    }
})