import { IAttachments } from "../../../types/Comments/Messages";

export interface IContentProps {
    attachments: IAttachments[],
    date: string,
    content: string,
}

export interface IFullMessage {
    fullText: string,
    halfMessage: string[],
    visibility: boolean
}