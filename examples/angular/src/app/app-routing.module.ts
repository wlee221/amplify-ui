import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomSignUpFieldsComponent } from 'src/pages/ui/components/authenticator/custom-sign-up-fields/custom-sign-up-fields.component';
import { CustomSlotsComponent } from 'src/pages/ui/components/authenticator/custom-slots/custom-slots.component';
import { HubEventsComponent } from 'src/pages/ui/components/authenticator/hub-events/hub-events.component';
import { I18nComponent } from 'src/pages/ui/components/authenticator/i18n/i18n.component';
import { ModalComponent } from 'src/pages/ui/components/authenticator/modal/modal.component';
import { ResetPasswordComponent } from 'src/pages/ui/components/authenticator/reset-password/reset-password.component';
import { SignInTOTPMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-mfa/sign-in-totp-mfa.component';
import { SignInWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-in-with-email/sign-in-with-email.component';
import { SignInWithUsernameComponent } from 'src/pages/ui/components/authenticator/sign-in-with-username/sign-in-with-username.component';
import { SignUpWithAttributesComponent } from 'src/pages/ui/components/authenticator/sign-up-with-attributes/sign-up-with-attributes.component';
import { SignUpWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email/sign-up-with-email.component';
import { SignUpWithEmailLambdaComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email-lambda/sign-up-with-email-lambda.component';
import { SignUpWithUsernameComponent } from 'src/pages/ui/components/authenticator/sign-up-with-username/sign-up-with-username.component';
import { UseAuthenticatorComponent } from 'src/pages/ui/components/authenticator/useAuthenticator/useAuthenticator.component';
import { UseAuthenticatorHomeComponent } from 'src/pages/ui/components/authenticator/useAuthenticator/home/useAuthenticatorHome.component';

const routes: Routes = [
  {
    path: 'ui/components/authenticator/custom-sign-up-fields',
    component: CustomSignUpFieldsComponent,
  },
  {
    path: 'ui/components/authenticator/custom-slots',
    component: CustomSlotsComponent,
  },
  {
    path: 'ui/components/authenticator/hub-events',
    component: HubEventsComponent,
  },
  {
    path: 'ui/components/authenticator/modal',
    component: ModalComponent,
  },
  {
    path: 'ui/components/authenticator/reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'ui/components/authenticator/sign-in-with-email',
    component: SignInWithEmailComponent,
  },
  {
    path: 'ui/components/authenticator/i18n',
    component: I18nComponent,
  },
  {
    path: 'ui/components/authenticator/sign-in-totp-mfa',
    component: SignInTOTPMFAComponent,
  },
  {
    path: 'ui/components/authenticator/sign-in-with-username',
    component: SignInWithUsernameComponent,
  },
  {
    path: 'ui/components/authenticator/sign-up-with-attributes',
    component: SignUpWithAttributesComponent,
  },
  {
    path: 'ui/components/authenticator/sign-up-with-username',
    component: SignUpWithUsernameComponent,
  },
  {
    path: 'ui/components/authenticator/sign-up-with-email',
    component: SignUpWithEmailComponent,
  },
  {
    path: 'ui/components/authenticator/sign-up-with-email-lambda',
    component: SignUpWithEmailLambdaComponent,
  },
  {
    path: 'ui/components/authenticator/sign-up-with-email',
    component: SignUpWithEmailComponent,
  },
  {
    path: 'ui/components/authenticator/useAuthenticator',
    component: UseAuthenticatorComponent,
  },
  {
    path: 'ui/components/authenticator/useAuthenticator/home',
    component: UseAuthenticatorHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
