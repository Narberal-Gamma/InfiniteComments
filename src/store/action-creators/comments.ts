import { createAsyncThunk } from '@reduxjs/toolkit'
import { $host } from '../../api'
import { getErrorType } from '../../utils/getErrorType'
import { IAxiosResponse } from '../../types/Comments/AxiosResponse'

export const fetchComments = createAsyncThunk(
    'users/comments',
    async (_, thunkAPI) => {
        try {
            const { data } = await $host<IAxiosResponse>('/', {
                method: 'POST',
                data: {
                    'actionName': 'MessagesLoad',
                    'messageId': 0
                },
            })
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorType(err))
        }
    }
)