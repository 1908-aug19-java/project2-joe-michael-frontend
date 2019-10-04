import { TestBed, async, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ApiGuard } from './api.guard';

describe('ApiGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiGuard],
            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: ApiGuard}
                ])
            ]
        });
    });

    it('should ...', inject([ApiGuard], (guard: ApiGuard) => {
        expect(guard).toBeTruthy();
    }));
});
