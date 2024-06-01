import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ cors: true })
  export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    private connectedClients: Map<string, Socket> = new Map();
  
    afterInit(server: Server) {
      console.log('WebSocket Gateway Initialized');
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
      // Associate the client with the userId (assumes userId is passed as query param)
      const userId = client.handshake.query.userId as string;
      if (userId) {
        this.connectedClients.set(userId, client);
      }
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
      // Remove the client from the connected clients map
      const userId = [...this.connectedClients.entries()].find(([_, socket]) => socket.id === client.id)?.[0];
      if (userId) {
        this.connectedClients.delete(userId);
      }
    }
  
    sendNotification(userId: string, title: string, message: string, data: any) {
      const client = this.connectedClients.get(userId);
      console.log(client, 'client here')
      if (client) {
        client.emit('notification', { title, message, data });
      }
    }
  }
  