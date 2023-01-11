import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export abstract class OnDestroyHook implements OnDestroy {
  private subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

    this.subscriptions = [];
  }

  addSubscription(...subscriptions: Subscription[]): void {
    subscriptions.forEach(
      (sub: Subscription) => this.subscriptions.push(sub)
    );
  }
}
