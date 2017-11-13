import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-congress',
  templateUrl: './congress.component.html',
  styleUrls: ['./congress.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CongressComponent implements OnInit {

  constructor(private dataService: DataService) {

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

      console.log(congress);
    });
  }

}
