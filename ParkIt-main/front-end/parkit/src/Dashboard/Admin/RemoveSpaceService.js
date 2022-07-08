import axios from 'axios'

class RemoveSpaceService {
    executeRemoveSpaceService(location, address) {
        return axios.get(`http://localhost:8080/remove-space`,
            { headers: { 
                location: location,
                address: address
            } })
    }
    executeGetSpacesService() {
        return axios.get(`http://localhost:8080/show-spaces`)
    }
}

export default new RemoveSpaceService()