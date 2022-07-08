import axios from 'axios'

class SignUpService {
    executeSignUpService(firstName, lastName, username, password, address, email, phone, carNumber) {
        return axios.get(`http://localhost:8080/signup`,
            { headers: { 
                firstname: firstName,
                lastname: lastName,
                username: username,
                credentials: this.createBasicAuthToken(username, password),
                address: address,
                email: email,
                phone: phone,
                carnumber: carNumber
             } })
    }
    
    executeAddUserService(otp) {
        return axios.get(`http://localhost:8080/add-user`,
            { headers: { 
                otp: otp
             } })
    }

    createBasicAuthToken(username, password) {
        return window.btoa(username + ":" + password)
    }
}

export default new SignUpService()