import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Prescription } from '../models/Prescription';
import { PrescriptionManagementService } from '../_services/prescription-management.service';

@Component({
  selector: 'app-prescription-management',
  templateUrl: './prescription-management.component.html',
  styleUrls: ['./prescription-management.component.scss']
})
export class PrescriptionManagementComponent implements OnInit, OnDestroy {
  subscriptions : any;
  prescriptions: Prescription[] = [];
  constructor(private prescriptionService: PrescriptionManagementService ) {

   }

  ngOnInit(): void {
    this.fetchPrescriptions();
    this.newEntryPrecription();
  }

  fetchPrescriptions() {
  this.subscriptions.fetchDataSub = this.prescriptionService.getPrescriptions(new Map()).subscribe(
      data => {
        this.prescriptions = data;
      }
    );
  }

  newEntryPrecription() {
    let prescription = new Prescription();
    prescription.age = 19;
    prescription.name = 'faiza';
    prescription.diagnosis = 'cold';
    prescription.gender = 'FEMALE';
    prescription.prescriptionDate = new Date();
    prescription.visitDate = new Date();
    prescription.prescribedMedicine = 'Alatrol';

    this.subscriptions.createDataSub = this.prescriptionService.createPrescription(prescription).subscribe(
      data => {
       console.log("Created Successfully");
      }
    );
  }
  editPrescription(id : number) {
    let prescription = new Prescription();

    this.subscriptions.editDataSub = this.prescriptionService.updatePrescription(prescription, id).subscribe(
      data => {
       console.log("Updated Successfully");
      }
    );
  }
  deletePrescription(id : number){
    this.subscriptions.editDataSub = this.prescriptionService.deletePrescription( id).subscribe(
      data => {
       console.log("Deleted Successfully");
      }
    );
  }

  ngOnDestroy() {
    for(let keys in this.subscriptions) {
      if (this.subscriptions[keys] instanceof Subscriber) {
        this.subscriptions[keys].unsubscribe;
      }
    }
  }

}
