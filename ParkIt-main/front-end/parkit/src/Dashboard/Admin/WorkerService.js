import axios from 'axios'

class WorkerService {
    executeRemoveWorkerService(worker) {
        return axios.get(`http://localhost:8080/remove-worker`,
            { headers: { 
                worker: worker
            } })
    }
    executeGetWorkersService() {
        return axios.get(`http://localhost:8080/show-workers`)
    }
}

export default new WorkerService()