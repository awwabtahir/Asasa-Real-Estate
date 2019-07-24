import { Component, OnInit } from "@angular/core";
import { NbMenuItem } from "@nebular/theme";
const data = {
  chart: {
    caption: "Current Property Inventory",
    subcaption: " Top 6 Cities",
    numbersuffix: " ",
    showsum: "1",
    plottooltext:
      "$label produces <b>$dataValue</b> of energy from $seriesName",
    theme: "fusion",
    drawcrossline: "1"
  },
  categories: [
    {
      category: [
        {
          label: "Lahore"
        },
        {
          label: "Karachi"
        },
        {
          label: "Islamabad"
        },
        {
          label: "Peshawar"
        },
        {
          label: "Multan"
        },
        {
          label: "Quetta"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Plots",
      data: [
        {
          value: "400"
        },
        {
          value: "830"
        },
        {
          value: "500"
        },
        {
          value: "420"
        },
        {
          value: "790"
        },
        {
          value: "380"
        }
      ]
    },
    {
      seriesname: "Homes",
      data: [
        {
          value: "350"
        },
        {
          value: "620"
        },
        {
          value: "410"
        },
        {
          value: "370"
        },
        {
          value: "720"
        },
        {
          value: "310"
        }
      ]
    },
    {
      seriesname: "Commercial",
      data: [
        {
          value: "210"
        },
        {
          value: "400"
        },
        {
          value: "450"
        },
        {
          value: "180"
        },
        {
          value: "570"
        },
        {
          value: "270"
        }
      ]
    }
  ]
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  user;
  customer = false;
  agent = false;
  width = 600;
  height = 400;
  type = "stackedcolumn2d";
  dataFormat = "json";
  dataSource = data;
  constructor() {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.access == "customer") this.customer = true;
    if (this.user.access == "agent") this.agent = true;
  }
}
