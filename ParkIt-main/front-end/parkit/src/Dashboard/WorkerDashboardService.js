import axios from 'axios'

class WorkerDashboardService {

    executeGetBookingsService(worker) {
        return axios.get('http://localhost:8080/get-worker-slots',
        { headers: { 
            worker: worker
        } })
    }
}

export default new WorkerDashboardService()