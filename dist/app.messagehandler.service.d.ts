export declare class MassageHandler {
    messageType: string;
    private readonly clientId;
    message: any;
    createMessage(clientId: any, text: string): void;
    sendMassage(): {
        event: string;
        data: any;
    };
}
