import auth from "./auth/Auth.js"

export default class login {
    constructor(props){
        super(props)
        let auth = new Auth()
        auth.login()
    }
}