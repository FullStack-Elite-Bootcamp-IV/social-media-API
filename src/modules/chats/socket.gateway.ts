import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Server } from "socket.io";
import { ChatService } from "./services/chats.service";
@WebSocketGateway(5003, {namespace: '/chat', cors: true} )
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatService: ChatService,
  ) {}
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log("Initialized");
  }
  
  async handleConnection(socket: Socket) {

   const userId = socket.handshake.auth.token  

    // TO DO procesar la userid apartir del token

    // TO PRODUCTION Buscar en la base de datos todos los chats (chatid)
   // const userChats = await this.chatService.findChatsByUser(userId)  
    
   // IN DEV
   const userChats = [{id: "1"}, {id: "3"}, {id: "5"}] 


    // Unir al usuario a las rooms (chatid) especificas
    userChats.forEach(chat => {
      socket.join(chat.id)
    });

    this.logger.log(`Client id: ${socket.id} connected`);
  }

  handleDisconnect(socket: Socket) {

    this.logger.log(`Cliend id:${socket.id} disconnected`);
  }

  @SubscribeMessage("message")
  handleMessage(socket: Socket, data: any) {
    const userId = socket.handshake.auth.token
    this.io.to(data[1]).emit("receiveMessage", {"message": data[0], "chatId": data[1], "userId": userId } )

  }

  @SubscribeMessage("recieveMessage")
  handleRecieve(client: any, data: any) {
    console.log("aaaa")
  }
}

