import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "dgram";

import { Server } from "socket.io";
const chatsUser = [12, 9, 8]
@WebSocketGateway(5002, {namespace: '/chat', cors: true} )
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log("Initialized");
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage("message")
  handleMessage(client: any, data: any) {
    const token = client.handshake.auth.token
    const chatId = +client.handshake.auth.chatId

    if (chatsUser.includes(chatId)) {
      console.log("bbb")
      this.logger.log(`Message received from client id: ${client.id}`);
      this.logger.debug(`Payload: ${data}`);
      client.emit("recieveMessage", { chatId, data})

    }
  }

  @SubscribeMessage("recieveMessage")
  handleRecieve(client: any, data: any) {
    console.log("aaaa")
  }
}

