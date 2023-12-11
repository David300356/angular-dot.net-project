import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';

@Component({
  selector: 'app-police-detail',
  templateUrl: './police-detail.component.html',
  styleUrls: ['./police-detail.component.scss']
})
export class PoliceDetailComponent implements OnInit{
  editproductcode: any;
  product:any;
  constructor(private router:Router,private route: ActivatedRoute,private service:PoliceService){}
  ngOnInit(): void {
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    this.service.getSingleOfficer(this.editproductcode).subscribe(resp=>{
      this.product=resp;
    });
  }
  goBack(){
    this.router.navigate(['officers/police'])
  }
}
