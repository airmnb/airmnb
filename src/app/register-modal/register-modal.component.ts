import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'amb-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  @Input() mode: string;
  @Input() title: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  dismissModal(){
    this.activeModal.dismiss();
  }

}
