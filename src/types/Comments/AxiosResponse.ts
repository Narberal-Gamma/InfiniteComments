import { IDislikeImages, ILikeImages } from "./Images";
import { IMessages } from "./Messages";

export interface IAxiosResponse {
    Messages: IMessages[],
    dislikeImages: IDislikeImages[],
    likeImages: ILikeImages[],
}