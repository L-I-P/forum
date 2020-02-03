import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    matcher = new MyErrorStateMatcher();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        if (localStorage.getItem('name') !== null && localStorage.getItem('token') !== null) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirmation: ['', Validators.required]
        },
            { validator: this.checkPasswords }
        );
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    checkPasswords(group: FormGroup) {
        const password = group.get('password').value;
        const passwordConfirmation = group.get('passwordConfirmation').value;

        return password === passwordConfirmation ? null : { notSame: true }
    }

}
