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
  result: any;
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
      city: ["", [Validators.required]],
      location: ["", [Validators.required]],
      property_type: "",
      area: ["", [Validators.required]],
      demand: ["", [Validators.required]]
    });
  }
  add_property() {
    if (this.AddProperty.valid) {
      console.log("ye hai property form ka data", this.AddProperty.value);
      this.auth.saveCustomerProperty(this.AddProperty.value).subscribe(
        data => {
          // this.result.unshift(data.data);
          this.AddProperty.reset();
          this.modalRef.hide();
          //   this.rerender();
          //     this.isLoading = false;
        },
        err => {
          console.log(err);
          //     this.isLoading = false;
        }
      );
    }
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
