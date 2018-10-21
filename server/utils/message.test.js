var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () =>{
	it('should generate correct message object', () => {
	
		var from = "matthew";
		var text = "finish udemy!";
		var messagetest = generateMessage(from, text)
        expect(messagetest).toInclude({from,text})
		expect(messagetest.createdAt).toBeA('number')
		//store res in variable
		// assert from match
		// assert text match
		// assert createdAt is number
	})

})