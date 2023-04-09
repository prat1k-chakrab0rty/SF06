import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  transactions: any[] = [];
  name: string = "";
  isSufficient: boolean = true;
  isAdmin: boolean = false;
  spendStatus: number = 3;
  amount: number[] = [360, 80];
  admin: string = "Sharuk";
  flatmate: string[] = ["Gaurav", "Pratik"];
  viewBy: string = "1";
  value: string = "";
  for: string = "";
  amountforTransaction: string = "";
  availableBalance: any;
  constructor(public router: Router, public service: ApiService) { }
  ngOnInit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.value = dd + '/' + mm + '/' + yyyy;
    this.service.getUserById(String(localStorage.getItem("userId"))).subscribe({
      next: (data) => {
        console.log(data);
        this.name = data[0].firstName;
        this.isAdmin = data[0].isAdmin;
      },
      error: (message) => {
        console.log(message);
      }
    })
    this.service.getAllTransactions().subscribe({
      next: (data) => {
        console.log(data);
        this.transactions = data;
      },
      error: (message) => {
        console.log(message);
      }
    })
    this.service.getAvailableBalance().subscribe({
      next: (data) => {
        console.log(data);
        this.availableBalance = data.balance;
      },
      error: (message) => {
        console.log(message);
      }
    })
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

  addTransaction() {
    this.service.createTransaction({ userId: localStorage.getItem("userId"), amount: Number(this.amountforTransaction), for: this.for }).subscribe({
      next: (data) => {
        console.log(data);
        this.service.getAllTransactions().subscribe({
          next: (data) => {
            console.log(data);
            this.transactions = data;
          },
          error: (message) => {
            console.log(message);
          }
        })
      },
      error: (message) => {
        console.log(message);
      }
    })
  }
  
  updateTransaction(id:string,i:number) {
    this.service.updateTransaction({ isPaidBack:true },id).subscribe({
      next: (data) => {
        console.log(data);
        this.transactions[i].isPaidBack=data.isPaidBack;
      },
      error: (message) => {
        console.log(message);
      }
    })
  }

  
}
