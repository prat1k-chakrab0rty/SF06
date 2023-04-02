import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  transactions: any[] = [
    {
      payer: "Pratik",
      for: "Onion",
      amount: 60,
      isPaid: true
    },
    {
      payer: "Sharuk",
      for: "Potato",
      amount: 30,
      isPaid: false
    },
    {
      payer: "Gaurav",
      for: "Watermelon",
      amount: 50,
      isPaid: false
    }
  ];
  name: string = "Gaurav";
  isSufficient: boolean = true;
  spendStatus: number = 3;
  amount: number[] = [360, 80];
  admin: string = "Sharuk";
  flatmate: string[] = ["Gaurav", "Pratik"];

  constructor(public router: Router) { }

  toOldStatsPage() {
    this.router.navigate(['old-stats']);
  }
}
