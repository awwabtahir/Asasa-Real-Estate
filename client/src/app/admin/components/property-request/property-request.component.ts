import { Component, OnInit, ViewChild } from "@angular/core";
import { NbMenuItem } from "@nebular/theme";
import { AuthenticationService } from "app/authentication.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

@Component({
  selector: "property-request",
  templateUrl: "./property-request.component.html",
  styleUrls: ["./property-request.component.css"]
})
export class PropertyRequestComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions2: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  addpropertylisting: any;
  isFetchingData: boolean = false;
  constructor(public auth: AuthenticationService) {}

  ngOnInit() {
    this.initilizeGrid();
    this.showDatatable();
  }
  initilizeGrid() {
    this.dtOptions2 = {
      paging: true,
      lengthChange: false,
      searching: false,
      pageLength: 10,
      columnDefs: [{ targets: 3, orderable: false }],
      pagingType: "simple_numbers",
      order: [[0, "desc"]]
    };
  }
  showDatatable(render?) {
    this.auth.getCustomersProperties().subscribe(
      data => {
        this.addpropertylisting = data;
        console.log("add property ka data agia ", this.addpropertylisting);
        if (render) {
          this.rerender();
        } else {
          this.dtTrigger.next();
        }
        setTimeout(() => {
          this.isFetchingData = true;
        }, 250);
      },
      err => {
        console.log(err);
      }
    );
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
