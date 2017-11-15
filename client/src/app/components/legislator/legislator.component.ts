import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-legislator',
  templateUrl: './legislator.component.html',
  styleUrls: ['./legislator.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LegislatorComponent implements OnInit {
  dataRes: any;
  cid: string;
  cycle: string;
  candidate: Legislator[];
  industries: Industry[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DataService
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      this.cid = params.get('cid');
      this.cycle = '2018';
      return this.service.getCandIndustry(this.cid, this.cycle);
    })
    .subscribe((data) => {
      this.dataRes = data;
      console.log(data);
    })
  }

}

interface Legislator {
  cid: string,
  firstlast: string,
  party: string,
  gender: string,
  elected: string
}

interface Industry {
  code: string,
  name: string,
  indivs: string,
  pacs: string,
  total: string
}
