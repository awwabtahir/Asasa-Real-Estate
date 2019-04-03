import { Component, OnInit } from "@angular/core";
import { NbMenuItem } from "@nebular/theme";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  user;
  customer = false;
  agent = false;

  constructor() {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.access == "customer") this.customer = true;
    if (this.user.access == "agent") this.agent = true;
  }
}
