import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor() { }

  ngOnInit(): void {}

  onKey(Event: any, type: string) {
    if (type === 'username') {
      this.username = Event.target.value;
    } else if (type === 'email') {
      this.email = Event.target.value;
    } else if (type === 'password') {
      this.password = Event.target.value;
    } else if (type === 'confirmPassword') {
      this.confirmPassword = Event.target.value;
    }
  }
}
