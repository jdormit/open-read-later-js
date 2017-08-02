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
    describe('newReadLaterList()', function() {
        it('should create an empty readLaterList', function() {
            const readLaterList = openReadLater.newReadLaterList();
            expect(readLaterList).to.deep.include({ links: [] });
            expect(readLaterList).to.have.all.keys('links', 'addLink', 'getLink', 'removeLink', 'updateLink', 'toString');
            expect(readLaterList.addLink).to.be.a('function');
            expect(readLaterList.getLink).to.be.a('function');
            expect(readLaterList.updateLink).to.be.a('function');
            expect(readLaterList.removeLink).to.be.a('function');
            expect(readLaterList.toString).to.be.a('function');
        });
    });
    describe('parseReadLaterList()', function() {
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
            expect(readLaterList).to.have.all.keys('links', 'addLink', 'getLink', 'removeLink', 'updateLink', 'toString');
            expect(readLaterList.addLink).to.be.a('function');
            expect(readLaterList.getLink).to.be.a('function');
            expect(readLaterList.updateLink).to.be.a('function');
            expect(readLaterList.removeLink).to.be.a('function');
            expect(readLaterList.toString).to.be.a('function');
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
    describe('#addLink', function() {
        it('should add a valid link', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText).addLink({
                url: 'https://facebook.com',
                title: 'The Downfall of the Internet',
                tags: ['evilcorp', 'social media']
            });
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
                    },
                    {
                        url: 'https://facebook.com',
                        title: 'The Downfall of the Internet',
                        tags: ['evilcorp', 'social media']
                    }
                ]
            });
            expect(readLaterList).to.have.all.keys('links', 'addLink', 'getLink', 'removeLink', 'updateLink', 'toString');
            expect(readLaterList.addLink).to.be.a('function');
            expect(readLaterList.getLink).to.be.a('function');
            expect(readLaterList.updateLink).to.be.a('function');
            expect(readLaterList.removeLink).to.be.a('function');
            expect(readLaterList.toString).to.be.a('function');
        });
        it('should throw an error if link is added with a duplicate url', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText);
            expect(() => readLaterList.addLink({
                url: 'https://example.com',
                title: 'A duplicate URL'
            })).to.throw();
        });
    });
    describe('#removeLink', function() {
        it('should remove a link', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText).removeLink('https://example.com');
            expect(readLaterList).to.deep.include({
                links: [
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
            expect(readLaterList).to.have.all.keys('links', 'addLink', 'getLink', 'removeLink', 'updateLink', 'toString');
            expect(readLaterList.addLink).to.be.a('function');
            expect(readLaterList.getLink).to.be.a('function');
            expect(readLaterList.updateLink).to.be.a('function');
            expect(readLaterList.removeLink).to.be.a('function');
            expect(readLaterList.toString).to.be.a('function');
        });
        it('should fail silently removing a link that does not exist', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText).removeLink('https://facebook.com');
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
            expect(readLaterList).to.have.all.keys('links', 'addLink', 'getLink', 'removeLink', 'updateLink', 'toString');
            expect(readLaterList.addLink).to.be.a('function');
            expect(readLaterList.getLink).to.be.a('function');
            expect(readLaterList.updateLink).to.be.a('function');
            expect(readLaterList.removeLink).to.be.a('function');
            expect(readLaterList.toString).to.be.a('function');
        });
    });
    describe('#getLink', function() {
        it('should get a link', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText);
            const jeremyLink = readLaterList.getLink('https://jeremydormitzer.com');
            expect(jeremyLink).to.deep.equal({
                url: 'https://jeremydormitzer.com',
                title: 'The best website ever'
            });
        });
        it('should return undefined for a link that does not exist', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText);
            expect(readLaterList.getLink('https://facebook.com')).to.be.undefined;
        });
    });
    describe('#updateLink', function() {
        it('should update a link', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText);
            const updatedList = readLaterList.updateLink('https://example.com', {
                url: 'https://foo.example.com',
                title: 'Updated example'
            });
            expect(updatedList).to.deep.include({
                links: [
                    {
                        url: 'https://foo.example.com',
                        title: 'Updated example'
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
            expect(updatedList).to.have.all.keys('links', 'addLink', 'getLink', 'removeLink', 'updateLink', 'toString');
            expect(updatedList.addLink).to.be.a('function');
            expect(updatedList.getLink).to.be.a('function');
            expect(updatedList.updateLink).to.be.a('function');
            expect(updatedList.removeLink).to.be.a('function');
            expect(updatedList.toString).to.be.a('function');
        });
        it('should throw an error updating a link with a duplicate URL', function() {
            const readLaterList = openReadLater.parseReadLaterList(readLaterText);
            expect(() => readLaterList.updateLink('https://example.com', { url: 'http://example.com' })).to.throw();
        });
    });
});
