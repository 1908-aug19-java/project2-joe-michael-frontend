import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './api.service';

describe('ApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({

            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {path: '', component: ApiService}
                ])
            ]

        }
    ));

    it('should be created', () => {
        const service: ApiService = TestBed.get(ApiService);
        expect(service).toBeTruthy();
    });
});
