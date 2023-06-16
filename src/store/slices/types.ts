import { IAxiosResponse } from "../../types/Comments/AxiosResponse";

export interface IInitialStateProps {
    comments: IAxiosResponse;
    loading: boolean;
    error: string
}