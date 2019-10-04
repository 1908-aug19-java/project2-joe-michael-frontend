import { TestBed, async, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LoginGuard } from './login.guard';

describe('LoginGuardGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginGuard],

            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: LoginGuard}
                ])
            ]
        });
    });

    it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
        expect(guard).toBeTruthy();
    }));
});
