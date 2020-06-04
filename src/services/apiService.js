import axios from 'axios';

const endpoint = "http://localhost:9000"
export class ApiService {

    async sendSignup(data){
        var result = await axios.post(endpoint + '/signup', data);
        return result.data;
    }

    async sendLogin(data){
        var result = await axios.post(endpoint + '/auth', data);
        return result.data;
    }

    async submitArticle(data){
        var result = await axios.post(endpoint + '/submit', data);
        return result.data;
    }

    async search(data){
        var result = await axios.post(endpoint + '/search', data);
        return result.data;
    }


}