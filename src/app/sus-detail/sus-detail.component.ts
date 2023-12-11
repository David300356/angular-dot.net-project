import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';

@Component({
  selector: 'app-sus-detail',
  templateUrl: './sus-detail.component.html',
  styleUrls: ['./sus-detail.component.scss']
})
export class SusDetailComponent {
  editproductcode: any;
  product:any;
  constructor(private router:Router,private route: ActivatedRoute,private service:PoliceService){}
  ngOnInit(): void {
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    this.service.getSingleSuspect(this.editproductcode).subscribe(resp=>{
      this.product=resp;
    });
  }
  goBack(){
    this.router.navigate(['sus/list'])
  }
}
