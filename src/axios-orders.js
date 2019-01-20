import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-ceefa.firebaseio.com/"
});

export default instance;