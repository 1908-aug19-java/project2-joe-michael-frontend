import { TestBed, async, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatchFixtureGuard } from './match-fixture.guard';

describe('MatchFixtureGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MatchFixtureGuard],
            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: MatchFixtureGuard}
                ])
            ]
        });
    });

    it('should ...', inject([MatchFixtureGuard], (guard: MatchFixtureGuard) => {
        expect(guard).toBeTruthy();
    }));
});
