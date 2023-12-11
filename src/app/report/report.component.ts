import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoliceService } from '../police.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  constructor(private router:Router,private service:PoliceService) { }
  ngDoCheck(): void {
    let currenturl=this.router.url;
    if(currenturl=='/report/list'){
      this.islisting=true;
    }else{
      this.islisting=false;
    }
  }

  productdata:any;
  delMsg:any;
  islisting=true;
  public array:any;
  public dataSource:any;
  public pageSize=5;
  public currentPage=0;
  public totalSize=0;
  pageEvent!:PageEvent;


  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngOnInit(): void {
    this.getArray();
    this.service.Refreshrequired.subscribe(item=>{
      this.getArray();
    });
  }

  displayColums:string[]=["id","name","phone","occupation","ob","action"];

  EditProduct(id:any){
     this.router.navigate(['report/list/edit/'+id])
  }
  getID(id:any){
    this.router.navigate(['report/item/'+id])
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
    this.service.getReports().subscribe((response)=>{
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
  deleteReport(id:any) {

    this.service.deleteSingleReport(id).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          this.delMsg = 'Report Deleted';
          this.getArray();
        } else {
          this.delMsg = 'Report not found!';
        }
        setInterval(() => (this.delMsg = ''), 5000);
      },
      error: (err: any) => console.log(err),
    });
  }
}
