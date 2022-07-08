import axios from 'axios'

class SignInService {
    executeLogInService(username, password) {
        return axios.get(`http://localhost:8080/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    createBasicAuthToken(username, password) {
        return window.btoa(username + ":" + password)
    }
}

export default new SignInService()