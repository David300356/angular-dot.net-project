import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent {
  editproductcode: any;
  product:any;
  @ViewChild('pdfTable', {static: false}) pdfTable!: ElementRef;
  constructor(private router:Router,private route: ActivatedRoute,private service:PoliceService){}
  ngOnInit(): void {
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    this.service.getSingleReport(this.editproductcode).subscribe(resp=>{
      this.product=resp;
    });
  }
  goBack(){
    this.router.navigate(['report/list'])
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
