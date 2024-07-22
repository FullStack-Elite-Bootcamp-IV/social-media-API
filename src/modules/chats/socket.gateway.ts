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
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway(5002, {namespace: '/chat', cors: true} )
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService
  ) {}

  private readonly logger = new Logger(ChatGateway.name); // Initialize the logger

  @WebSocketServer() io: Server; // Declare the WebSocket server

  afterInit() {
    this.logger.log("Initialized"); // Log when the gateway is initialized
  }

  // Handle new client connections
  async handleConnection(socket: Socket) {

   const token = socket.handshake.auth.token 
   
    try {
    const user = await this.jwtService.verifyAsync(token, {
      secret: process.env.AUTH_SECRET,
    });
      // TO PRODUCTION Buscar en la base de datos todos los chats (chatid)
    const userChats = await this.chatService.findChatsByUser(user.id)
    userChats.forEach(chat => { 
      socket.join(chat.chatId)
    });
    }
  catch(e){
    socket.emit("error", "JwtInvalid")
  }
    // Unir al usuario a las rooms (chatid) especificas

    this.logger.log(`Client id: ${socket.id} connected`); // Log the connection
  }

  // Handle client disconnections
  handleDisconnect(socket: Socket) {

    this.logger.log(`Cliend id:${socket.id} disconnected`);
  }

  // Handle incoming messages
  @SubscribeMessage("message")
  async handleMessage(socket: Socket, data: any) {
    try {
      const user = await this.jwtService.verifyAsync(socket.handshake.auth.token, {
        secret: process.env.AUTH_SECRET,
      });
      this.io.to(data[1]).emit("receiveMessage", {"message": data[0], "chatId": data[1], "userId": user.id } )
    }catch(e){
        socket.emit("error", "JwtInvalid")
      }

  }

  // Handle received messages
  @SubscribeMessage("receiveMessage")
  handleReceive(client: any, data: any) {
    console.log("Message received"); // Log when a message is received
  }
}
