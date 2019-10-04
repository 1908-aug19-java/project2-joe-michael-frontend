import { TestBed, async, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PlayerLoadGuard } from './player-load.guard';

describe('PlayerLoadGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PlayerLoadGuard],
            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: PlayerLoadGuard}
                ])
            ]
        });
    });

    it('should ...', inject([PlayerLoadGuard], (guard: PlayerLoadGuard) => {
        expect(guard).toBeTruthy();
    }));
});
