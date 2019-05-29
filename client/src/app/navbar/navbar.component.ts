import { Component, OnInit, TemplateRef } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  user;
  customer = false;
  modalRef: BsModalRef;
  cities = [];
  locations = [];
  selectedLocation: any;
  locationszz: any;
  constructor(
    public auth: AuthenticationService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.access == "customer") this.customer = true;
    this.getCities();
  }
  openDeleteModal(template: TemplateRef<any>, index, value) {
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  }
  closeModal(): void {
    this.modalRef.hide();
  }
  public numberMask = createNumberMask({
    thousandsSeparatorSymbol: ",",
    allowDecimal: true,
    prefix: "",
    decimalLimit: 4,
    decimalSymbol: "."
  });
  getCities() {
    this.auth.getCities().subscribe(
      cities => {
        this.cities = cities;
      },
      err => {
        console.error(err);
      }
    );
  }
  cityId(_id) {
    this.selectedLocation = _id;
    this.getLocations();

    console.log("uppper say id i hai", this.selectedLocation);
  }
  getLocations() {
    this.auth.getLocations().subscribe(
      locations => {
        this.locations = locations;
      },
      err => {
        console.error(err);
      }
    );
  }
}
