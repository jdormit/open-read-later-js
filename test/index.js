const expect = require('chai').expect;
const openReadLater = require('..');

const readLaterText =
`url: https://example.com
title: Example One
tags: tag1, tag2
---
url: http://example.com
title: Example Two
tags: tag2, tag3, tag4
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
                        title: 'Example One',
                        tags: [ 'tag1', 'tag2' ]
                    },
                    {
                        url: 'http://example.com',
                        title: 'Example Two',
                        tags: [ 'tag2', 'tag3', 'tag4' ]
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
