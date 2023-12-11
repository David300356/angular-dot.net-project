import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';

@Component({
  selector: 'app-wit-detail',
  templateUrl: './wit-detail.component.html',
  styleUrls: ['./wit-detail.component.scss']
})
export class WitDetailComponent {
  editproductcode: any;
  product:any;
  constructor(private router:Router,private route: ActivatedRoute,private service:PoliceService){}
  ngOnInit(): void {
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    this.service.getSingleWitness(this.editproductcode).subscribe(resp=>{
      this.product=resp;
    });
  }
  goBack(){
    this.router.navigate(['wit/list'])
  }
}
