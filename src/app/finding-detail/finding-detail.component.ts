import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';

@Component({
  selector: 'app-finding-detail',
  templateUrl: './finding-detail.component.html',
  styleUrls: ['./finding-detail.component.scss']
})
export class FindingDetailComponent {
  editproductcode: any;
  product:any;
  constructor(private router:Router,private route: ActivatedRoute,private service:PoliceService){}
  ngOnInit(): void {
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    this.service.getSingleFinding(this.editproductcode).subscribe(resp=>{
      this.product=resp;
    });
  }
  goBack(){
    this.router.navigate(['finding/list'])
  }
}
