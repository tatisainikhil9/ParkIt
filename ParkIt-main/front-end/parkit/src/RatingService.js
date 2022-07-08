import axios from 'axios'

class RatingService {

    executeRatingService(location, address, date, startTime, endTime, rating) {
        return axios.get('http://localhost:8080/rating',
            { headers: { 
                location: location,
                address: address,
                bookingdate: date,
                starttime: startTime,
                endtime: endTime,
                rating: rating
            } })
    }
}

export default new RatingService()