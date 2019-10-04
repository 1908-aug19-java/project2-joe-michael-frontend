import { TestBed, async, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TeamLoadGuard } from './team-load.guard';

describe('TeamLoadGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TeamLoadGuard],
            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: TeamLoadGuard}
                ])
            ]
        });
    });

    it('should ...', inject([TeamLoadGuard], (guard: TeamLoadGuard) => {
        expect(guard).toBeTruthy();
    }));
});
