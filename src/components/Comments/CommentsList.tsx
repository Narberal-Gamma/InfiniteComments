import { FC, useEffect, useState } from "react";
import cl from './Comments.module.css';
import CommentsItem from "./CommentsItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchComments } from "../../store/action-creators/comments";
import Loader from "../UI/Loader/Loader";
import { $host } from "../../api";
import { IAxiosResponse } from "../../types/Comments/AxiosResponse";
import { addLastComment } from "../../store/slices/comments";
import Button from "../UI/Button/Button";

const Comments: FC = () => {

    const dispatch = useAppDispatch()
    const { comments, error, loading } = useAppSelector(state => state.comments)
    const [direction, setDirection] = useState('down')
    const [again, setAgain] = useState(false)
    const [firstTime, setFirstTime] = useState(false)
    let stop: number;

    useEffect(() => {
        dispatch(fetchComments())
    }, [])

    useEffect(() => {
        if (!loading) {
            if (comments.Messages) {
                if (direction === 'down') {
                    subscribe(comments.Messages[comments.Messages.length - 1]?.id, direction, firstTime)
                }
                if (direction === 'up') {
                    subscribe(comments.Messages[0]?.id, direction, firstTime)
                }
            }
        }
    }, [comments.Messages.length, again])

    const changeDirection = (direction: string) => {
        if (stop) {
            clearTimeout(stop)
        }
        setDirection(direction)
        if (direction === 'down') {
            subscribe(comments.Messages[0]?.id, direction, true)
        }
        if (direction === 'up') {
            subscribe(comments.Messages[comments.Messages.length - 1]?.id, direction, true)
        }
    }

    async function subscribe(lastCommentId: string, direction: string, firstTime: boolean = false) {
        try {
            console.log(lastCommentId, direction)
            stop = setTimeout(async () => {
                const { data } = await $host<IAxiosResponse | 'no message'>('/', {
                    method: 'POST',
                    data: {
                        'actionName': 'MessagesLoad',
                        'messageId': lastCommentId
                    },
                })
                if (data !== 'no message') {
                    setFirstTime(false)
                    dispatch(addLastComment({ comment: data.Messages, direction }))
                }
                if (data === 'no message') {
                    console.log(data)
                    clearTimeout(stop)
                    if (firstTime) {
                        setFirstTime(true)
                        if (direction === 'down') {
                            await subscribe(comments.Messages[0]?.id, 'down', firstTime)
                        }
                        if (direction === 'up') {
                            await subscribe(comments.Messages[comments.Messages.length - 1]?.id, 'up', firstTime)
                        }
                    } else {
                        setAgain(!again)
                        setFirstTime(false)
                    }
                }
            }, 2000);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={cl.container}>
            {loading && <Loader />}
            {error && <h1>{error}</h1>}
            <Button
                disabled={direction === 'up' ? true : false}
                style={{ border: '1px solid crimson', color: 'crimson' }}
                onClick={() => changeDirection('up')}
            >
                Получать новые сообщение сверху
            </Button>
            <Button
                disabled={direction === 'down' ? true : false}
                style={{ border: '1px solid #b10dcf', color: '#b10dcf' }}
                onClick={() => changeDirection('down')}
            >
                Получать новые сообщение снизу
            </Button>
            <hr /> <br />
            {comments.Messages?.map(message =>
                <CommentsItem key={message.id} message={message} />
            )}
        </div>
    )
}

export default Comments