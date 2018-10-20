import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  adId;
  ad;
  imagesData = {};
  locationData = {};
  features = {};
  plot_features = {};
  rooms = {};
  biz_comm = {};
  healthcare = {};
  nearby_loc = {};
  other = {};

  constructor(private auth: AuthenticationService,
              private router: Router) { }

  save(ad) {
    this.modifyAd(ad);
    this.ad = ad;
    this.auth.saveAd(ad).subscribe((ad) => {
      this.adId = ad._id;
    }, (err) => {
      console.error(err);
    });
  }

  update(ad) {
    this.modifyAd(ad);
    this.ad = ad;
    this.auth.updateAd(ad).subscribe((ad) => {
      this.adId = ad._id;
    }, (err) => {
      console.error(err);
    });
  }

  updateMedia(ad) {
    this.modifyAd(ad);    
    this.imagesData = {};
    console.log(ad);
    this.auth.updateAd(ad).subscribe(() => {
      this.router.navigateByUrl('/activeProperties');
    }, (err) => {
      console.error(err);
    });
  }

  getAdId() {
    return this.adId;
  }

  setAd(ad) {
    this.ad = ad;
  }

  getAd() {
    return this.ad;
  }

  getAds() {
    return this.auth.getAds();
  }

  delete(ad) {
    this.auth.deleteAd(ad).subscribe((result) => {
      console.log("success");
    });
  }

  adforUpdate;
  setItemforUpdate(ad) {
    this.adforUpdate = ad;
  }

  getItemforUpdate() {
    return this.adforUpdate;
  }

  addImagesData(imagesData) {
    this.imagesData = imagesData;
  }

  addLocation(locationData) {
    this.locationData = locationData;
  }

  addImages(imagesData) {
    this.imagesData = imagesData;
  }

  addFeatures(features) {
    this.features = features;
  }

  addPlotFeatures(plot_features) {
    this.plot_features = plot_features;
  }

  addRooms(rooms) {
    this.rooms = rooms;
  }

  addBizComm(biz_comm) {
    this.biz_comm = biz_comm;
  }

  addHealthCare(healthcare) {
    this.healthcare = healthcare;
  }

  addNearByLoc(nearby_loc) {
    this.nearby_loc = nearby_loc;
  }

  addOther(other) {
    this.other = other;
  }

  private modifyAd(ad) {
    ad["imagesData"] = this.imagesData;
    ad["locationData"] = this.locationData;
    if (ad.type != 'plot') ad["features"] = this.features;
    if (ad.type == 'plot') ad["plot_features"] = this.plot_features;
    ad["rooms"] = this.rooms;
    ad["biz_comm"] = this.biz_comm;
    ad["healthcare"] = this.healthcare;
    ad["nearby_loc"] = this.nearby_loc;
    ad["other"] = this.other;
    if(this.adId) {
      if(!ad["_id"]) ad["_id"] = this.adId;
      this.imagesData["adId"] = this.adId;
    }
  }

  localeString(x, sep?, grp?) {
    var sx = ('' + x).split('.'), s = '', i, j;
    sep || (sep = ','); // default seperator
    grp || grp === 0 || (grp = 2); // default grouping
    i = sx[0].length;
    s = sep + sx[0].slice(i-3, i) + s;
    i = i-3;
    while (i > grp) {
      j = i - grp;
      s = sep + sx[0].slice(j, i) + s;
      i = j;
    }
    s = sx[0].slice(0, i) + s;
    sx[0] = s;
    return sx.join('.');
  }

}
