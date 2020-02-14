import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isConnect = false;
  identifiant: string;
  password: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ToConnect = () => {
    if (this.identifiant == "admin" && this.password == "admin") {
      this.router.navigate(['form']);
    }
    else {
      this.router.navigate(['admin']);
    }

  }

}
