import axios from 'axios'

class RemoveUserService {
    executeGetUsersService(){
        return axios.get('http://localhost:8080/get-users')
    }

    executeRemoveUserService(username) {
        return axios.get('http://localhost:8080/remove-user',
            { headers: { 
                username: username
            } })
    }
}

export default new RemoveUserService()