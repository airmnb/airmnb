import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@Injectable()
export class ModalService {

  constructor(private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private sessionService: SessionService) { }

  private openGenericRegisterModal(mode: string) {
    const modalRef = this.modalService.open(RegisterModalComponent);
    modalRef.componentInstance.mode = mode;
  }

  openLoginModal(){
    this.openGenericRegisterModal('login');
  }

  openSignupModal(){
    this.openGenericRegisterModal('signup');
  }

  dismissModal() {
    this.activeModal.dismiss();
  }
}
