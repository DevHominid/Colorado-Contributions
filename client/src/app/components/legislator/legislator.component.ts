import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-legislator',
  templateUrl: './legislator.component.html',
  styleUrls: ['./legislator.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LegislatorComponent implements OnInit {
  dataRes: any;
  cid: string;
  currentCycle: string;
  industries: Industry[];
  candInfo: CandInfo;
  private chartData: Array<any>;
  btnCycles: Array<string>;
  activeBtn: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DataService
  ) { }

  ngOnInit() {
    this.btnCycles = ['2012', '2014', '2016', '2018'];
    this.activeBtn = this.btnCycles[3];

    this.route.paramMap.switchMap((params: ParamMap) => {
      this.cid = params.get('cid');
      this.currentCycle = '2018';
      return this.service.getCandIndustry(this.cid, this.currentCycle);
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

  onBtnCycleClick(event, btn) {
    const cycle = event.target.innerText;
    this.service.getCandIndustry(this.cid, cycle).subscribe((data) => {
      this.dataRes = data;
      this.industries = data.candIndustry;
      this.candInfo = data.candInfo;
      this.currentCycle = cycle;
      console.log(data);
      console.log(this.industries);
      console.log(this.candInfo);

      this.setBtnActive(btn);

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

  setBtnActive(btn) {
    this.activeBtn = btn;
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
