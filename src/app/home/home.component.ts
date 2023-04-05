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
  viewBy: string = "1";
  value: string = "";
  constructor(public router: Router) { }
  ngOnInit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.value = dd + '/' + mm + '/' + yyyy;
  }
  toOldStatsPage() {
    this.router.navigate(['old-stats']);
  }
  toLogsPage() {
    this.router.navigate(['logs']);
  }

  updateValue() {
    if (this.viewBy == "1") {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      this.value = mm + '/' + dd + '/' + yyyy;
    }
    else if (this.viewBy == "2") {
      var date1 = new Date();
      var date2 = new Date();
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      date1.setDate(date1.getDate() - date1.getDay());
      date2.setDate(date2.getDate() - date2.getDay());
      var startDayOfWeek = date1;
      date2.setDate(date2.getDate() + 7);
      var endDayOfWeek = date2;
      this.value = startDayOfWeek.getDate().toString() + " " + months[startDayOfWeek.getMonth()] + " - " + endDayOfWeek.getDate().toString() + " " + months[endDayOfWeek.getMonth()];
    }
    else if (this.viewBy == "3") {
      var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      var today = new Date();
      this.value = months[today.getMonth()];
    }
  }
}
