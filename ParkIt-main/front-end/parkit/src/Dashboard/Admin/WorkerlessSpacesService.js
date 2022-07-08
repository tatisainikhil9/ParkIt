import axios from 'axios'

class WorkerlessSpacesService {
    executeGetWorkerlessSpacesService(){
        console.log("Called service");
        return axios.get('http://localhost:8080/show-workerless-spaces')
    }
}

export default new WorkerlessSpacesService()