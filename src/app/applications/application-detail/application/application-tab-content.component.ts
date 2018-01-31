import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Application } from 'app/models/application';
// import { CollectionsArray } from 'app/models/collection';

@Component({
  selector: 'app-application-tab-content',
  templateUrl: './application-tab-content.component.html',
  styleUrls: ['./application-tab-content.component.scss']
})
export class ApplicationTabContentComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public application: Application;
  // public collections: CollectionsArray;

  private sub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.application = null;
    // this.collections = new CollectionsArray();

    this.sub = this.route.parent.data.subscribe(
      (data: { application: Application }) => {
        if (data.application) {
          this.application = data.application;
          // if (data.application.collections) {
          //   this.collections = data.application.collections.documents;
          //   this.collections.sort();
          // }
        }
      },
      error => console.log(error),
      () => this.loading = false
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
