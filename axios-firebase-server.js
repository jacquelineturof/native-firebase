import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://us-central1-court-queue-prototype.cloudfunctions.net/'
})

export default instance