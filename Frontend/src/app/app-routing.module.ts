import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ProformaListComponent } from './proforma-list/proforma-list.component';
import { ProformaViewComponent } from './proforma-view/proforma-view.component';
import { ProformaReportComponent } from './proforma-report/proforma-report.component';
import { ProformaMasterComponent } from './proforma-master/proforma-master.component';
import { DivisionMasterComponent } from './division-master/division-master.component';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { RegionMasterComponent } from './region-master/region-master.component';
import { ProjectManagerMasterComponent } from './project-manager-master/project-manager-master.component';
import { HomeComponent } from './home/home.component';
import { ProformaComponent } from './proforma/proforma.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authgaurd/authguard';
import { ProformaAccessComponent } from './proforma-access/proforma-access.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'proforma/login',
    pathMatch: 'full'
  },
  { path: "proforma/login", component: LoginComponent },
  { 
    path: "proforma", 
    component: ProformaComponent, 
    children: [
      { path: "FileUpload", component: UploadFileComponent, canActivate: [AuthGuard] },
      
      { path: "ProformaList", component: ProformaListComponent, canActivate: [AuthGuard] },
      
      { path: 'ProformaView/:id', component: ProformaViewComponent, data: { title: 'ProformaView' },canActivate:[AuthGuard]},

      { path: "ProformaReport", component: ProformaReportComponent, canActivate:[AuthGuard] },

      { path: "DivisionMaster", component: DivisionMasterComponent, canActivate:[AuthGuard] },

      { path: "CategoryMaster", component: CategoryMasterComponent, canActivate:[AuthGuard] },

      { path: "RegionMaster", component: RegionMasterComponent, canActivate:[AuthGuard] },

      { path: "ProjectManagerMaster", component: ProjectManagerMasterComponent, canActivate: [AuthGuard] },
      
      { path: "AccessMaster", component: ProformaAccessComponent, canActivate: [AuthGuard] },

    ],
  },
  {
    path: 'maintenance', component: MaintenanceComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
