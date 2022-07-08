import axios from 'axios'

class AddSpaceService {
    executeAddSpaceService(location, address, workerUsername, workerPassword) {
        return axios.get('http://localhost:8080/add-space',
            { headers: { 
                location: location,
                address: address,
                worker: workerUsername,
                credentials: this.createBasicAuthToken(workerUsername, workerPassword)
            } })
    }

    createBasicAuthToken(username, password) {
        return window.btoa(username + ":" + password)
    }
}

export default new AddSpaceService()