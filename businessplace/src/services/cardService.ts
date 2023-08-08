import axios from "axios";
import Card from "../interfaces/Card";

let api : string = `${process.env.REACT_APP_API}/cards`;

export function getcard(){
    return axios.get(api)
}

export function getCardById(id:Number){
    return axios.get(`${api}/${id}`);
}

export function getCardsByOwner(owner:string) {
    return axios.get(`${api}?owner=${owner}`);
}
export function addCard(newcard: Card){
    return axios.post(api, newcard)
}

export function updateCard(updatedcard: Card, id:Number){
    return axios.put(`${api}/${id}`, updatedcard);
}
export function deleteCard(id:Number){
    return axios.delete(`${api}/${id}`);
}
