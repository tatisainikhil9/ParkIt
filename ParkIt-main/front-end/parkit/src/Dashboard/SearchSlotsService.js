import axios from 'axios'

class SearchSlotsService {
    executeSearchSlotsService(location, date, startTime, endTime) {
        return axios.get(`http://localhost:8080/show-slots`,
            { headers: { 
                "location": location,
                "booking-date": date,
                "start-time": startTime,
                "end-time": endTime
             } })
    }

    executeSearchUnavailableSlotsService(location, date, startTime, endTime) {
        return axios.get(`http://localhost:8080/show-unavailable-slots`,
            { headers: { 
                "location": location,
                "booking-date": date,
                "start-time": startTime,
                "end-time": endTime
             } })
    }

    executeGetLocations() {
        return axios.get(`http://localhost:8080/get-locations`)
    }
}

export default new SearchSlotsService()