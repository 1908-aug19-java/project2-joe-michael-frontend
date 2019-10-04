import { TestBed, async, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NoLoginGuard } from './no-login.guard';

describe('NoLoginGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NoLoginGuard],
            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: NoLoginGuard}
                ])
            ]
        });
    });

    it('should ...', inject([NoLoginGuard], (guard: NoLoginGuard) => {
        expect(guard).toBeTruthy();
    }));
});
