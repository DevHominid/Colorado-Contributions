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
  industries: Industry[];
  candInfo: CandInfo;
  private chartData: Array<any>;

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
      this.industries = data.candIndustry;
      this.candInfo = data.candInfo;
      console.log(data);
      console.log(this.industries);
      console.log(this.candInfo);

      this.generateData(this.industries);
    })
  }

  onBtnCycleClick(event) {
    const cycle = event.target.innerText;
    this.service.getCandIndustry(this.cid, cycle).subscribe((data) => {
      this.dataRes = data;
      this.industries = data.candIndustry;
      this.candInfo = data.candInfo;
      this.cycle = cycle;
      console.log(data);
      console.log(this.industries);
      console.log(this.candInfo);

      this.generateData(this.industries);
    }
  }

  generateData(industryData) {
    this.chartData = [];
    industryData.forEach((industry) => {
      this.chartData.push([
        industry.code,
        parseInt(industry.total)
      ]);
    });
  }
}

interface Industry {
  code: string,
  name: string,
  indivs: string,
  pacs: string,
  total: string
}

interface CandInfo {
  cid: string,
  cycle: string,
  lastUpdated: string,
  name: string,
  source: string,
}
