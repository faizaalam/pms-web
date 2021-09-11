import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Prescription } from '../models/Prescription';
import { PrescriptionManagementService } from '../_services/prescription-management.service';
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
  fromMonth!: number;
  
  toMonth!: number;
  showAlert = false;
  notificationMessage = '';
  @ViewChild('formComponent') formComponent!: FormComponent;

  months = [
    {label: 'Select month' , value: null },
    {label: 'January', value: 1},
    {label: 'February', value: 2},

    {label: 'March', value: 3},

    {label: 'April', value: 4},

    {label: 'May', value: 5},

    {label: 'June', value: 6},

    {label: 'July', value: 7},

    {label: 'August', value: 8},

    {label: 'September', value: 9},

    {label: 'October', value: 10},

    {label: 'November', value: 11},

    {label: 'December', value: 12},

  ]

  constructor(private prescriptionService: PrescriptionManagementService) {

   }

  ngOnInit(): void {
    console.log(new Date());
    this.fromMonth = new Date().getUTCMonth() + 1;
    this.toMonth = new Date().getUTCMonth() + 1;

    this.fetchPrescriptions();
 }

  fetchPrescriptions(showReport = false) {
    let searchQuery = new Map();
    if (showReport) {
      searchQuery = new Map().set('reportDate',  moment(this.reportDate).format("YYYY-MM-DD") ) ;
    } else {
      searchQuery =  new Map().set('fromMonth', this.fromMonth).set('toMonth', this.toMonth) 
    }
  this.subscriptions.fetchDataSub = this.prescriptionService.getPrescriptions(searchQuery).subscribe(
      data => {
        this.prescriptions = data;
        if (showReport) {
          this.showAlert = true;
          this.notificationMessage = "Report count :" + data.length;
        }
      }
    );
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";

  }

  closePopup(event:any) {
    this.displayStyle = "none";
    this.showPrescriptionForm = false;
    this.selectedPrescription= null;
    this.fetchPrescriptions();
    if(event && event.event != 'Cancel') {
      this.showAlert = true;
      this.notificationMessage = event.event == 'Update' ? 'Prescription updated' : 'Prescription created' + ' succesfully';
    }
  }

  
 
  createForm() {
    this.showPrescriptionForm = true;
    this.selectedPrescription= null;
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
        this.showAlert = true;
        this.notificationMessage = 'Prescription entry deleted Successfully';
        console.log("Deleted Successfully");
      }
    );
  }

  showReport() {
    this.fetchPrescriptions(true);
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
