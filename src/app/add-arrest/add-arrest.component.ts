import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliceService } from '../police.service';

@Component({
  selector: 'app-add-arrest',
  templateUrl: './add-arrest.component.html',
  styleUrls: ['./add-arrest.component.scss']
})
export class AddArrestComponent {

  formArrest !: FormArray<any>;
  arrestForm: FormGroup;
  msg: string = '';
  addMsg:string='';
  selectedCase:any[]=[];
  city:any;
  Casetype:any;
  list:any;
  suspectList:any;
  editproductcode: any;
  editdata: any;
  delMsg :any;


  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private api:PoliceService) { 
      this.arrestForm = this.fb.group({
        id: this.fb.control({ value: 0, disabled: true }),
        ob: this.fb.control('', [Validators.required]),
        suspect: this.fb.control('', [Validators.required]),
        hasEvidence: this.fb.control('', [Validators.required]),
        comment: this.fb.control('', [Validators.required]),
        arrest: this.fb.array([])
      });
    }
  ngOnInit(): void {
    this.showAll();
    this.getAllReport();
    this.arrestForm.get('ob')?.valueChanges.subscribe((res:number)=>{
      this.arrestForm.get('suspect')?.setValue(null);

      this.api.getSuspectsList(res).subscribe(
        (data:any)=>{
          this.selectedCase=data;
        }
      )
    });
    this.editproductcode = this.route.snapshot.paramMap.get('id');
    if (this.editproductcode != null) {
      this.api.getSingleArrest(this.editproductcode).subscribe(item => {
        console.log(item)
        this.editdata = item;
        if (this.editdata.arrestItem != null) {
          for (let i = 0; i < this.editdata.arrestItem.length; i++) {
            this.AddItems();
          }
        }
        this.arrestForm.patchValue({
          id:this.editdata.id,
          ob: this.editdata.report.id,
          suspect: this.editdata.suspect.id,
          comment: this.editdata.comment,
          hasEvidence: this.editdata.hasEvidence,
          arrest: this.editdata.arrestItem
        })
      });
    }
  }

  addNewArrest() {
    let arrestVb={
        id: this.id.value,
        reportId: this.Ob.value,
        report: {
          id: 0,
          ob: "string",
          name: "string",
          phone: "string",
          email: "string",
          occupation: "string",
          city: "string",
          address: "string",
          idNumber: "string",
          createdOn: "string",
          takeFingerprint: true,
          policeId: 0,
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
              police:[]
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
              police:[]
            },
            createdOn: "string",
            report:[]
          },
          casetypeId: 0,
          casetype: {
            id: 0,
            name: "string",
            report:[]
          },
          caseList: [
            0
          ],
          witnesses: [
            {
              id: 0,
              name: "string",
              idNumber: "string",
              phone: "string",
              city: "string",
              address: "string",
              createdOn: "string",
              reportId: 0
            }
          ],
          suspects: [
            {
              id: 0,
              name: "string",
              idNumber: "string",
              phone: "string",
              city: "string",
              address: "string",
              createdOn: "string",
              reportId: 0
            }
          ],
          statements: [
            {
              id: 0,
              statement: "string",
              createdOn: "string",
              reportId: 0
            }
          ],
          finding: [
          ],
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
        },
        suspectId: this.suspect.value,
        suspect: {
          id: 0,
          name: "string",
          idNumber: "string",
          phone: "string",
          city: "string",
          address: "string",
          createdOn: "string"
        },
        comment: this.Comment.value,
        hasEvidence: this.hasEvidence.value,
        createdOn: "string",
        arrestItem: this.arrest.value,
        suspectss: [
        ],
        arrestItems: [
        ]
      }
      this.api.insertArrest(arrestVb).subscribe({
        next: (res: any) => {
          this.addMsg = 'arrest Inserted';
          setInterval(() => (this.addMsg = ''), 5000);
          this.arrestForm.reset();
          this.router.navigate(['arrest/all-arrest'])
        },
        error: (err: any) => console.log(err),
      });
    }

    AddItems() {
      this.formArrest = this.arrestForm.get("arrest") as FormArray;
      this.formArrest.push(this.Generaterow());
    }
    Generaterow() {
      return this.fb.group({
        id: this.fb.control('' ? '0': 0),
        item: this.fb.control(''),
        arrestId: 0
      });
    }
    showAll(){
      this.api.getAll().subscribe(
        (data:any)=>{
          this.Casetype=data;
          this.city=data.city;
        }
      )
    }
    getAllReport(){
      this.api.getReports().subscribe(
        (data:any)=>{
          this.list=data;
        }
      )
    }
    get id():FormControl {
      return this.arrestForm.get('id') as FormControl;
    }
    get Ob(): FormControl {
      return this.arrestForm.get('ob') as FormControl;
    }
    get Comment(): FormControl {
      return this.arrestForm.get('comment') as FormControl;
    }
    get suspect(): FormControl {
      return this.arrestForm.get('suspect') as FormControl;
    }
    get hasEvidence(): FormControl {
      return this.arrestForm.get('hasEvidence') as FormControl;
    }
    get arrest(){
      return this.arrestForm.get('arrest') as FormArray;
    }
    redirecttolist() {
    this.router.navigate(['arrest/all-arrest']);
    }
    RemoveItem(item:any) {
      console.log(item.value.id)
      this.api.deleteSingleItem(item.value.id).subscribe({
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
}
