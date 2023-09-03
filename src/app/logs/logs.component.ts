import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {
  isGetPressed: boolean = false;
  logsFilter: string = "0";
  admin: string = "Sharuk";
  timeFilter: string = "Day";
  logs: any[] = [
    {
      date: "02-04-2023",
      time: "14:22",
      type: 1,
      who: "Sharuk",
      sum: 10000,
    },
    {
      date: "02-04-2023",
      time: "15:10",
      type: 3,
      amount: 5000,
    },
    {
      date: "02-04-2023",
      time: "20:45",
      type: 2,
      who: "Pratik",
      sum: 220,
    },
  ];
  filteredLogs: any[] = [];
  credits: any[] = [];
  constructor(public router: Router, public service: ApiService) { }
  ngOnInit() {
    this.service.getCreditedTransactionForCurrentMonth().subscribe({
      next: (data) => {
        data.forEach((d: any) => {
          this.service.getUserById(d.userId).subscribe({
            next: (user) => {
              d.firstName = user[0].firstName;
              this.credits.push(d);
            },
            error: (message) => {
              console.log(message);
            }
          })
        });
      },
      error: (message) => {
        console.log(message);
      }
    })
  }
  toHomePage() {
    this.router.navigate(['home']);
  }

  toOldStatsPage() {
    this.router.navigate(['old-stats']);
  }

  reset() {
    this.isGetPressed = false;
  }

  filterLogs() {
    this.filteredLogs = this.logs.filter(l => l.type.toString() == this.logsFilter || this.logsFilter == "0");
    this.isGetPressed = true;
  }
}
