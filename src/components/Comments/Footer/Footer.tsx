import { FC } from "react";
import cl from './Footer.module.css'

const Footer: FC = () => {
    return(
        <div className={cl.footer}>
            <span className={cl.main}>#Новое</span>
            <span className={cl.common}>#Эксперт</span>
        </div>
    )
}

export default Footer