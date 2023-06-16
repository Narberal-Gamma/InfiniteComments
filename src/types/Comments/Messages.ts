export interface IMessages {
    id: string,
    author: string,
    channel: string,
    content: string,
    date: string,
    region: string,
    senderNumber: string,
    attachments: IAttachments[],
}

export interface IAttachments {
    type: string,
    url: string
}