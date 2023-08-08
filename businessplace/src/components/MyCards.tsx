import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteTheme } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Card from "../interfaces/Card";
import { deleteCard, getCardsByOwner} from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { addToFavorites, getFavorites, removeFromFavorites } from "../services/favoritesService";

interface MyCardsProps {
    cardInfo: any ;
    setCardInfo: Function;
    userInfo: any;
    setUserInfo: Function;
}

const MyCards: FunctionComponent<MyCardsProps> = ({cardInfo, setCardInfo ,userInfo ,setUserInfo}) => {
    let theme = useContext(SiteTheme)
    let navigate = useNavigate()
    let [favorites, setFavorites] = useState<number[]>([])
    let roles = (userInfo.role === "isBussiness" || userInfo.role === "isAdmin" || userInfo.role === "isUser");
    let [cards, setCards] = useState<Card[]>([]);
    let [dataUpdated, setDataUpdated] = useState<boolean>(false);
    let handleAddToFavorites = (card: Card) => {
        if (favorites.includes(card.id as number)) {
        removeFromFavorites(userInfo.userId, card.id as number)
            .then((res) => {
            setFavorites(favorites.filter((id) => id !== card.id));
            successMsg(`${card.title} business card was removed from favorites!`);
            })
            .catch((err) => { console.log(err); });
        } else {
        addToFavorites(userInfo.userId, card)
            .then((res) => {
            setFavorites([...favorites, card.id as number]);
            successMsg(`${card.title} business card was added to favorites!`);
            })
            .catch((err) => { console.log(err); });
        }
    };
    useEffect(() => {
        getFavorites(userInfo.id).then((res) => {
        let userFavorites = res.data.find((fav: any) => fav.userId === userInfo.id);
        let defaultCardIds: number[] = userFavorites?.cards.map((card: any) => card.id) || [];
        setFavorites(defaultCardIds)
        }).catch((err) => console.log(err))
        getCardsByOwner(userInfo.email)
        .then((res) => setCards(res.data))
        .catch((err) => console.log(err));
    }, [userInfo.email, dataUpdated, userInfo.id]);
    let handleDelete = (id:Number) => {
        if(window.confirm("Are you sure?")) {
            deleteCard(id)
            .then((res) => {
                navigate("/showBussiness")
                successMsg("Card deleted successfully!");
            })
            .catch((err) => {
                errorMsg("action declined")
                console.log(err)});
        }}
return(<>
        <div style={{color: theme.color, background: theme.background}}>
        <h1>Home</h1>
        {cards.length ? (
        <div className="container">
        <div className="row">
        {cards.map((card: Card) => (
        <div
            key={card.id}
            className="card col-md-4 mx-2 mb-5"
            style={{ width: "18rem",background: theme.cardBg }}
        >
            <img 
            src={card.imageUrl}
            className="card-img-top cardImg "
            alt={card.imageAlt} 
            style={{ width: "16.5rem", height: "16.5rem" }}
            onClick={() => navigate(`/showbussiness/show/${card.id}`)} />
            <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.subtitle}.</p>
            </div>
            <ul className="list-group list-group-flush">
            <li className="list-group-item mb-0" style={{background: theme.cardBg}}>{card.phone}</li>
            <li className="list-group-item mb-0" style={{background: theme.cardBg}}>{card.city}{card.street}{card.housenumber}</li>
            <li className="list-group-item mb-0" style={{background: theme.cardBg}}>{card.id}</li>
            </ul>
            <div className="card-body">
            <Link to="tel: {card.phone}" ><i className="fa-solid fa-phone"></i></Link>
                {roles && ( favorites.includes(card.id as number) ?(<>
                <div className="col right-icons text-end">
                    <Link to="/showbussiness" className="btn col text-danger" onClick={() => {
                        handleAddToFavorites(card);}}>
                            <i className="fa-solid fa-heart"></i>
                        </Link>
                </div>
                    </>) : (
                        <Link to="/showbussiness" className="btn col" onClick={() => {handleAddToFavorites(card);}}>
                            <i className="fa-solid fa-heart"></i>
                        </Link>
                    ))}
    <Link to="" className="btn btn-danger" onClick={() => handleDelete(card.id as Number)}><i className="fa-solid fa-trash"></i></Link>
    <Link to={`update/${card.id}`} className="btn btn-warning mx-1"><i className="fa-solid fa-pen-to-square"></i></Link>
            </div>
        </div>
        ))}
        </div>
        </div>
    ) : 
    (<p>No cards available</p>)
    }
    </div>
    </>);
}

export default MyCards;