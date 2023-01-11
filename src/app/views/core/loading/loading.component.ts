import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { LoadingScreenService } from '../../../services/loading/loading.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  loading = false;
  loadingSubscription: Subscription;
  private loadingStatus$: Observable<boolean>;

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  ngOnInit(): void {
    this.loadingStatus$ = this.loadingScreenService.loadingStatus.pipe(
      debounceTime(200)
    );

    this.loadingSubscription = this.loadingStatus$.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
