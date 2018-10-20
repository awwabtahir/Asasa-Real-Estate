import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertyService } from 'shared/services/property.service';

@Component({
  selector: 'add-property-rooms',
  templateUrl: './add-property-rooms.component.html',
  styleUrls: ['./add-property-rooms.component.css']
})
export class AddPropertyRoomsComponent implements OnInit, OnDestroy {

  @ViewChild('form') ngForm: NgForm;
  @Input() type: string;
  formChangesSubscription: Subscription;

  room = {
    beds: "",
    baths: "",
    servant_quarters: "",
    drawing_room: false,
    dining_room: false,
    kitchens: "",
    studing_room: false,
    prayer_room: false,
    powder_room: false,
    gym: false,
    store_rooms: "",
    steam_room: false,
    lounge_room: false,
    laundary_room: false,
    other_rooms: ""
  }

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(rooms => {
      this.propertyService.addRooms(rooms);
    });
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

}
