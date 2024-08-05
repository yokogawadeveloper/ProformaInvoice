import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apihandler/api.service';

@Component({
  selector: 'app-proforma-access',
  templateUrl: './proforma-access.component.html',
  styleUrls: ['./proforma-access.component.css'],
})
export class ProformaAccessComponent implements OnInit {
  userList: any[] = [];
  noneSuperUserList: any[] = [];
  selectedUserId: number = 0;
  radioButtonValue: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserDropdownData().subscribe((res: any) => {
      if (res) {
        this.userList = res;
      }
    });

    // un comment this code to get none super user list
    this.apiService.getGrantSuperuserListData().subscribe((res: any) => {
      if (res) {
        this.noneSuperUserList = res;
      }
    }
    );

  }



  submitForm() {
    let data = {
      userId: this.selectedUserId,
      is_superuser: this.radioButtonValue
    };
    this.apiService.updateProformaAccess(data).subscribe((res: any) => {
      if (res) {
        this.apiService.getUserDropdownData().subscribe((res: any) => {
          if (res) {
            this.userList = res;
            //list of none super user
            this.apiService.getGrantSuperuserListData().subscribe((res: any) => {
              if (res) {
                this.noneSuperUserList = res;
              }
            }
            );
          }
        });
      }
    });
  }



  updateEmployee(employeeId: number) {
    const selectedUser = this.noneSuperUserList.find(user => user.id === employeeId);
    if (selectedUser) {
      this.selectedUserId = selectedUser.id;
      this.radioButtonValue = selectedUser.is_superuser;
    }
  }//end of updateEmployee

}

