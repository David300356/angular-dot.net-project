import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';

@Component({
  selector: 'app-arrest-detail',
  templateUrl: './arrest-detail.component.html',
  styleUrls: ['./arrest-detail.component.scss']
})
export class ArrestDetailComponent {
  editproductcode: any;
  product:any;
  constructor(private router:Router,private route: ActivatedRoute,private service:PoliceService){}
  ngOnInit(): void {
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    this.service.getSingleArrest(this.editproductcode).subscribe(resp=>{
      this.product=resp;
    });
  }
  goBack(){
    this.router.navigate(['arrest/all-arrest'])
  }
}
