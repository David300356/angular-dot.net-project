import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PoliceService } from '../police.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sus-list',
  templateUrl: './sus-list.component.html',
  styleUrls: ['./sus-list.component.scss']
})
export class SusListComponent {
  constructor(private router:Router,private service:PoliceService) { }
  ngDoCheck(): void {
    let currenturl=this.router.url;
    if(currenturl=='/sus/list'){
      this.islisting=true;
    }else{
      this.islisting=false;
    }
  }
  productdataId:number | undefined;
  productdata:any;
  islisting=true;
  
  public array:any;
  public dataSource:any;
  public pageSize=5;
  public currentPage=0;
  public totalSize=0;
  pageEvent!:PageEvent;

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngOnInit(): void {
    //this.getID()
    this.LoadProduct();
    this.getArray();
  }

  displayColums:string[]=["id","name","idNumber","phone","city","address","createdOn","action"];

  LoadProduct(){
    this.service.getWitnesses().subscribe(resp=>{
      this.productdata=resp;
    })
  }
  getID(id:any){
    this.router.navigate(['suspect/item/'+id])
  }
  search(value: string) {
    value = value.toLowerCase();
    if (value.length > 0) {
      this.dataSource = this.dataSource.filter((witnesses:any) => {
        return witnesses.name.toLowerCase().includes(value);
      });
    }
    else{
      this.getArray()
    }
  }
  public handlePage(e:any){
    console.log(e)
    this.currentPage=e.pageIndex;
    this.pageSize=e.pageSize;
    this.iterator();
    return e;
  }
  private getArray(){
    this.service.getSuspects().subscribe((response)=>{
      this.dataSource=new MatTableDataSource<Element>(response);
      this.dataSource.paginator=this.paginator;
      this.array=response;
      this.totalSize=this.array.length;
      this.iterator();
    })
  }
  private iterator(){
    const end=(this.currentPage+1)*this.pageSize;
    const start=this.currentPage*this.pageSize;
    const part=this.array.slice(start,end);
    this.dataSource=part;
  }
}
