import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {


  formWitness !: FormArray<any>;
  formSuspect !: FormArray<any>;
  formStatement !: FormArray<any>;
  reportForm: FormGroup;
  msg: string = '';
  addMsg:string='';
  selectedCase:any;
  officers:any;
  Casetype:any;
  Caselistss:any;
  editproductcode: any;
  editdata: any;
  band:any;
  delMsg:any;
  caseArray:any;
  anotherCaseArray:any;


  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private api:PoliceService) { 
      this.reportForm = this.fb.group({
        id: this.fb.control({ value: 0, disabled: true }),
        name: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),     
        ]),
        phone: this.fb.control('', [Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(8),
          Validators.maxLength(10),
        ]),
        occupation: this.fb.control('', [Validators.required,
          Validators.pattern("^[a-zA-Z]*"),
        ]),
        city: this.fb.control('', [Validators.required,
          Validators.pattern("^[a-zA-Z]*"),
        ]),
        address: this.fb.control('', [Validators.required]),
        idNumber: this.fb.control('', [Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
        police: this.fb.control('', [Validators.required]),
        casetype: this.fb.control('', [Validators.required]),
        caselist: this.fb.control('', [Validators.required]),
        takeFingerPrint: this.fb.control('', [Validators.required]),
        createdOn: this.fb.control(''),
        suspects: this.fb.array([]),
        witnesses: this.fb.array([]),
        statements: this.fb.array([])
      });
    }
  ngOnInit(): void {
    this.loadOfficers();
    this.loadCasetypes();
    this.loadCaselists();
    this.loadCases();


    this.editproductcode = this.route.snapshot.paramMap.get('id');
    if (this.editproductcode != null) {
      this.api.getSingleReport(this.editproductcode).subscribe(item => {
        console.log(item)
        this.editdata = item;
        if (this.editdata.suspects != null) {
          for (let i = 0; i < this.editdata.suspects.length; i++) {
            this.AddSuspects();
          }
        }
        if (this.editdata.witnesses != null) {
          for (let i = 0; i < this.editdata.witnesses.length; i++) {
            this.AddWitnesses();
          }
        }
        if (this.editdata.statements != null) {
          for (let i = 0; i < this.editdata.statements.length; i++) {
            this.AddStatements();
          }
        }
        this.editdata.caseListArrays.forEach((element: any) => {
           this.caseArray=element;
           //console.log(this.caseArray)
           console.log(this.caseArray.caselistId)
           console.log(this.caseArray.caselist.Id)
        });
      //   this.caseArray.caselistId.forEach((element: any) => {
      //     this.anotherCaseArray=element;
      //     console.log(this.anotherCaseArray)
      //  });
        
        this.reportForm.patchValue({
          id:this.editdata.id,
          name: this.editdata.name,
          phone: this.editdata.phone,
          email: this.editdata.email,
          occupation: this.editdata.occupation,
          city: this.editdata.city,
          address: this.editdata.address,
          idNumber: this.editdata.idNumber,
          createdOn: this.editdata.createdOn,
          takeFingerPrint: this.editdata.takeFingerprint,
          casetype: this.editdata.casetype.id,
          //caselist: this.caseArray.caselistId[0],
          //caselist: this.caseArray.caselistId,
          caselist: this.caseArray.caselist.Id,
          
          police: this.editdata.police.id,
          suspects: this.editdata.suspects,
          witnesses: this.editdata.witnesses,
          statements: this.editdata.statements
        })
      });
    }

  }
  loadCases(){
    this.reportForm.get('casetype')?.valueChanges.subscribe((res:number)=>{
      this.reportForm.get('caselist')?.setValue(null);
      if(res){
        this.selectedCase=this.Caselistss.filter((obj:any)=>obj.casetypeId===res);
        this.reportForm.get('caselist')?.enable();
      }
      else{
        this.reportForm.get('caselist')?.disable();
      }
    })
  }

    addNewReport() {
      let report=
      {
        id:this.id.value,
        ob: '',
        name: this.Name.value,
        phone: this.Phone.value,
        email: this.Email.value,
        occupation: this.Occupation.value,
        city: this.City.value,
        address: this.Address.value,
        idNumber: this.IDNumber.value,
        createdOn:this.createdOn.value,
        takeFingerprint: this.takeFingerPrint.value,
        policeId: this.police.value,
        police: {
          id: 0,
          name: "string",
          phone: "string",
          email: "string",
          serialNumber: "string",
          idNumber: "string",
          rankId: 0,
          rank: {
            id: 0,
            rankName: "string",
            police:[

            ]
          },
          stationId: 0,
          station: {
            id: 0,
            name: "string",
            phone: "string",
            city: "string",
            address: "string",
            code: "string",
            createdOn: "string",
            police:[
              
            ]
          },
          createdOn: "string",
          report:[
              
          ]
        },
        casetypeId: this.Casetypes.value,
        casetype: {
          id: 0,
          name: "string",
          report:[
              
          ]
        },
        caseList: this.Caselists.value,
        witnesses: this.witnesses.value,
        suspects: this.suspects.value,
        statements:this.statements.value,
        caseListArrays: [
        ],
        suspectss: [
        ],
        witnesss: [
        ],
        statementss: [  
        ],
        caseListArrayss: [
        ]
      }
      this.api.insertReport(report).subscribe({
        next: (res: any) => {
          this.addMsg = 'report Inserted';
          setInterval(() => (this.addMsg = ''), 5000);
          this.reportForm.reset();
          this.router.navigate(['report/list'])
        },
        error: (err: any) => console.log(err),
      });
    }
    loadOfficers(){
      this.api.getOfficers().subscribe(item=>{
        this.officers=item;
      });
    }
    loadCasetypes(){
      this.api.getCasetype().subscribe(item=>{
        this.Casetype=item;
      });
    }
    loadCaselists(){
      this.api.getCaselist().subscribe(item=>{
        this.Caselistss=item;
      });
    }

    AddWitnesses() {
      this.formSuspect = this.reportForm.get("witnesses") as FormArray;
      this.formSuspect.push(this.GenerateWitrow());
    }
    AddSuspects() {
      this.formWitness = this.reportForm.get("suspects") as FormArray;
      this.formWitness.push(this.GenerateSusrow());
    }
    AddStatements() {
      this.formStatement = this.reportForm.get("statements") as FormArray;
      this.formStatement.push(this.GenerateStatrow());
    }

    GenerateWitrow() {
      return this.fb.group({
        id: this.fb.control('' ? '0': 0),
        name: this.fb.control('',[Validators.required]),
        idNumber: this.fb.control('',[Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(8),
          Validators.maxLength(10),
        ]),
        city: this.fb.control('',[Validators.required]),
        address: this.fb.control('',[Validators.required]),
        phone: this.fb.control('',[Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(8),
          Validators.maxLength(10),
        ]),
        wstatement:this.fb.control(''),
        createdOn:this.fb.control(''),
        reportId: 0
      });
    }
    GenerateSusrow() {
      return this.fb.group({
        id: this.fb.control('' ? '0': 0),
        name: this.fb.control('',[Validators.required]),
        idNumber: this.fb.control('',[Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(8),
          Validators.maxLength(10),
        ]),
        city: this.fb.control('',[Validators.required]),
        address: this.fb.control('',[Validators.required]),
        phone: this.fb.control('',[Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(8),
          Validators.maxLength(10),
        ]),
        sstatement:this.fb.control(''),
        createdOn:this.fb.control(''),
        reportId: 0
      });
    }
    GenerateStatrow() {
      return this.fb.group({
        id: this.fb.control('' ? '0': 0),
        statement: this.fb.control('',[Validators.required]),
        createdOn:this.fb.control('')
      });
    }
    get createdOn(): FormControl {
      return this.reportForm.get('createdOn') as FormControl;
    }
    get id(): FormControl {
      return this.reportForm.get('id') as FormControl;
    }
    get Name(): FormControl {
      return this.reportForm.get('name') as FormControl;
    }
    get Email(): FormControl {
      return this.reportForm.get('email') as FormControl;
    }
    get City(): FormControl {
      return this.reportForm.get('city') as FormControl;
    }
    get Address(): FormControl {
      return this.reportForm.get('address') as FormControl;
    }
    get IDNumber(): FormControl {
      return this.reportForm.get('idNumber') as FormControl;
    }
    get Occupation(): FormControl {
      return this.reportForm.get('occupation') as FormControl;
    }
    get Phone(): FormControl {
      return this.reportForm.get('phone') as FormControl;
    }
    get police(): FormControl {
      return this.reportForm.get('police') as FormControl;
    }
    get Casetypes(): FormControl {
      return this.reportForm.get('casetype') as FormControl;
    }
    get Caselists(): FormControl {
      return this.reportForm.get('caselist') as FormControl;
    }
    get takeFingerPrint():FormControl{
      return this.reportForm.get('takeFingerPrint') as FormControl;
    }
    get witnesses() {
      return this.reportForm.get("witnesses") as FormArray;
    }
    get suspects() {
      return this.reportForm.get("suspects") as FormArray;
    }
    get statements() {
      return this.reportForm.get("statements") as FormArray;
    }



  redirecttolist() {
    this.router.navigate(['report/list']);
  }
  RemoveWitness(item: any) {
    console.log(item.controls.id.value)

    this.api.deleteSingleWitness(item.controls.id.value).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          this.delMsg = 'Deleted';
        } else {
          this.delMsg = 'not found!';
        }
        setInterval(() => (this.delMsg = ''), 5000);
      },
      error: (err: any) => console.log(err),
    });
  }
  RemoveSuspect(item:any) {
    this.api.deleteSingleSuspect(item.controls.id.value).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          this.delMsg = 'Deleted';
        } else {
          this.delMsg = 'not found!';
        }
        setInterval(() => (this.delMsg = ''), 5000);
      },
      error: (err: any) => console.log(err),
    });
  }
  RemoveStatement(item: any) {
    this.api.deleteSingleStatement(item.controls.id.value).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          this.delMsg = 'Deleted';
        } else {
          this.delMsg = 'not found!';
        }
        setInterval(() => (this.delMsg = ''), 5000);
      },
      error: (err: any) => console.log(err),
    });
  }
  // errors

  getNameErrors() {
    if (this.Name.hasError('required')) return 'Name is required!';
    // if (this.Name.hasError('pattern'))
    //   return 'please enter characters only!';
    return '';
  }
  
  getAddressErrors() {
    if (this.Address.hasError('required')) return 'Address is required!';
    return '';
  }
  getEmailErrors() {
    if (this.Email.hasError('required')) return 'Email is required!';
    if (this.Email.hasError('pattern'))
      return 'please enter valid email address!';
    return '';
  }
  getPhoneErrors() {
    if (this.Phone.hasError('required')) return 'Phone is required!';
    if (this.Phone.hasError('minlength'))
      return 'Minimum 8 characters are required!';
    if (this.Phone.hasError('maxlength'))
      return 'Maximum 12 characters are required!';
    if (this.Phone.hasError('pattern'))
      return 'please enter numbers only!';
    return '';
  }
  getIDNumberErrors() {
    if (this.IDNumber.hasError('required')) return 'ID number is required!';
    if (this.IDNumber.hasError('minlength'))
      return 'Minimum 8 characters are required!';
    if (this.IDNumber.hasError('maxlength'))
      return 'Maximum 8 characters are required!';
    if (this.IDNumber.hasError('pattern'))
      return 'please enter numbers only!';
    return '';
  }

  getwitnessesErrors(i:any) {
    if (this.witnesses.controls[i].get('name')?.hasError('required')) return 'Name is required!';
    // if (this.witnesses.controls[i].get('name')?.hasError('pattern'))
    //   return 'please enter characters only!';
      return '';

  }
  getSuspectsErrors(i:any) {
    if (this.suspects.controls[i].get('name')?.hasError('required')) return 'Name is required!';
    // if (this.suspects.controls[i].get('name')?.hasError('pattern'))
    //   return 'please enter characters only!';
      return '';

  }
  getwitnessesCityErrors(i:any) {
    if (this.witnesses.controls[i].get('city')?.hasError('required')) return 'city is required!';
    if (this.witnesses.controls[i].get('city')?.hasError('pattern'))
      return 'please enter characters only!';
      return '';

  }
  getSusCityErrors(i:any) {
    if (this.suspects.controls[i].get('city')?.hasError('required')) return 'city is required!';
    if (this.suspects.controls[i].get('city')?.hasError('pattern'))
      return 'please enter characters only!';
      return '';

  }
  getwitnessesAddressErrors(i:any) {
    if (this.witnesses.controls[i].get('address')?.hasError('required')) return 'Address is required!';
    return '';
  }
  getSusAddressErrors(i:any) {
    if (this.suspects.controls[i].get('address')?.hasError('required')) return 'Address is required!';
    return '';
  }
  getStatAddressErrors(i:any) {
    if (this.statements.controls[i].get('statement')?.hasError('required')) return 'Statement is required!';
    return '';
  }
  
  getWitIDErrors(i:any){
    if (this.witnesses.controls[i].get('idNumber')?.hasError('required')) return 'ID number is required!';
    if (this.witnesses.controls[i].get('idNumber')?.hasError('pattern'))
    return 'please enter numbers only!';
    if (this.witnesses.controls[i].get('idNumber')?.hasError('minlength'))
      return 'Minimum 8 characters required!';
    if (this.witnesses.controls[i].get('idNumber')?.hasError('maxlength'))
    return 'Maximum 10 characters required!';
    return '';
  }
  getSusIDErrors(i:any){
    if (this.suspects.controls[i].get('idNumber')?.hasError('required')) return 'ID number is required!';
    if (this.suspects.controls[i].get('idNumber')?.hasError('pattern'))
    return 'please enter numbers only!';
    if (this.suspects.controls[i].get('idNumber')?.hasError('minlength'))
      return 'Minimum 8 characters required!';
    if (this.suspects.controls[i].get('idNumber')?.hasError('maxlength'))
    return 'Maximum 10 characters required!';
    return '';
  }
  getWitPhoneErrors(i:any){
    if (this.witnesses.controls[i].get('phone')?.hasError('required')) return 'Phone is required!';
    if (this.witnesses.controls[i].get('phone')?.hasError('pattern'))
    return 'please enter numbers only!';
    if (this.witnesses.controls[i].get('phone')?.hasError('minlength'))
      return 'Minimum 8 characters required!';
    if (this.witnesses.controls[i].get('phone')?.hasError('maxlength'))
    return 'Maximum 10 characters required!';
    return '';
  }
  getSusPhoneErrors(i:any){
    if (this.suspects.controls[i].get('phone')?.hasError('required')) return 'Phone is required!';
    if (this.suspects.controls[i].get('phone')?.hasError('pattern'))
    return 'please enter numbers only!';
    if (this.suspects.controls[i].get('phone')?.hasError('minlength'))
      return 'Minimum 8 characters required!';
    if (this.suspects.controls[i].get('phone')?.hasError('maxlength'))
    return 'Maximum 10 characters required!';
    return '';
  }


}

    // getRandomNumber(){
    //   const random=Math.floor(Math.random()*(999999-100000))+100000;
    //   this.randomOB=random;
    //   console.log(random)
    // }