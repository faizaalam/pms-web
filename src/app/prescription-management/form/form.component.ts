import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prescription } from 'src/app/models/Prescription';
import { PrescriptionManagementService } from 'src/app/_services/prescription-management.service';
 @Component({
  selector: 'app-prescription-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
  subscriptions :any= {};
  prescriptionForm!: FormGroup ;
  constructor(private fb: FormBuilder,
    private prescriptionService: PrescriptionManagementService) { }

  @Input('selectedPrescription') selectedPrescription :Prescription| undefined | null;
  @Output('onCancel') onCancel = new EventEmitter();
  @Output('onSave') onSave = new EventEmitter();

  genders:any[]  = [];

  ngOnInit(): void {
    this.genders  =[
      {label: "Select gender", value: null},
    {label: "MALE", value: "MALE"},
    {label: "FEMALE", value: "FEMALE"}
  ];
    this.prepareForm(this.selectedPrescription ? this.selectedPrescription : new Prescription());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedPrescription && changes.selectedPrescription.currentValue) {
      this.prepareForm(this.selectedPrescription ? this.selectedPrescription : new Prescription());
    }
  }

  prepareForm(prescription?: Prescription) {
    prescription = prescription ? prescription: new Prescription();
    this.prescriptionForm = this.fb.group({
      name: [prescription.name, [Validators.required,Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/[a-zA-Z0-9]/)]],
      age: [prescription.age, [Validators.required,Validators.minLength(1), Validators.maxLength(3), Validators.min(0), Validators.max(200)]],
      prescriptionDate: [prescription.prescriptionDate ? new Date(prescription.prescriptionDate) : new Date(), [Validators.required]],
      visitDate: [prescription.visitDate ? new Date(prescription.visitDate) : new Date()],
      diagnosis: [prescription.diagnosis, [Validators.required]],
      gender: [prescription.gender, [Validators.required]],
      prescribedMedicine: [prescription.prescribedMedicine, [Validators.required]]
    });
  }

  submit() {
    if (this.selectedPrescription) {
      this.editPrescription(this.selectedPrescription.id);
    } else {
      this.createPrecription();
    }
  }

  createPrecription() {
    let prescription = this.prescriptionForm.value;

    this.subscriptions.createDataSub = this.prescriptionService.createPrescription(prescription).subscribe(
      data => {
       console.log("Created Successfully");
       this.prepareForm(new Prescription());
       this.onSave.emit({event: 'Create'});
      }
    );
  }

  editPrescription(id : number) {
    let prescription =  this.prescriptionForm.value;
    prescription.id = id;
    this.subscriptions.editDataSub = this.prescriptionService.updatePrescription(prescription, id).subscribe(
      data => {
       console.log("Updated Successfully");
       this.prepareForm(new Prescription());
       this.onSave.emit({event: 'Update'});
      }
    );
  }

  close() {
    this.selectedPrescription = null;
    this.prepareForm(new Prescription());
    this.onCancel.emit({event: 'Cancel'});
  }

  getErrorMessage(controlName: any) {
    if (!this.prescriptionForm.controls[controlName]) {
      return '';
    }
    if (this.prescriptionForm.controls[controlName].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.prescriptionForm.controls[controlName].hasError('max')) {
      return 'Max validation exceeded';
    }


    if (this.prescriptionForm.controls[controlName].hasError('minlength')) {
      return 'Cannot be less than 1 ';
    }

    if (this.prescriptionForm.controls[controlName].hasError('maxlength')) {
      return 'Cannot be greater than 3';
    }
    if (this.prescriptionForm.controls[controlName].hasError('pattern')) {
      return 'Character not allowed';
    }
    return '';
  }




}
