import {Component} from 'angular2/core';
import {RoomBookingService} from '../../../services/room-booking-service';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {RoomBooking} from '../../../domains/room-booking';
import {Room} from '../../../domains/room';
import {CloneService} from '../../../services/clone-service';
import {EmployeeService} from '../../../services/employee-service';
declare var moment: any; //This is needed to make Typescript "happy". Ref: http://stackoverflow.com/a/35166209

@Component({
  selector :'booking',
  templateUrl: 'booking-panel.tpl.html',
  directives: [ROUTER_DIRECTIVES] 
})
export class BookingPanelComponent {
  private booking:RoomBooking = <RoomBooking>{};
  private bookingClone:RoomBooking = <RoomBooking>{};
  private room:Room;
  private bookingId:any;
  
  constructor(private routeParams:RouteParams, 
              private cloneService:CloneService<RoomBooking>,
              private bookingService:RoomBookingService,
              private router:Router,
              private employeeService:EmployeeService) {
    let roomId = routeParams.get('roomId');
    if(roomId != null) {
      bookingService.getRoom(roomId).subscribe(room => {
        this.room = room; 
		  });
    }
    
    this.bookingId = routeParams.get('bookingId');
    if(this.bookingId != null) {
      bookingService.getBooking(this.bookingId).subscribe(booking => {
        this.booking = booking; 
        this.bookingClone = cloneService.clone(this.booking);
		  });
    }
    else {
      let currentDate:Date = moment().format("DD-MM-YYYY");
      
      this.booking = new RoomBooking();
      this.booking.employeeId = this.employeeService.getLoggedInEmployeeId();
      this.booking.roomId = +roomId; // + operator convers string to number
      this.booking.bookFrom = currentDate;
      this.booking.bookFrom = currentDate;
    }
  }
  
  book() {
    
  }

  back() {
    this.router.navigate(['RoomPanel']);
  }
}