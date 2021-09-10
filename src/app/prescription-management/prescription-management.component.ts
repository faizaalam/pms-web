import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Prescription } from '../models/Prescription';
import { PrescriptionManagementService } from '../_services/prescription-management.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import * as moment from 'moment';

@Component({
  selector: 'app-prescription-management',
  templateUrl: './prescription-management.component.html',
  styleUrls: ['./prescription-management.component.scss']
})
export class PrescriptionManagementComponent implements OnInit, OnDestroy {
  subscriptions : any = {};
  prescriptions: Prescription[] = [];
  selectedPrescription : Prescription | undefined | null;
  showPrescriptionForm = false;
  reportDate = new Date();
  @ViewChild('formComponent') formComponent!: FormComponent;;

  constructor(private prescriptionService: PrescriptionManagementService) {

   }

  ngOnInit(): void {
    this.fetchPrescriptions();
 }

  fetchPrescriptions() {
  this.subscriptions.fetchDataSub = this.prescriptionService.getPrescriptions(new Map().set('prescriptionDate', moment(this.reportDate).format("YYYY-MM-DD") ) ).subscribe(
      data => {
        this.prescriptions = data;
      }
    );
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
    this.showPrescriptionForm = false;
    this.selectedPrescription= null;
    this.fetchPrescriptions();
  }

  
 
  createForm() {
    this.showPrescriptionForm = true;
    this.openPopup();
  }
  showForm(selectedPrescription: Prescription) {
      this.selectedPrescription =  selectedPrescription;
      this.showPrescriptionForm = true;
      this.openPopup();
  }


  deletePrescription(id : number){
    this.subscriptions.deleteDataSub = this.prescriptionService.deletePrescription( id).subscribe(
      data => {
        this.fetchPrescriptions();
       console.log("Deleted Successfully");
      }
    );
  }



searchData() {
  this.fetchPrescriptions();
}

  ngOnDestroy() {
    for(let keys in this.subscriptions) {
      if (this.subscriptions[keys] instanceof Subscriber) {
        this.subscriptions[keys].unsubscribe;
      }
    }
  }

}
