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
  spendStatus: number = 0;
  viewBy: string = "day";
  value: string = "";
  for: string = "";
  amountforTransaction: string = "";
  availableBalance: number = 0;
  totalCreditedBalance: number = 0;
  dueDetailsOfUser: any = [];
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
    this.service.getAllTransactions(this.viewBy).subscribe({
      next: (data) => {
        var i = 1;
        console.log(data);
        data.forEach((t: any) => {
          t.index = i++;
          t.isTransaction = true;
        });
        this.transactions = data;
      },
      error: (message) => {
        console.log(message);
      }
    })
    this.service.getAvailableBalance().subscribe({
      next: (data) => {
        this.service.getTotalCreditedAmount().subscribe({
          next: (data) => {
            console.log(data);
            this.totalCreditedBalance = data.amount;
            this.calculateSpendoMeter();
            this.service.getDuesDetail().subscribe({
              next: (data) => {
                console.log(data);
                this.dueDetailsOfUser = data;
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
        console.log(data);
        this.availableBalance = data.balance;
        if (this.availableBalance > 1000) {
          this.isSufficient = true;
        }
        else {
          this.isSufficient = false;
        }
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
    if (this.viewBy == "day") {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      this.value = dd + '/' + mm + '/' + yyyy;
      this.service.getAllTransactions(this.viewBy).subscribe({
        next: (data) => {
          console.log(data);
          var i = 1;
          data.forEach((t: any) => {
            t.index = i++;
            t.isTransaction = true;
          });
          this.transactions = data;
        },
        error: (message) => {
          console.log(message);
        }
      })
    }
    else if (this.viewBy == "week") {
      var date1 = new Date();
      var date2 = new Date();
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      var day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      date1.setDate(date1.getDate() - date1.getDay() + 1);
      date2.setDate(date2.getDate() - date2.getDay());
      var startDayOfWeek = date1;
      date2.setDate(date2.getDate() + 7);
      var endDayOfWeek = date2;
      this.value = startDayOfWeek.getDate().toString() + " " + months[startDayOfWeek.getMonth()] + " - " + endDayOfWeek.getDate().toString() + " " + months[endDayOfWeek.getMonth()];
      this.transactions = [];
      this.service.getAllTransactions(this.viewBy).subscribe({
        next: (data) => {
          console.log(data);
          data.forEach((t: any) => {
            t.timeStamp = (new Date(t.timeStamp).getDay() - 1);
          });
          var lastDay = data[0].timeStamp;
          var i = 1;
          this.transactions[0] = { date: day[data[0].timeStamp], isTransaction: false };
          data.forEach((t: any) => {
            if (lastDay != t.timeStamp) {
              this.transactions.push({ date: day[t.timeStamp], isTransaction: false });
              lastDay = t.timeStamp;
            }
            t.index = i++;
            t.isTransaction = true;
            this.transactions.push(t);
          });
          console.log(this.transactions);
        },
        error: (message) => {
          console.log(message);
        }
      })
    }
    else if (this.viewBy == "month") {
      var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      var today = new Date();
      this.value = months[today.getMonth()];
      this.transactions = [];
      this.service.getAllTransactions(this.viewBy).subscribe({
        next: (data) => {
          console.log(data);
          data.forEach((t: any) => {
            t.timeStamp = t.timeStamp.split('T')[0].toString();
          });
          var lastDate = data[0].timeStamp;
          var i = 1;
          this.transactions[0] = { date: data[0].timeStamp, isTransaction: false };
          data.forEach((t: any) => {
            if (lastDate != t.timeStamp) {
              this.transactions.push({ date: t.timeStamp, isTransaction: false });
              lastDate = t.timeStamp;
            }
            t.index = i++;
            t.isTransaction = true;
            this.transactions.push(t);
          });
          console.log(this.transactions);
        },
        error: (message) => {
          console.log(message);
        }
      })
    }
  }

  addTransaction() {
    this.service.createTransaction({ userId: localStorage.getItem("userId"), amount: Number(this.amountforTransaction), for: this.for }).subscribe({
      next: (data) => {
        console.log(data);
        this.updateValue();
        this.for="";
        this.amountforTransaction="";
      },
      error: (message) => {
        console.log(message);
      }
    })
  }

  updateTransaction(id: string, i: number) {
    this.service.updateTransaction({ isPaidBack: true }, id).subscribe({
      next: (data) => {
        console.log(data);
        this.transactions[i].isPaidBack = data.isPaidBack;
        this.service.getAvailableBalance().subscribe({
          next: (data) => {
            console.log(data);
            this.availableBalance = data.balance;
            if (this.availableBalance > 1000) {
              this.isSufficient = true;
            }
            else {
              this.isSufficient = false;
            }
            this.service.getDuesDetail().subscribe({
              next: (data) => {
                console.log(data);
                this.dueDetailsOfUser = data;
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
        this.calculateSpendoMeter();
      },
      error: (message) => {
        console.log(message);
      }
    })
  }

  calculateSpendoMeter() {
    var now = new Date();
    var dayNumber = now.getDate();
    var totalDaysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    var averageSpendForADay = this.totalCreditedBalance / totalDaysInCurrentMonth;
    var totalSpentTillDate = this.totalCreditedBalance - this.availableBalance;
    if (averageSpendForADay * dayNumber > totalSpentTillDate) {
      this.spendStatus = 3;
    }
    else if (averageSpendForADay * dayNumber == totalSpentTillDate) {
      this.spendStatus = 2;
    }
    else {
      this.spendStatus = 1;
    }
  }

}
