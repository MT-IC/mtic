import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
    template: ''
})
export abstract class BaseComponent implements OnDestroy {
    protected subscriptions: Subscription[] = [];

    subscribe<T>(observable: Observable<T>, next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        const subscription = observable.subscribe(next, error, complete);
        this.subscriptions.push(subscription);
        return subscription;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}
