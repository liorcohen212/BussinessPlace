import axios from "axios";
import User from "../interfaces/User";

let api : string = `${process.env.REACT_APP_API}/users`;

export function checkUser(userToCheck: User) {
    return axios.get(`${api}?email=${userToCheck.email}&password=${userToCheck.password}`);
}
export function addUser(newUser: User){
    return axios.post(api, newUser);
}
export function getUserById(id:Number){
    return axios.get(`${api}/${id}`);
}
export function updateUser(updatedUser: User, id:Number){
    return axios.put(`${api}/${id}`, updatedUser);
}
export function getUser(){
    return axios.get(api)
}
export function deleteUser(id:Number){
    return axios.delete(`${api}/${id}`);
}