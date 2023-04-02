import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-old-stats',
  templateUrl: './old-stats.component.html',
  styleUrls: ['./old-stats.component.css']
})
export class OldStatsComponent {
  isGetPressed: boolean = false;
  tableFilter:string="Day";
  data: any[] = [
    {
      for: "Onion",
      amount: 60,
    },
    {
      for: "Potato",
      amount: 30,
    },
    {
      for: "Watermelon",
      amount: 50,
    }
  ];
  amountCollected:number=35000;
  limit:number=30000;
  saved:number=3000;
  result:number=Math.abs(this.amountCollected-this.limit -this.saved);
  constructor(public router: Router) { }

  toHomePage() {
    this.router.navigate(['home']);
  }

  toLogsPage() {
    this.router.navigate(['logs']);
  }
  
  getData(){
    this.isGetPressed=true;
  }

  reset(){
    this.isGetPressed=false;
  }
}
