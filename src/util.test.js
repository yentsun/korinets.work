import { describe, it, expect, vi, beforeEach } from 'vitest';
import { timeSince, average, median, requestPassword, requestUUID } from './util';


describe('timeSince', () => {
    it('returns years for dates more than a year ago', () => {
        const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
        expect(timeSince(twoYearsAgo)).toBe('2 years');
    });

    it('returns months for dates a few months ago', () => {
        const threeMonthsAgo = new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000);
        expect(timeSince(threeMonthsAgo)).toBe('3 months');
    });

    it('returns days for dates a few days ago', () => {
        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
        expect(timeSince(threeDaysAgo)).toBe('3 days');
    });

    it('returns hours for dates a few hours ago', () => {
        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
        expect(timeSince(threeHoursAgo)).toBe('3 hours');
    });

    it('returns minutes for dates a few minutes ago', () => {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        expect(timeSince(fiveMinutesAgo)).toBe('5 minutes');
    });

    it('returns seconds for very recent dates', () => {
        const tenSecondsAgo = new Date(Date.now() - 10 * 1000);
        expect(timeSince(tenSecondsAgo)).toBe('10 seconds');
    });
});

describe('average', () => {
    it('calculates average of values', () => {
        expect(average([2, 4, 6])).toBe(4);
    });

    it('returns the value for single-element array', () => {
        expect(average([5])).toBe(5);
    });
});

describe('median', () => {
    it('returns median of odd-length array', () => {
        expect(median([1, 3, 5])).toBe(3);
    });

    it('returns median of even-length array', () => {
        expect(median([1, 2, 3, 4])).toBe(2.5);
    });
});

describe('requestPassword', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('fetches password and displays it in a textarea', async () => {
        const textarea = document.createElement('textarea');
        const p = document.createElement('p');
        p.appendChild(textarea);
        const parent = document.createElement('div');
        parent.appendChild(p);
        const target = document.createElement('a');
        parent.appendChild(target);

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            json: () => Promise.resolve({ data: { password: 'abc123' } })
        }));

        requestPassword({ target });

        await vi.waitFor(() => {
            expect(textarea.innerText).toBe('abc123');
        });
    });

    it('does nothing when no <p> element is found', () => {
        const parent = document.createElement('div');
        const target = document.createElement('a');
        parent.appendChild(target);

        vi.stubGlobal('fetch', vi.fn());

        requestPassword({ target });

        expect(fetch).not.toHaveBeenCalled();
    });
});

describe('requestUUID', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('fetches UUID and displays it in a textarea', async () => {
        const textarea = document.createElement('textarea');
        const p = document.createElement('p');
        p.appendChild(textarea);
        const parent = document.createElement('div');
        parent.appendChild(p);
        const target = document.createElement('a');
        parent.appendChild(target);

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            json: () => Promise.resolve({ data: { uuid: 'uuid-123' } })
        }));

        requestUUID({ target });

        await vi.waitFor(() => {
            expect(textarea.innerText).toBe('uuid-123');
        });
    });
});
