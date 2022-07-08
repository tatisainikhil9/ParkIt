import axios from 'axios'

class DeleteSlotService {
    executeGetSlotsService() {
        return axios.get(`http://localhost:8080/get-slots`)
    }
    executeDeleteSlotService(location, address, date, startTime, endTime, username) {
        return axios.get(`http://localhost:8080/delete-slot`,
            {
                headers: {
                    "location": location,
                    "address": address,
                    "booking-date": date,
                    "start-time": startTime,
                    "end-time": endTime,
                    "username": username
                }
            })
    }
}

export default new DeleteSlotService()