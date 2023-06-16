import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchComments } from "../action-creators/comments"
import { IInitialStateProps } from "./types"
import { IAxiosResponse } from "../../types/Comments/AxiosResponse"
import { IMessages } from "../../types/Comments/Messages"

const initialState: IInitialStateProps = {
    comments: {
        Messages: [],
        dislikeImages: [],
        likeImages: [],
    },
    error: '',
    loading: true
}

const CommentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addLastComment(state, action: PayloadAction<{ comment: IMessages[], direction: string }>) {
            action.payload.comment.reverse().forEach(elem => {
                if (action.payload.direction === 'down') {
                    state.comments.Messages.push(elem)
                }
                if (action.payload.direction === 'up') {
                    state.comments.Messages.unshift(elem)
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending.type, (state) => {
            state.loading = true;
        }),
            builder.addCase(fetchComments.fulfilled.type, (state, action: PayloadAction<IAxiosResponse>) => {
                state.loading = false;
                state.comments = action.payload;
                state.error = '';
            }),
            builder.addCase(fetchComments.rejected.type, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.comments = {} as IAxiosResponse;
                state.error = action.payload;
            })
    }
})

export default CommentsSlice.reducer
export const { addLastComment } = CommentsSlice.actions