import { FC, useState } from "react";
import cl from './Header.module.css';
import Button from "../../UI/Button/Button";
import { IHeaderProps, IInitialState } from "./types";

// Icons
import fav from '../../../assets/fav.png'
import notFav from '../../../assets/notFav.png'

const Header: FC<IHeaderProps> = ({ author, channel, id }) => {

    let initialState: IInitialState = { id, favorite: false }

    if (localStorage.getItem(id)) {
        let data: string = localStorage.getItem(id) || ""
        initialState = { id, favorite: Boolean(data) }
    }

    const [isFavorite, setIsFavorite] = useState(initialState)

    const saveFavoriteComments = () => {
        setIsFavorite({ id, favorite: !isFavorite.favorite })
        if (localStorage.getItem(id)) {
            localStorage.removeItem(id)
        } else {
            localStorage.setItem(id, 'true')
        }
    }

    return (
        <div className={cl.header}>
            <div className={cl.user}>
                <div className={cl.avatar}></div>
                <div className={cl.user_info}>
                    <h4>{author}</h4>
                    <p>{channel}</p>
                </div>
            </div>
            <div className={cl.buttons}>
                <Button>Левый</Button>
                <Button>Центр</Button>
                <Button>Правый</Button>
            </div>
            <div className={cl.icons}>
                <div className={cl.next} />
                <div className={cl.rect} />
                <div className={cl.setting} />
                <div
                    onClick={saveFavoriteComments}
                    style={{ backgroundImage: isFavorite.favorite ? `url(${fav})` : `url(${notFav})` }}
                    className={cl.favorite}
                />
            </div>
        </div>
    )
}

export default Header;