import axios from "axios";
const initialInstance = axios.create({
    baseURL:'https://hotelsystemapi.onrender.com/api/'
})
export default initialInstance