import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ServiceSlot } from '../../types';
import { EventDetailComponent } from './event-detail/event-detail.component';

@Injectable()
export class EventDetailService {
  private config: MatDialogConfig = {
    width: '100%',
    // scrollStrategy:
    minWidth: '100%',
    // minHeight: '100%'
    height: '100%',
    minHeight: '100%',
    maxHeight: '100%'
  };

  constructor(
    private dialog: MatDialog
  ) { }

  public async open(slot: ServiceSlot): Promise<any> {
    let dialogRef: MatDialogRef<EventDetailComponent>;
    dialogRef = this.dialog.open(EventDetailComponent, this.config);

    dialogRef.componentInstance.slot = slot;

    return dialogRef.afterClosed().toPromise();
  }
}
