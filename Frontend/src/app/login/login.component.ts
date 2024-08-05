import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../apihandler/api.service';
import { StorageServiceService } from '../storageService/storage.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ipAddress: any;

  username: any = "";
  password: any = "";

  systemUser: any;

  valueInsert: any;
  getValue: any;

  el: ElementRef;

  @ViewChild('iframe') input: ElementRef;

  constructor(
    private router: Router,
    public apiService: ApiService,
    public storage: StorageServiceService,
    private toastr: ToastrService,
    public http: HttpClient,
    public sanitizer: DomSanitizer,
    private _elementRef: ElementRef

  ) {

    this.valueInsert = this.sanitizer.bypassSecurityTrustResourceUrl("http://10.29.15.212:45/username/");

  }

  ngOnInit() {
    let session = sessionStorage.getItem("accessToken");
    if (session == null || session == undefined) {
      this.router.navigateByUrl("/proforma/login");
    } else {
      this.router.navigateByUrl("/proforma/FileUpload");
    }

    this.getClientSystemUsername();
  }


  getClientSystemUsername() {
    let url = "http://10.29.15.212:45/username/";
    this.http.get<any>(url, { withCredentials: true }).subscribe((result: any) => {
      let username = result[0].username;
      this.systemUser = username.split("\\");
    });
  }


  loginuser() {
    let url = 'user/login/';
    let data = {
      username: this.systemUser[1],
      // username: '464R0293'
      // username: '464V0011'
    }


    this.apiService.postLoginData(url, data).then((result: any) => {
      if (result.value == true) {
        let data: any = result.data;
        this.storage.setBearerToken(data.access);
        this.storage.setActiveUser(data.is_active);
        this.storage.setSuperUser(data.is_superuser);
        this.storage.setUserID(data.access);
        this.storage.setDivision(data.division);
        this.storage.setCategory(data.category);
        this.storage.setprojectManager(data.pm);
        this.storage.setRegion(data.region);
        this.storage.setIsAdmin(data.Isadmin); //new
        this.storage.setIsSpecial(data.is_special); //new
        if (data.is_superuser == true) {
          this.router.navigateByUrl("proforma/FileUpload");
        }
        else {
          this.router.navigateByUrl("proforma/ProformaReport");
        }
      }
      else {
        this.toastr.error(result.data);
      }
    });
  }

}
