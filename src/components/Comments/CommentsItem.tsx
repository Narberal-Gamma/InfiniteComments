import { FC } from "react";
import cl from './Comments.module.css';
import Header from "./Header/Header";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import { ICommentsItemProps } from "./types";

const CommentsItem: FC<ICommentsItemProps> = ({ message }) => {
    return (
        <div className={cl.item}>
            <Header author={message.author} channel={message.channel} id={message.id} />
            <Content attachments={message.attachments} date={message.date} content={message.content} />
            <Footer />
        </div>
    )
}

export default CommentsItem