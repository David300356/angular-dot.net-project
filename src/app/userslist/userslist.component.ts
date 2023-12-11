import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoliceService } from '../police.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent {
  constructor(private router:Router,private service:PoliceService) { }
  ngDoCheck(): void {
    let currenturl=this.router.url;
    if(currenturl=='/users/list'){
      this.islisting=true;
    }else{
      this.islisting=false;
    }
  }

  productdata:any;
  islisting=true;

  ngOnInit(): void {
    this.LoadProduct();
    // this.services.Refreshrequired.subscribe(item=>{
    //   this.LoadProduct();
    // });
  }

  displayColums:string[]=["id","firstName","lastName","email","mobile"];

  EditProduct(code:any){
     this.router.navigate(['product/edit/'+code])
  }

  LoadProduct(){
    this.service.getAllUsers().subscribe(resp=>{
      // console.log(resp)
      this.productdata=resp;
    })
  }
}
// ,"usertype","action"