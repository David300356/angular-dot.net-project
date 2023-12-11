import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoliceService } from '../police.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent {
  constructor(private router:Router,private service:PoliceService) { }
  ngDoCheck(): void {
    let currenturl=this.router.url;
    if(currenturl=='/station/stations'){
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
  @ViewChild('pdfTable', {static: false}) pdfTable!: ElementRef;

  ngOnInit(): void {
    this.getArray();
    this.service.Refreshrequired.subscribe(item=>{
      this.getArray();
    });
  }

  displayColums:string[]=["id","name","phone","city","address","code","action"];

  EditProduct(id:any){
     this.router.navigate(['station/stations/edit/'+id])
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
    this.service.getStations().subscribe((response)=>{
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
  deleteStation(id:any) {

    this.service.deleteSingleStation(id).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          this.delMsg = 'Station Deleted';
          this.getArray();
        } else {
          this.delMsg = 'Station not found!';
        }
        setInterval(() => (this.delMsg = ''), 5000);
      },
      error: (err: any) => console.log(err),
    });
  }
  public downloadAsPDF():void{
    let doc = new jsPDF('l','pt','a4',true);
    doc.setFontSize(5);
    const specialElementHandlers = {
      '#editor': function () {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;
    doc.html(this.pdfTable.nativeElement,{
      callback:(doc)=>{
        doc.save("David.pdf");
      }
    });

  }
}
