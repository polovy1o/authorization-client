import axios from 'axios'

class Auth {
    constructor()
    {
        this.instance = axios.create({
            timeout: 8000,
            baseURL: process.env.REACT_APP_SERVER_URL
        })
        console.log(process.env.REACT_APP_SERVER_URL)
    }

    register(data)
    {
        return this.instance.post('/register', data)
    }

    confirmEmail(code)
    {
        return this.instance.post('/register/' + code)
    }

    login(data)
    {
        return this.instance.post('/login', data)
    }

    resetPassword(email)
    {
        return this.instance.post('/reset', { email })
    }

    getPasswordCodeUser(code)
    {
        return this.instance.get('/reset/' + code)
    }

    setPassword(code, newPassword)
    {
        return this.instance.put('/reset/' + code, { newPassword })
    }
}

const AuthService = new Auth()

export default AuthService;