import { FC, useState } from "react";
import cl from './Content.module.css';
import { IContentProps, IFullMessage } from "./types";

const Content: FC<IContentProps> = ({ attachments, content, date }) => {

    const time = date.split(' ')[1].slice(0, 5);

    const [message, setMessage] = useState<IFullMessage>({
        fullText: content,
        halfMessage: content.split(' ').slice(0, 15),
        visibility: false
    })

    const showFullMessage = () => {
        setMessage({ ...message, visibility: true })
    }

    const checkTheNeed = message.halfMessage.length === 15 && !message.visibility

    return (
        <div className={cl.content}>
            <div className={cl.time}>{time}</div>
            <div className={cl.text}>
                {message.visibility
                    ? <p>{message.fullText}</p>
                    : <p>{message.halfMessage.join(' ')}</p>
                }
                {checkTheNeed && <div onClick={() => showFullMessage()}>Далее</div>}
                {attachments[0]?.type === 'image' && <img className={cl.image} src={attachments[0].url} />}
                {attachments[0]?.type === 'video' && <video className={cl.video} src={attachments[0].url} controls />}
            </div>
        </div>
    )
}

export default Content;