import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Police, Station, User, UserType } from './models/models';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class PoliceService {

  baseUrl = 'https://localhost:7247/api/Police/';
  url='/assets/data.json';
  private _refreshrequired = new Subject<void>();
  get Refreshrequired() {
    return this._refreshrequired;
  }

  constructor(private http: HttpClient, private jwt: JwtHelperService) { }


  createAccount(user: User) {
    return this.http.post(this.baseUrl + 'CreateAccount', user, {
      responseType: 'text',
    });
  }

  login(loginInfo: any) {
    console.log(loginInfo)
    let params = new HttpParams()
      .append('email', loginInfo.email)
      .append('password', loginInfo.password);
    return this.http.get(this.baseUrl + 'Login', {
      params: params,
      responseType: 'text',
    });
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  deleteToken() {
    localStorage.removeItem('access_token');
    location.reload();
  }

  getTokenUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      email: token.email,
      mobile: token.mobile,
      password: '',
      blocked: token.blocked.toLowerCase() === 'true',
      active: token.active.toLowerCase() === 'true',
      createdOn: token.createdAt,
      fine: 0,
      userType: token.userType === 'USER' ? UserType.USER : UserType.ADMIN,
    };
    return user;
  }

  getAllUsers(){
    return this.http.get<any>(this.baseUrl+ 'getAllUsers');
  }

  getRanks(){
    return this.http.get<any>(this.baseUrl+ 'GetAllRanks');
  }
  getCasetype(){
    return this.http.get<any>(this.baseUrl+ 'GetAllCasetypes');
  }
  getCaselist(){
    return this.http.get<any>(this.baseUrl+ 'GetAllCaselists');
  }
  getStations(){
    return this.http.get<any>(this.baseUrl+ 'GetAllStations');
  }

  insertStation(station:Station){
    return this.http.post(this.baseUrl + 'InsertStation', station, {
      responseType: 'text',
    }).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
    
  }
  
  getAll(){
    return this.http.get<any>(this.url);
  }
  getOfficers(){
    return this.http.get<any>(this.baseUrl+ 'GetAllPolices');
  }
  getFindings(){
    return this.http.get<any>(this.baseUrl+ 'GetAllFindings');
  }
  insertFinding(finding:any){
    return this.http.post(this.baseUrl + 'InsertFinding', finding, {
      responseType: 'text',
   }).pipe(
     tap(() => {
       this._refreshrequired.next();
     })
   );
  }
  getWitnesses(){
    return this.http.get<any>(this.baseUrl+ 'GetAllWitnesss');
  }
  getSuspects(){
    return this.http.get<any>(this.baseUrl+ 'GetAllSuspects');
  }

  insertPolice(officer:any){
    return this.http.post(this.baseUrl + 'InsertPolice', officer, {
       responseType: 'text',
    }).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
    
  }
  getReports(){
    return this.http.get<any>(this.baseUrl+ 'GetAllReports');
  }
  insertReport(report:any){
    
    return this.http.post(this.baseUrl + 'InsertReport', report, {
      responseType: 'text',
    }).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
    
  }
  getArrests(){
    return this.http.get<any>(this.baseUrl+ 'GetAllArrests');
  }
  insertArrest(arrest:any){
    return this.http.post(this.baseUrl + 'InsertArrest', arrest, {
      responseType: 'text',
    }).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
    
  }
  getSingleStation(id:any){
    return this.http.get(this.baseUrl+ 'GetStation/'+id);
  }
  getSingleOfficer(id:any){
    return this.http.get(this.baseUrl+ 'GetPolice/'+id);
  }
  getSingleReport(id:any){
    return this.http.get(this.baseUrl+ 'GetReport/'+id);
  }
  getSingleFinding(id:any){
    return this.http.get(this.baseUrl+ 'GetFinding/'+id);
  }
  getSingleArrest(id:any){
    return this.http.get(this.baseUrl+ 'GetArrest/'+id);
  }
  getSuspectsList(id:any){
    return this.http.get(this.baseUrl+ 'GetSpecificSuspects/'+id);
  }
  getSingleWitness(id:any){
    return this.http.get(this.baseUrl+ 'GetOneWitness/'+id);
  }
  getSingleSuspect(id:any){
    return this.http.get(this.baseUrl+ 'GetOneSuspect/'+id);
  }
  deleteSingleStation(id:number){
    return this.http.delete(this.baseUrl + 'DeleteStation/' + id,{
      responseType:'text',
    });
  }
  deleteSinglePolice(id:number){
    return this.http.delete(this.baseUrl + 'DeletePolice/' + id,{
      responseType:'text',
    });
  }
  deleteSingleReport(id:number){
    return this.http.delete(this.baseUrl + 'DeleteReport/' + id,{
      responseType:'text',
    });
  }
  deleteSingleFinding(id:number){
    return this.http.delete(this.baseUrl + 'DeleteFinding/' + id,{
      responseType:'text',
    });
  }
  deleteSingleSuspect(id:number){
    return this.http.delete(this.baseUrl + 'DeleteSuspect/' + id,{
      responseType:'text',
    });
  }
  deleteSingleInterview(id:number){
    return this.http.delete(this.baseUrl + 'DeleteInterview/' + id,{
      responseType:'text',
    });
  }
  deleteSingleEvidence(id:number){
    return this.http.delete(this.baseUrl + 'DeleteEvidence/' + id,{
      responseType:'text',
    });
  }
  deleteSingleWitness(id:number){
    return this.http.delete(this.baseUrl + 'DeleteWitness/' + id,{
      responseType:'text',
    }).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
  }
  deleteSingleStatement(id:number){
    return this.http.delete(this.baseUrl + 'DeleteStatement/' + id,{
      responseType:'text',
    });
  }
  deleteSingleArrest(id:number){
    return this.http.delete(this.baseUrl + 'DeleteArrest/' + id,{
      responseType:'text',
    });
  }
  deleteSingleItem(id:number){
    return this.http.delete(this.baseUrl + 'DeleteItem/' + id,{
      responseType:'text',
    });
  }
  getSpecificCourt(){
    return this.http.get<any>(this.baseUrl+ 'GetSpecificCourt');
  }

}
