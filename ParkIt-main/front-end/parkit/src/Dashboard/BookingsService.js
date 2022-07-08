import axios from 'axios'

class BookingsService {
    executeGetBookingsService(username) {
        return axios.get('http://localhost:8080/get-user-slots',
            { headers: { 
                username: username
            } })
    }
}

export default new BookingsService()