import {Component} from 'angular2/core';
import {RoomBookingService} from '../../../services/room-booking-service';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Room} from '../../../domains/room';

@Component({
  selector :'room-panel',
  templateUrl: 'room-panel.tpl.html',
  directives: [ROUTER_DIRECTIVES] 
})
export class RoomPanelComponent
{
  private rooms: Array<Room>;
  
  constructor(private roomService: RoomBookingService)  {
  }
  
  ngOnInit() {
    this.roomService.getRooms().subscribe(data => this.rooms = data, e => console.log("Network problem while connecting to booking-service"));
  }
}