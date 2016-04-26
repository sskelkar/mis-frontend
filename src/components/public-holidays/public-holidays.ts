import {Component} from 'angular2/core';
import {LeaveService} from '../../services/leave-service';
import {PublicHoliday} from '../../domains/public-holiday';

@Component({
  selector :'public-holidays',
  templateUrl: 'public-holidays.tpl.html'
   
})

export class PublicHolidaysComponent
{
  private holidays: PublicHoliday[];
  
  constructor(private leaveService: LeaveService)
  {
    
  }
    
  ngOnInit() 
  {
    this.leaveService.getAllHolidays().subscribe(e => this.holidays = e);
  }
}