import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@Injectable()
export class ModalService {

  constructor(private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private sessionService: SessionService) { }

  private openGenericRegisterModal(mode: string, title?: string) {
    const modalRef = this.modalService.open(RegisterModalComponent);
    modalRef.componentInstance.mode = mode;
    modalRef.componentInstance.title = title;
  }

  openLoginModal(){
    this.openGenericRegisterModal('login', 'Log in');
  }

  openSignupModal(){
    this.openGenericRegisterModal('signup', 'Sign up');
  }

  openAddSlotModal(){
    this.openGenericRegisterModal('addslot', 'Add a new service slot');
  }

  openAddBabyModal(){
    this.openGenericRegisterModal('addbaby', 'Add baby information');
  }

  dismissModal() {
    this.activeModal.dismiss();
  }
}
