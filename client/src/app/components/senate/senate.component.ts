import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-senate',
  templateUrl: './senate.component.html',
  styleUrls: ['./senate.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SenateComponent implements OnInit {
  title: string;
  senate: Legislator[];

  constructor(private dataService: DataService) {
    this.title = 'senate';
  }

  ngOnInit() {
    this.dataService.getLegislators().subscribe((data) => {
      const senate = data.legislators.filter((legislator) => {
        const re = new RegExp('senate', 'i');
        const office = legislator.congressoffice;
        if (re.test(office)) {
          return legislator;
        }
      });
      this.senate = senate;
      console.log(senate);
    });
  }

}

interface Legislator {
  cid: string,
  firstlast: string,
  party: string,
  gender: string,
  elected: string
}
