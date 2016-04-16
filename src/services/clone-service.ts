import {Injectable} from 'angular2/core';

@Injectable()
export class CloneService<T> {
  
  clone(item: T) :T {
    // terrible clone implementation!
    return JSON.parse(JSON.stringify(item));
  }
}