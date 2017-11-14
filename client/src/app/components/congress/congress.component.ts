import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-congress',
  templateUrl: './congress.component.html',
  styleUrls: ['./congress.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CongressComponent implements OnInit {
  title: string;
  congress: Legislator[];

  constructor(private dataService: DataService) {
    this.title = 'congress';
  }

  ngOnInit() {
    this.dataService.getLegislators().subscribe((data) => {
      const congress = data.legislators.filter((legislator) => {
        const re = new RegExp('house', 'i');
        const office = legislator.congressoffice;
        if (re.test(office)) {
          return legislator;
        }
      });
      this.congress = congress;
      console.log(congress);
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
