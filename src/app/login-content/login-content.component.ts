import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../api.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';
import { AccountProfile } from '../../../types';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'amb-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.css']
})
export class LoginContentComponent implements OnInit {

  @Input() accountName: string;
  password: string;
  role: string;
  errorMessage: string;
  private submitted: boolean;

  constructor(public modalService: ModalService,
    public activeModal: NgbActiveModal,
    private loginService: LoginService,
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.submitted = true;
    try{
      const account = await this.loginService.login({
        name: this.accountName,
        password: this.password,
        role: this.role
      });
      this.sessionService.login(account, this.role);
      // this.modalService.dismissModal();
      // const routeUrl = this.role === 'provider' ? 'provider' :
      //       this.role === 'consumer' ? 'consumer' :
      //       '';
      // this.router.navigateByUrl(routeUrl);
      // this.errorMessage = null;
      // this.activeModal.dismiss();
      this.sessionService.getProfile().subscribe(p => this.routeByProfile(p));
    }catch (e){
      this.errorMessage = e.message;
      this.submitted = false;
    }
  }

  private routeByProfile(p: AccountProfile) {
    if(p) {
      this.router.navigateByUrl("/");
    }else{
      this.notificationService.info("Please input your profile to continue the journey.");
      this.router.navigate(['/profile']);
    }
  }

  signup(){
    this.activeModal.dismiss();
    this.modalService.openSignupModal();
    return false;
  }
}
