import axios from "axios";
import http from "./httpService";
import bookDetails from "../Components/bookDetails";
import jwtDecode from "jwt-decode";
const apiAddress='https://localhost:44309/api/library';
const authApiAddress='https://localhost:44309/api/auth';
const storageLocationConstant ='authToken';

export function getBookList(){
    return http.get(apiAddress + '/booklist');
}

export function getBookDetails(BookCopyId){
    return http.get(apiAddress+ '/bookDetails/' + BookCopyId);
}

export async function LoginProvider(loginObject){
    const headers={
        "access-control-allow-credentials": "true",
        "access-control-allow-methods": "*"
    }
    const response = await axios.post(authApiAddress + '/login',loginObject,{
     headers:headers
    });


    if(response.status ===200){
        localStorage.setItem(storageLocationConstant, response.data.message);
    }
    return response;
}

export async function Reserve(ReservationData){
    const header = getAuthHeader();
    return axios.post(apiAddress +'/reserve',ReservationData,{
        headers:header
    });
}

export async function UnReserve(reservationID){
    const header = getAuthHeader();
    return axios.put(apiAddress + '/unreserve/' + reservationID,{},{
        headers:header
    });
}

export async function myReservations(userName){
    const header = getAuthHeader();
    return http.get(apiAddress+"/myreservations/" + userName,{headers:header});
}

export function logout(){
    localStorage.removeItem(storageLocationConstant);
}

function getAuthHeader(){
    const token = localStorage.getItem(storageLocationConstant);
    const tokenMessage = 'Bearer ' +token;
    const header = {Authorization:tokenMessage}
    return header;
}


export function getLoginToken(){
    if(localStorage.getItem(storageLocationConstant)===null){
        return null;
    }

    const token = localStorage.getItem(storageLocationConstant);
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    } catch (e) {
        return null;
    }
    return null;
}
