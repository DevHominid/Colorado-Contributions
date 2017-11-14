import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:Http) {
    console.log('Data service connected...');
  }

  getLegislators() {
    return this.http.get('http://localhost:8080/api/legislators/CO')
      .map(res => res.json());
  }

  getCandIndustry(cid, cycle) {
    return this.http.get('http://localhost:8080/api/candidate/:cid/industries/:cycle')
      .map(res => res.json());
  }
}
