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

@WebSocketGateway(5002, {namespace: '/chat', cors: true} )
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatService: ChatService, // Inject the ChatService
  ) {}

  private readonly logger = new Logger(ChatGateway.name); // Initialize the logger

  @WebSocketServer() io: Server; // Declare the WebSocket server

  afterInit() {
    this.logger.log("Initialized"); // Log when the gateway is initialized
  }

  // Handle new client connections
  async handleConnection(socket: Socket) {
    const userId = socket.handshake.auth.token; // Get the user ID from the token

    // TO DO: Process the user ID from the token

    // TO PRODUCTION: Fetch all chat IDs for the user from the database
    // const userChats = await this.chatService.findChatsByUser(userId);

    // IN DEV: Dummy data for user chats
    const userChats = [{id: "1"}, {id: "3"}, {id: "5"}];

    // Join the user to specific chat rooms
    userChats.forEach(chat => {
      socket.join(chat.id);
    });

    this.logger.log(`Client id: ${socket.id} connected`); // Log the connection
  }

  // Handle client disconnections
  handleDisconnect(socket: Socket) {
    this.logger.log(`Client id: ${socket.id} disconnected`); // Log the disconnection
  }

  // Handle incoming messages
  @SubscribeMessage("message")
  handleMessage(socket: Socket, data: any) {
    this.io.to(data[1]).emit("receiveMessage", { "message": data[0], "chatId": data[1] }); // Emit the message to the specified chat room
  }

  // Handle received messages
  @SubscribeMessage("receiveMessage")
  handleReceive(client: any, data: any) {
    console.log("Message received"); // Log when a message is received
  }
}
