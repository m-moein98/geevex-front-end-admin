import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../admin-service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = true;
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(''),
  });
  constructor(
    private service: AdminService,
    private router: Router,
  ) { }
  isLoading = false;
  isLoggedIn = false;
  ngOnInit(): void {
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.onLogin()
      }
    })
  }
  onLogin() {
    if (this.isLoading || this.isLoggedIn) {
      return
    }
    this.isLoading = true;
    this.service.login(
      this.form.value.username,
      this.form.value.password
    ).subscribe((res: any) => {
      localStorage.setItem('token', res.token)
      this.service.getUser().subscribe(user => {
        if (user) {
          this.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(user))
          window.dispatchEvent(new Event('storage'));
          if (user["profile"]["access_level"] === "1") {
            this.router.navigate(['/pages/admin/forms'])
          } else {
            this.router.navigate(
              ['/pages/admin/forms'],
              { queryParams: { status: 'unsigned' } }
            )
          }
        }
      })
    }).add(() => {
      this.isLoading = false
    }
    )
  }
}
