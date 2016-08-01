import {Room} from '../domains/room';
import {RoomBooking} from '../domains/room-booking';
import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from "angular2/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RoomBookingService {
  
  private bookingServiceUrl = 'http://localhost:73/mis/rooms';

  constructor(private http:Http) {    
  }
    
  public getRooms():Observable<Array<Room>> {
    return this.http.get(this.bookingServiceUrl).map(res => res.json());
  } 
  
  public getBookingsForRoom(roomId:any):Observable<Array<RoomBooking>> {
    let url = this.bookingServiceUrl + '/' + roomId + '/bookings';
    return this.http.get(url).map(res => res.json());
  }
  
  public getBooking(bookingId:any):Observable<RoomBooking> {
    let url = this.bookingServiceUrl + '/bookings/' + bookingId;
    return this.http.get(url).map(res => res.json());
  }
  
  public getRoom(roomId:any):Observable<Room> {
    let url = this.bookingServiceUrl + '/' + roomId;
    return this.http.get(url).map(res => res.json());
  }
  
  public bookRoom(booking:RoomBooking) {
    let url = this.bookingServiceUrl + "/" + booking.roomId + "/book";
    let json = JSON.stringify(booking);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    return this.http.put(url, json, {headers});
  }
}