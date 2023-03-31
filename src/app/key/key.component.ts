import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent {
  passCode: string = "";
  constructor(public router: Router) { }
  ngOnInit() {
    document.body.className = "selector";
  }
  submit() {
    if (this.passCode == "2222")
      this.router.navigate(['home']);
  }
}
