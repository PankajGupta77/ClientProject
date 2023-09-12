import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private drawingDataSubject = new BehaviorSubject<{x: number, y: number}[]>([]);
  drawingData$ = this.drawingDataSubject.asObservable();
  storedata: any;

  updateDrawingData(data: {x: number, y: number}[]) {
    this.drawingDataSubject.next(data);
  }
  constructor() {
    this.socket$ = webSocket('ws://localhost:3000'); 
    // Replace with your server URL
    this.socket$.subscribe(
      (data) => {
        // Handle incoming WebSocket data here
        console.log('Received:', data);
        this.storedata=data
        this.drawingDataSubject.next(this.storedata);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  


  private socket$: WebSocketSubject<any>;



  sendDrawingData(data: any) {
    this.socket$.next(data);
  }

}
