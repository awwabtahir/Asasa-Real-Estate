import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "add-property-modal",
  templateUrl: "./add-property-modal.component.html",
  styleUrls: ["./add-property-modal.component.css"]
})
export class AddPropertyModalComponent implements OnInit {
  @Input() details: string;

  constructor() {}

  ngOnInit() {
    console.log("add features modal", this.details);
  }
}
