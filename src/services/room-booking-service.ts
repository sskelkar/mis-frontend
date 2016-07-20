import {Room} from '../domains/room';
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
  
  
}