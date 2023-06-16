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

const CommentsList: FC = () => {

    const dispatch = useAppDispatch()
    const { comments, error, loading } = useAppSelector(state => state.comments)
    const [direction, setDirection] = useState('down')
    const [disabled, setDisabled] = useState(false)
    let stop: number;
    let delay = 5000;

    useEffect(() => {
        dispatch(fetchComments())
    }, [])

    useEffect(() => {
        if (!loading) {
            if (comments.Messages) {
                let first = comments.Messages[0]?.id
                let last = comments.Messages[comments.Messages.length - 1]?.id
                subscribe(first, last, direction, false)
            }
        }
    }, [comments.Messages?.length])

    const changeDirection = (direction: string) => {
        if (stop) {
            clearTimeout(stop)
        }

        let first = comments.Messages[0].id
        let last = comments.Messages[comments.Messages.length - 1].id
        setDirection(direction)

        subscribe(first, last, direction, true)

        setDisabled(true)
        setTimeout(() => {
            setDisabled(false)
        }, delay)
    }

    const subscribe = async (first: string, last: string, direction: string, changed: boolean = false) => {
        stop = setTimeout(async () => {
            if (changed) {
                let tmp = first
                first = last
                last = tmp
            }
            const { data } = await $host<IAxiosResponse | 'no message'>('/', {
                method: 'POST',
                data: {
                    'actionName': 'MessagesLoad',
                    'messageId': direction === 'down' ? last : first
                },
            })
            if (data === 'no message') {
                subscribe(first, last, direction)
            } else {
                dispatch(addLastComment({ comment: data.Messages, direction }))
            }
        }, delay)
    }

    return (
        <div className={cl.container}>
            {loading && <Loader />}
            {error && <h1>{error}</h1>}
            {disabled && <h3>Чтобы изменить порядок подождите 5 секунд</h3>}
            {
                direction === 'down'
                    ?
                    <Button
                        disabled={disabled}
                        onClick={() => changeDirection('up')}
                        style={{ border: `1px solid ${disabled ? 'gray' : 'crimson'}`, color: `${disabled ? 'gray' : 'crimson'}` }}
                    >
                        Получать новые сообщение сверху
                    </Button>
                    :
                    <Button
                        disabled={disabled}
                        onClick={() => changeDirection('down')}
                        style={{ border: `1px solid ${disabled ? 'gray' : '#b10dcf'}`, color: `${disabled ? 'gray' : '#b10dcf'}` }}
                    >
                        Получать новые сообщение снизу
                    </Button>
            }
            <hr /> <br />
            {comments.Messages?.map(message =>
                <CommentsItem key={message.id} message={message} />
            )}
        </div>
    )
}

export default CommentsList