import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';
import { Rank, Station } from '../models/models';

@Component({
  selector: 'app-add-officer',
  templateUrl: './add-officer.component.html',
  styleUrls: ['./add-officer.component.scss']
})
export class AddOfficerComponent implements OnInit {

  policeForm: FormGroup;
  msg: string = '';
  addMsg:string='';
  rankItems:Rank[]=[];
  stationItems:Station[]=[];
  editproductcode: any;
  editdata: any;

  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private service:PoliceService) { 
      this.policeForm = this.fb.group({
        id: this.fb.control({ value: 0, disabled: true }),
        name: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.required]),
        serialNumber: this.fb.control('', [Validators.required]),
        idNumber: this.fb.control('', [Validators.required]),
        phone: this.fb.control('', [Validators.required]),
        createdOn: this.fb.control('', [Validators.required]),
        rank: this.fb.control('', [Validators.required]),
        station: this.fb.control('', [Validators.required]),
      });
    }
  ngOnInit(): void {
    this.loadRanks();
    this.loadStations();
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    if (this.editproductcode != null) {
      this.service.getSingleOfficer(this.editproductcode).subscribe(item => {
        this.editdata = item;
        // if (this.editdata.variants != null) {
        //   for (let i = 0; i < this.editdata.variants.length; i++) {
        //     this.AddVariants();
        //   }
        // }
        this.policeForm.setValue({
          id:this.editdata.id,
          name: this.editdata.name,
          phone: this.editdata.phone,
          email: this.editdata.email,
          serialNumber: this.editdata.serialNumber,
          idNumber: this.editdata.idNumber,
          station: this.editdata.station.id,
          rank: this.editdata.rank.id,
          createdOn: this.editdata.createdOn,
        })
      });
    }
  }

    addNewPolice() {
      let police={
        id:this.id.value,
        phone:this.Phone.value,
        createdOn:this.createdOn.value,
        email:this.Email.value,
        name:this.Name.value,
        idNumber:this.IDNumber.value,
        serialNumber:this.SerialNumber.value,
        rankId: this.rank.value,
        report:[    
        ],
        rank: {
          id: 0,
          rankName: '',
          police:[
          ]
        },
        stationId: this.station.value,
        station: {
          id: 0,
          name:'',
          phone:'',
          city: '',
          address: '',
          code: '',
          createdOn: '',
          police:[
          ]
        },
      }
      this.service.insertPolice(police).subscribe({
        next: (res: any) => {
          this.addMsg = 'Police Inserted';
          setInterval(() => (this.addMsg = ''), 5000);
          this.policeForm.reset();
          this.router.navigate(['officers/police'])
        },
        error: (err: any) => console.log(err),
      });
    }
    loadRanks(){
      this.service.getRanks().subscribe(item=>{
        this.rankItems=item;
      });
    }
    loadStations(){
      this.service.getStations().subscribe(item=>{
        this.stationItems=item;
      });
    }
    get id(): FormControl {
      return this.policeForm.get('id') as FormControl;
    }
  
    get Name(): FormControl {
      return this.policeForm.get('name') as FormControl;
    }
    get createdOn(): FormControl {
      return this.policeForm.get('createdOn') as FormControl;
    }
    get Email(): FormControl {
      return this.policeForm.get('email') as FormControl;
    }
    get SerialNumber(): FormControl {
      return this.policeForm.get('serialNumber') as FormControl;
    }
    get IDNumber(): FormControl {
      return this.policeForm.get('idNumber') as FormControl;
    }
    get Phone(): FormControl {
      return this.policeForm.get('phone') as FormControl;
    }
    get rank(): FormControl {
      return this.policeForm.get('rank') as FormControl;
    }
    get station(): FormControl {
      return this.policeForm.get('station') as FormControl;
    }
    redirecttolist() {
      this.router.navigate(['officers/police']);
    }
}
