import { Component, OnInit, TemplateRef } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  AddProperty: FormGroup;
  numberMask = createNumberMask({
    thousandsSeparatorSymbol: ",",
    allowDecimal: true,
    prefix: "",
    decimalLimit: 4,
    decimalSymbol: "."
  });
  constructor(
    private fb: FormBuilder,
    public auth: AuthenticationService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.formInitializer();
    // tslint:disable-next-line: quotemark
    this.getCities();
    this.user = JSON.parse(localStorage.getItem("user"));
    // tslint:disable-next-line: triple-equals
    if (this.user.access == "customer") {
      this.customer = true;
    }
  }
  openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  }
  closeModal(): void {
    this.modalRef.hide();
  }

  getCities() {
    this.auth.getCities().subscribe(
      cities => {
        this.cities = cities;
        console.log("citeis agai hain", this.cities);
      },
      err => {
        console.error(err);
      }
    );
  }
  getCityLocs(listing) {
    console.log("uppper", listing);
    const cityid = {
      _id: listing._id
    };

    this.auth.getCityLocations(cityid).subscribe(
      locs => {
        this.locations = locs;
        console.log("uppper say id i hai", cityid);
        console.log(locs);
      },
      err => {
        console.error(err);
      }
    );
  }
  formInitializer() {
    this.AddProperty = this.fb.group({
      name: ["", [Validators.required]],
      phone: "",
      email: ["", [Validators.required, Validators.email]],
      city: "",
      location: "",
      property_type: "",
      area: "",
      demand: ""
    });
  }
  add_property() {
    console.log("ye hai property form ka data", this.AddProperty.value);
  }
}
// cityId(_id) {
//   this.selectedLocation = _id;
//   this.getLocations();

//   console.log("uppper say id i hai", this.selectedLocation);
// }
// getLocations() {
//   this.auth.getLocations().subscribe(
//     locations => {
//       this.locations = locations;
//     },
//     err => {
//       console.error(err);
//     }
//   );
// }
