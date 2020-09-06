class Register {
    format = {
        type: undefined, 
        date: undefined, 
        hour: undefined
    }
    entry
    lunchInit
    lunchReturn
    output
    constructor(obj){
        if (obj.entry != undefined) {
            this.entry = obj.entry
        }
        if (obj.lunchInit != undefined) {
            this.lunchInit = obj.lunchInit
        }
        if (obj.lunchReturn != undefined) {
            this.lunchReturn = obj.lunchReturn
        }
        if (obj.output != undefined) {
            this.output = obj.output
        }
    }
}

class Database {
        
    getUser() {
        return window.localStorage.getItem("user")
    }
    setUser(userCode) {
        window.localStorage.setItem("user", userCode)
        return 1
    }
    getLastInsertion() {
        return window.localStorage.getItem("lastInsertion")
    }
    getTodayRegister() {
        let data = new Date()
        let formatedDate = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
        return {
            key: formatedDate, 
            content: window.localStorage.getItem(String(formatedDate))
        }
    }
    setRegister(type, hour, date){
        const r = {

        }
        new Register(type, hour, date)

        if(this.getTodayRegister().content != null){
            window.localStorage.setItem(this.getTodayRegister().key, JSON.stringify(r))
        }
    }
}

const db = new Database
