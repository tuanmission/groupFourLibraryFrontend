import axios from "axios";
import { toast } from "react-toastify";
axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        toast.error("An unexpected error occured.s");
    } else if (error.response.status == 404) {
        toast.error("Cannot find the resource specified");
    } else if (error.response.status == 500) {
        toast.error("A Server Error has occured.");
    }

    console.log("INTERCEPTED CALLED");
    console.log("Logging the Error, ");

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};