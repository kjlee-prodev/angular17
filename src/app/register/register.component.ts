import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  router = inject(Router);
  userService = inject(UserService); // 로그인만 시켜주자.

  registerFormGroup!: FormGroup;
  isValid = false;

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]}),
      passwordConfirm: new FormControl('', {validators: [Validators.required]}),
    });

    this.registerFormGroup.valueChanges.pipe(
      debounceTime(200),
      tap(value => {
        this.isValid = this.registerFormGroup.valid && value.password === value.passwordConfirm;
      })
    ).subscribe();
  }

  get emailControl() { return this.registerFormGroup.get('email'); }

  submit(e: any) {
    if(this.isValid) {
      this.userService.setUser(this.emailControl?.value);
      this.router.navigateByUrl('/main');
    }
  }
}
