const expect = require('chai').expect;
const openReadLater = require('..');

const readLaterText = `url: https://example.com
title: Example One
---
url: http://example.com
title: Example Two
---
url: https://jeremydormitzer.com
title: The best website ever`;

describe('ReadLaterList', function() {
    describe('parsing', function() {
        it('should parse a standard Open Read-Later-formatted text', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText);
            expect(readLaterList).to.deep.equal({
                links: [
                    {
                        url: 'https://example.com',
                        title: 'Example One'
                    },
                    {
                        url: 'http://example.com',
                        title: 'Example Two'
                    },
                    {
                        url: 'https://jeremydormitzer.com',
                        title: 'The best website ever'
                    }
                ]
            });
        });
    });
});
