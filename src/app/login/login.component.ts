import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../_services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    form: any = {
      username: null,
      password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
  
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService) { }
  
    ngOnInit(): void {
      if (this.authService.getToken()) {
        this.isLoggedIn = true;
        this.roles = this.authService.getUser().roles;
      }
    }
  
    onSubmit(): void {
      const { username, password } = this.form;
  
      this.authService.login(username, password).subscribe(
        data => {
          this.authService.saveToken(data.accessToken);
          this.authService.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.authService.getUser().roles;
          this.reloadPage();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  
    reloadPage(): void {
      window.location.reload();
      setTimeout(() => {
        this.router.navigate(['/prescription-management']);
      }, 500);

    }
  }
