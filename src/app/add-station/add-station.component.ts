import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';
import { Subject, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss']
})
export class AddStationComponent implements OnInit{


  stationForm: FormGroup;
  msg: string = '';
  addMsg:string='';
  editproductcode: any;
  editdata: any;
  text = '';
  stationList:any;
  subscription: any;
  another:any;
  myCode:any;
  errMsg:any;

  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private api:PoliceService) { 
      this.stationForm = this.fb.group({
        id: this.fb.control({ value: 0, disabled: true }),
        name: this.fb.control('', [Validators.required]),
        code: this.fb.control('', [Validators.required]),
        city: this.fb.control('', [Validators.required]),
        address: this.fb.control('', [Validators.required]),
        phone: this.fb.control('', [Validators.required]),
      });
    }
  ngOnInit(): void {
    this.getStations();
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    if (this.editproductcode != null) {
      this.api.getSingleStation(this.editproductcode).subscribe(item => {
        //console.log(item)
        this.editdata = item;
        // if (this.editdata.variants != null) {
        //   for (let i = 0; i < this.editdata.variants.length; i++) {
        //     this.AddVariants();
        //   }
        // }
        this.stationForm.setValue({
          id:this.editdata.id,
          name: this.editdata.name,
          phone: this.editdata.phone,
          city: this.editdata.city,
          address: this.editdata.address,
          code: this.editdata.code
        })
      });
    }
  }

  search($event:any) {
    this.another=this.stationList.filter((obj:any)=>obj.code===$event.target.value);
    this.another.forEach((an:any)=>{
      this.myCode=an.code
    })
    if(this.myCode==$event.target.value){
      this.errMsg="Code already exits";
    }
    setInterval(() => (this.errMsg = ''), 5000);
}
  getStations(){
    this.api.getStations().subscribe(item=>{
          this.stationList=item;
        });
  }
    addNewStation() {
      let station={
        id:this.id.value,
        phone:this.Phone.value,
        code:this.Code.value,
        name:this.Name.value,
        city:this.City.value,
        address:this.Address.value,
        police:[
          
        ]
      }
      this.api.insertStation(station).subscribe({
        next: (res: any) => {
          console.log(res)
          this.addMsg = 'Station Inserted';
          setInterval(() => (this.addMsg = ''), 5000);
          this.stationForm.reset();
          this.router.navigate(['station/stations'])
        },
        error: (err: any) => console.log(err),
      });
    }
    get id(): FormControl {
      return this.stationForm.get('id') as FormControl;
    }
  
    get Name(): FormControl {
      return this.stationForm.get('name') as FormControl;
    }
    get Code(): FormControl {
      return this.stationForm.get('code') as FormControl;
    }
    get City(): FormControl {
      return this.stationForm.get('city') as FormControl;
    }
    get Address(): FormControl {
      return this.stationForm.get('address') as FormControl;
    }
    get Phone(): FormControl {
      return this.stationForm.get('phone') as FormControl;
    }
  redirecttolist() {
    this.router.navigate(['station/stations']);
  }
}
