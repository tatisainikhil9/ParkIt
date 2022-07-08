import axios from 'axios'

class ConfirmBookingService {
    executeConfirmBookingService(location, address, date, startTime, endTime, username, dryCleaning, carWash, airFilling, tyreRepair, cost, slotId) {
        return axios.get(`http://localhost:8080/confirm-booking`,
            { headers: { 
                "location": location,
                "address": address,
                "booking-date": date,
                "start-time": startTime,
                "end-time": endTime,
                "username": username,
                "dry-cleaning": dryCleaning,
                "car-wash": carWash,
                "air-filling": airFilling,
                "tyre-repair": tyreRepair,
                "cost": cost,
                "slot-id": slotId
             } })
    }
}

export default new ConfirmBookingService()