import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { StationComponent } from './station/station.component';
import { PoliceComponent } from './police/police.component';
import { ReportComponent } from './report/report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { UserslistComponent } from './userslist/userslist.component';
import { ArrestlistComponent } from './arrestlist/arrestlist.component';
import { AddArrestComponent } from './add-arrest/add-arrest.component';
import { AddStationComponent } from './add-station/add-station.component';
import { AddOfficerComponent } from './add-officer/add-officer.component';
import { CourtComponent } from './court/court.component';
import { PoliceDetailComponent } from './police-detail/police-detail.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { WitListComponent } from './wit-list/wit-list.component';
import { SusListComponent } from './sus-list/sus-list.component';
import { SusDetailComponent } from './sus-detail/sus-detail.component';
import { WitDetailComponent } from './wit-detail/wit-detail.component';
import { ArrestDetailComponent } from './arrest-detail/arrest-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './guard.guard';
import { FindingListComponent } from './finding-list/finding-list.component';
import { AddFindingComponent } from './add-finding/add-finding.component';
import { FindingDetailComponent } from './finding-detail/finding-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CellComponent } from './cell/cell.component';
import { SearchComponent } from './search/search.component';
import { CaseOutComeComponent } from './case-out-come/case-out-come.component';
import { AssignCaseComponent } from './assign-case/assign-case.component';

const routes: Routes = [
  {
    path: 'station/stations',
    component: StationComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
    children:[
      {
        component:AddStationComponent,path:"create"
      },
      {
        component:AddStationComponent,path:"edit/:id"
      }
    ]
  },
  {
    path: 'officers/police',
    component: PoliceComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
    children:[
      {
        component:AddOfficerComponent,path:"create"
      },
      {
        component:AddOfficerComponent,path:"edit/:id"
      }
    ]
  },
  {
    path: 'report/list',
    component: ReportComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
    children:[
      {
        component:AddReportComponent,path:"create"
      },
      {
        component:AddReportComponent,path:"edit/:id"
      }
    ]
  },
  {
    path: 'finding/list',
    component: FindingListComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
    children:[
      {
        component:AddFindingComponent,path:"create"
      },
      {
        component:AddFindingComponent,path:"edit/:id"
      }
    ]
  },
  {
    path: 'users/list',
    component: UserslistComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'wit/list',
    component: WitListComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'profile/details',
    component: ProfileComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'search/searchs',
    component: SearchComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'case/Outcome',
    component: CaseOutComeComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'assign/assigns',
    component: AssignCaseComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'sus/list',
    component: SusListComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'dash/dashboard',
    component: DashboardComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'details/item/:id',
    component: PoliceDetailComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'arrestDetail/item/:id',
    component: ArrestDetailComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'report/item/:id',
    component: ReportDetailComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'finding/item/:id',
    component: FindingDetailComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'suspect/item/:id',
    component: SusDetailComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'witness/item/:id',
    component: WitDetailComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'arrest/all-arrest',
    component: ArrestlistComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
    children:[
      {
        component:AddArrestComponent,path:"create"
      },
      {
        component:AddArrestComponent,path:"edit/:id"
      }
    ]
  },
  {
    path: 'court/all-court',
    component: CourtComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'cell/cells',
    component: CellComponent,
    canActivate:[(next:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>inject(AuthenticationGuard).canActivate(next,state)],
  },
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
