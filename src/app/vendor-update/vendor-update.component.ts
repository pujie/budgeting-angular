import { Component, OnInit, Inject } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-vendor-update',
  templateUrl: './vendor-update.component.html',
  styleUrls: ['./vendor-update.component.css']
})
export class VendorUpdateComponent implements OnInit {
	vendor = {
		id: '',
		name: '',
		address: '',
		phone: '',
		bankaccount: ''
	}
	vendorId;
	logindata:any
	constructor(
		private vendorService: VendorService,
		private auth: AuthService, 
		private location: Location,
		private route: ActivatedRoute,
		private icon: MatIconRegistry, 
		private sanitizer: DomSanitizer,
		private router: Router
	) { 
		const selectedId = +this.route.snapshot.paramMap.get('id')!
		this.auth.isLogin((result:any) => {
	      this.logindata = result
	      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
	        this.router.navigate(['/login']);
	      }
	      if(this.logindata.name != "yenni"){
	      	this.location.back()
	      }
	      this.icon.addSvgIcon('usericon',this.sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
	    });

		this.vendorId = {
			id: selectedId,
		}
		this.vendorService.getVendor(this.vendorId, (result:any) => {
			this.vendor = result
			console.log ("Check", result)
		});
	}
	updatevendor(vendor:any){
		if(vendor.name != '' && vendor.address != '' && vendor.phone != '' && vendor.bankaccount != ''){
		this.vendorService.updateVendor(this.vendor, (result:any) => {
			this.vendor = result
			console.log("update", result)
			this.router.navigate(['/vendor']);
		})
		}else{
			alert("Missing input value, please input value first!");
      		console.log("Error! missing value")
		}
	}
	numCheck(event: any) {
	    const pattern = /[0-9\ ]/;
	    let inputChar = String.fromCharCode(event.charCode);
	    if (event.keyCode != 8 && !pattern.test(inputChar)) {
	      event.preventDefault();
	    }
  	}
	ngOnInit() {
	}
}
