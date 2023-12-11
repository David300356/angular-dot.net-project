import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PoliceService } from '../police.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-finding',
  templateUrl: './add-finding.component.html',
  styleUrls: ['./add-finding.component.scss']
})
export class AddFindingComponent implements OnInit{

  formEvidence !: FormArray<any>;
  formInterview !: FormArray<any>;
  findingForm: FormGroup;
  msg: string = '';
  addMsg:string='';
  reportsList:any;
  Caselistss:any;
  editproductcode: any;
  editdata: any;
  band:any;
  delEvidenceMsg:any;
  delInterviewMsg:any;

  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private api:PoliceService) { 
      this.findingForm = this.fb.group({
        id: this.fb.control({ value: 0, disabled: true }),
        ob: this.fb.control('', [Validators.required]),
        description: this.fb.control('', [Validators.required]),
        createdOn: this.fb.control(''),
        evidences: this.fb.array([]),
        interviews: this.fb.array([])
      });
    }
  ngOnInit(): void {
    this.loadReports();

    this.editproductcode = this.route.snapshot.paramMap.get('id');
    if (this.editproductcode != null) {
      this.api.getSingleFinding(this.editproductcode).subscribe(item => {
        console.log(item)
        this.editdata = item;
        if (this.editdata.evidencess != null) {
          for (let i = 0; i < this.editdata.evidencess.length; i++) {
            this.AddEvidences();
          }
        }
        if (this.editdata.interviewss != null) {
          for (let i = 0; i < this.editdata.interviewss.length; i++) {
            this.AddInterviews();
          }
        }
       
        this.findingForm.patchValue({
          id:this.editdata.id,
          ob: this.editdata.report.id,
          createdOn: this.editdata.createdOn,
          description: this.editdata.description,
          interviews: this.editdata.interviewss,
          evidences: this.editdata.evidencess
        })
      });
    }
  }
    loadReports(){
      this.api.getReports().subscribe(item=>{
        this.reportsList=item;
      });
    }

    AddEvidences() {
      this.formEvidence = this.findingForm.get("evidences") as FormArray;
      this.formEvidence.push(this.GenerateEvidencerow());
    }
    AddInterviews() {
      this.formInterview = this.findingForm.get("interviews") as FormArray;
      this.formInterview.push(this.GenerateInterviewrow());
    }
    GenerateEvidencerow() {
      return this.fb.group({
        id: this.fb.control('' ? '0': 0),
        //id: this.fb.control({ value:'' ? '0': 0,disabled:true}),
        name: this.fb.control('',[Validators.required]),
        description: this.fb.control(''),
        findingId: 0
      });
    }
    GenerateInterviewrow() {
      return this.fb.group({
        id: this.fb.control('' ? '0': 0),
        //id: this.fb.control({ value:'' ? '0': 0,disabled:true}),
        name: this.fb.control('',[Validators.required]),
        description: this.fb.control('',[Validators.required]),
        idNumber: this.fb.control('',[Validators.required,
          Validators.pattern("^[0-9]*")
        ]),
        findingId: 0
      });
    }
    get createdOn(): FormControl {
      return this.findingForm.get('createdOn') as FormControl;
    }
    get id(): FormControl {
      return this.findingForm.get('id') as FormControl;
    }
    get Ob(): FormControl {
      return this.findingForm.get('ob') as FormControl;
    }
    get Description(): FormControl {
      return this.findingForm.get('description') as FormControl;
    }
    get evidences() {
      return this.findingForm.get("evidences") as FormArray;
    }
    get interviews() {
      return this.findingForm.get("interviews") as FormArray;
    }
    RemoveInterview(item:any) {
      this.api.deleteSingleInterview(item.controls.id.value).subscribe({
        next: (res: any) => {
          if (res === 'success') {
            this.delInterviewMsg = 'Deleted';
          } else {
            this.delInterviewMsg = 'not found!';
          }
          setInterval(() => (this.delInterviewMsg = ''), 5000);
        },
        error: (err: any) => console.log(err),
      });
    }
    RemoveEvidence(item:any) {
      this.api.deleteSingleEvidence(item.controls.id.value).subscribe({
        next: (res: any) => {
          if (res === 'success') {
            this.delEvidenceMsg = 'Deleted';
          } else {
            this.delEvidenceMsg = 'not found!';
          }
          setInterval(() => (this.delEvidenceMsg = ''), 5000);
        },
        error: (err: any) => console.log(err),
      });
    }
    redirecttolist() {
      this.router.navigate(['finding/list']);
    }
    addNewFinding(){
      let finding={
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
              police: [
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
              police: [
              ]
            },
            createdOn: "string",
            report: [
            ]
          },
          casetypeId: 0,
          casetype: {
            id: 0,
            name: "string",
            report: [
            ]
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
              wstatement: "string",
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
              sstatement: "string",
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
        description: this.Description.value,
        createdOn: this.createdOn.value,
        evidencess: this.evidences.value,
        interviewss: this.interviews.value,
        evidencesss: [
        ],
        interviewsss: [

        ]
      }
      this.api.insertFinding(finding).subscribe({
        next: (res: any) => {
          this.addMsg = 'report Inserted';
          setInterval(() => (this.addMsg = ''), 5000);
          this.findingForm.reset();
          this.router.navigate(['finding/list'])
        },
        error: (err: any) => console.log(err),
      });
    }
}
