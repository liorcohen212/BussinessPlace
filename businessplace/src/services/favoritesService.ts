import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/favorites`;

export function createFavoritesById(userId: number){
    return axios.post(api, {userId, cards: []} );
}

export function getFavorites(userId: number){
    return axios.get(`${api}?userId=${userId}`)}

    export async function addToFavorites(userId: number, cardToAdd: Card) {
        try {
        let res = await getFavorites(userId);
        res.data[0].cards.push({ ...cardToAdd}); 
        return axios.patch(`${api}/${userId}`, 
        // return axios.patch(`${api}/${res.data[0].userId}`, 
        {cards: res.data[0].cards,});
        } catch (error) {
        console.log(error);
        }
    }
export function checkIfFavorite(userId: number, cardIds: number[]) {
    return axios.get(`${api}/${userId}/cards`, {
        params: {
            cardIds: cardIds.join(','),},});
}

export async function removeFromFavorites(userId: number, cardId: number) {
    try {
        let res = await getFavorites(userId);
        res.data[0].cards = res.data[0].cards.filter((card: Card) => card.id !== cardId);
    return axios.patch(`${api}/${res.data[0].id}`, {
        cards: res.data[0].cards,
    });
    } catch (error) {
        console.log(error);
    }
}