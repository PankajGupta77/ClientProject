import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';
import { WebsocketService } from '../../websocket-api.service';
@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class Page2Component  {

  drawingData: {x: number, y: number}[] = [];
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  drawingData1: any;
constructor(private drawingDataService: WebsocketService) {

  this.drawingDataService.drawingData$.subscribe(data => {
    this.drawingData1 = data;
    console.log(this.drawingData1)
    this.redraw();
  });
}
redraw() {
  const canvas = this.canvas.nativeElement;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

 
  context.strokeStyle = '#000000';

  if (this.drawingData1.length < 2) return;

  context.beginPath();
  context.moveTo(this.drawingData1[0].x, this.drawingData1[0].y);

  for (let i = 1; i < this.drawingData1.length; i++) {
    context.lineTo(this.drawingData1[i].x, this.drawingData1[i].y);
    context.stroke();
  }
  context.closePath();
}

}
