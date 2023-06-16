import { configureStore } from "@reduxjs/toolkit"
import CommentReducer from "./slices/comments"

const setupStore = () => {
    return configureStore({
        reducer: {
            comments: CommentReducer
        }
    })
}

export const store = setupStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch