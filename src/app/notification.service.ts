import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
}


@Injectable()
export class NotificationService {

    private _msgSource = new Subject<Msg | null>();
  
    msg = this._msgSource.asObservable();
  
    update(content: string, 
            style: 'success' | 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'dark' | 'secondary' | 'light') {
      const msg: Msg = { content, style };
      this._msgSource.next(msg);
    }
  
    clear() {
      this._msgSource.next(null);
    }
  }


