import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ReportComponent } from './report/report.component';
import { StationComponent } from './station/station.component';
import { PoliceComponent } from './police/police.component';
import { AddReportComponent } from './add-report/add-report.component';
import { UserslistComponent } from './userslist/userslist.component';
import { ArrestlistComponent } from './arrestlist/arrestlist.component';
import { AddArrestComponent } from './add-arrest/add-arrest.component';
import { AddStationComponent } from './add-station/add-station.component';
import { AddOfficerComponent } from './add-officer/add-officer.component';
import { CourtComponent } from './court/court.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoliceDetailComponent } from './police-detail/police-detail.component';
import { OpenPoliceDirective } from './open-police.directive';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { WitListComponent } from './wit-list/wit-list.component';
import { SusListComponent } from './sus-list/sus-list.component';
import { WitDetailComponent } from './wit-detail/wit-detail.component';
import { SusDetailComponent } from './sus-detail/sus-detail.component';
import { ArrestDetailComponent } from './arrest-detail/arrest-detail.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FindingListComponent } from './finding-list/finding-list.component';
import { AddFindingComponent } from './add-finding/add-finding.component';
import { FindingDetailComponent } from './finding-detail/finding-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { AssignComponent } from './assign/assign.component';
import { CellComponent } from './cell/cell.component';
import { AssignCaseComponent } from './assign-case/assign-case.component';
import { CaseOutComeComponent } from './case-out-come/case-out-come.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    LoginComponent,
    RegisterComponent,
    SidenavComponent,
    ReportComponent,
    StationComponent,
    PoliceComponent,
    AddReportComponent,
    UserslistComponent,
    ArrestlistComponent,
    AddArrestComponent,
    AddStationComponent,
    AddOfficerComponent,
    CourtComponent,
    PoliceDetailComponent,
    OpenPoliceDirective,
    ReportDetailComponent,
    WitListComponent,
    SusListComponent,
    WitDetailComponent,
    SusDetailComponent,
    ArrestDetailComponent,
    FindingListComponent,
    AddFindingComponent,
    FindingDetailComponent,
    DashboardComponent,
    ProfileComponent,
    SearchComponent,
    AssignComponent,
    CellComponent,
    AssignCaseComponent,
    CaseOutComeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    JwtModule.forRoot({
      config: {
      tokenGetter: () => {
        return localStorage.getItem('access_token');
      },
      allowedDomains: ['localhost:7247'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
