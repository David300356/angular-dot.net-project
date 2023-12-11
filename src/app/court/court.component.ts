import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoliceService } from '../police.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.scss']
})
export class CourtComponent {
  constructor(private router:Router,private service:PoliceService) { }
  ngDoCheck(): void {
    let currenturl=this.router.url;
    if(currenturl=='/court/all-court'){
      this.islisting=true;
    }else{
      this.islisting=false;
    }
  }

  productdata:any;
  islisting=true;
  delMsg:any;
  public array:any;
  public dataSource:any;
  public pageSize=5;
  public currentPage=0;
  public totalSize=0;
  pageEvent!:PageEvent;

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngOnInit(): void {
    this.getArray();
    // this.services.Refreshrequired.subscribe(item=>{
    //   this.LoadProduct();
    // });
  }

  displayColums:string[]=["id","report","suspectss","createdOn"];

  EditProduct(code:any){
     this.router.navigate(['product/edit/'+code])
  }

  getID(id:any){
    this.router.navigate(['arrestDetail/item/'+id])
  }
  search(value: string) {
    value = value.toLowerCase();
    if (value.length > 0) {
      this.dataSource = this.dataSource.filter((witnesses:any) => {
        return witnesses.suspect.name.toLowerCase().includes(value);
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
    this.service.getSpecificCourt().subscribe((response)=>{
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
  deleteArrest(id:any) {

    this.service.deleteSingleArrest(id).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          this.delMsg = 'Deleted';
          this.getArray();
        } else {
          this.delMsg = 'not found!';
        }
        setInterval(() => (this.delMsg = ''), 5000);
      },
      error: (err: any) => console.log(err),
    });
  }
}
