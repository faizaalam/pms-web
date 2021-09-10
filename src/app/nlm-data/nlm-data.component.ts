import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { NlmDataService } from '../_services/nlm-data.service';

@Component({
  selector: 'app-nlm-data',
  templateUrl: './nlm-data.component.html',
  styleUrls: ['./nlm-data.component.scss']
})
export class NlmDataComponent implements OnInit, OnDestroy {
  data : any;
  subscriptions: any;
  constructor(private nlmDataService: NlmDataService) { }

  ngOnInit(): void {
    this.subscriptions.fethcNlmDataSub = this.nlmDataService.getNLMData().subscribe(
          data => {
            this.data = data;
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
