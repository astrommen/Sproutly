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
  valid = {
    username: true,
    email: true,
    password: true,
  };

  constructor() { }

  ngOnInit(): void {}

  validate(type: string): void {
    const usernamePattern = /^[\w-.]*$/;
    const emailPattern = /\S+@+\.\S+/;

    if (type === 'username') {
      if(this.username.length < 5) {
        this.valid.username = false;
      } else {
        this.valid.username = usernamePattern.test(this.username);
      }
    } else if (type === 'email') {
      this.valid.email = emailPattern.test(this.username);
    } else if (type === ('confirmPassword' || 'password')) {
      if (this.password !== this.confirmPassword) {
        this.valid.password = false;
      } else {
        this.valid.password = true;
      }
    }
  }

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
    this.validate(type);
  }
}
