import { WagerFilterPipe } from './wager-filter.pipe';

describe('WagerFilterPipe', () => {

    const filterPipe = new WagerFilterPipe();

    it('create an instance', () => {

        const pipe = new WagerFilterPipe();
        expect(pipe).toBeTruthy();
    });

    it('Test Null Value', () => {

        const a = [];

        expect(filterPipe.transform(a, 0)).toBe(a);
    });
});
