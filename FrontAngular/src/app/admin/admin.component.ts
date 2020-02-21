import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isConnect = false;
  identifiant: string;
  password: string;
  authStatus: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  
  }

  ToConnect = () => {
    if (this.identifiant == "admin" && this.password == "admin") {
      this.authService.signIn().then(
        () => {
          console.log('Sign in successful!');
          this.authStatus = this.authService.isAuth;
          this.router.navigate(['form']);
        }
      );
     
    }
      else  {
        alert("identifiant ou mot de pass incorrect");
        this.router.navigate(['search']);
      }
  }



  toDeconnect = () => {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
    this.router.navigate(['search'])
  }


}
