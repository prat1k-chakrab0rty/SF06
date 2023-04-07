import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent {
  passCode: string = "";
  constructor(public router: Router, public service: ApiService) { }
  submit() {
    this.service.login(this.passCode).subscribe({
      next: (data) => {
        if (data.isValid)
        {
          localStorage.setItem('userId',data.data._id);  
          this.router.navigate(['home']);
        }
      },
      error: (message) => {
        console.log(message);
      }
    })
  }
}
