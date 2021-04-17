import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();

    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

    data = new BehaviorSubject<any>({});
    currentData = this.data.asObservable();
    sendData(pushdata) {
        this.data.next(pushdata);
    }

    isView = new BehaviorSubject<any>({});
    View = this.isView.asObservable();
    pushView(view) {
        this.isView.next(view);
    }

}
