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

const readLaterTextRepeatedUrls =
`url: https://example.com
title: Example One
tags: tag1, tag2
---
url: https://example.com
title: Example Two
tags: tag2, tag3, tag4
---
url: https://jeremydormitzer.com
title: The best website ever`;

describe('ReadLaterList', function() {
    describe('parsing', function() {
        it('should parse a standard Open Read-Later-formatted text', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText);
            expect(readLaterList).to.deep.include({
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
        it('should throw an error for non-unique urls', function() {
            expect(() => openReadLater.parseReadLaterList(readLaterTextRepeatedUrls)).to.throw();
        });
    });
    describe('#toString', function() {
        it('should render a readLaterList to a string', function() {
            const expectedString =
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

            const readLaterList = openReadLater.parseReadLaterList(readLaterText);
            expect(readLaterList.toString()).to.equal(expectedString);
        });
    });
});
