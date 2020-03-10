'use strict';

const rule = require('..');
const { messages, ruleName } = rule;

testRule(rule, {
	ruleName,
	config: ['always'],
	// fix: true,

	accept: [
		{
			code: 'a { display: flex; flex-wrap: nowrap }',
			description: 'accepts flex-wrap',
		},
		{
			code: 'a { display: flex; align-content: space-between; }',
			description: 'accepts flex-wrap',
		},
		{
			code: 'a { display: flex;  align-items:space-between; }',
			description: 'accepts flex-wrap',
		},
		{
			code: 'a { display: flex; gap: 1;  }',
			description: 'accepts flex-wrap',
		},
		{
			code: 'a { display: flex; flex-direction:row;  }',
			description: 'accepts flex-wrap',
		},
		{
			code: 'a { display: flex; flex-flow: 1;   }',
			description: 'accepts flex-wrap',
		},
		{
			code: 'a { flex-wrap: nowrap; display: flex;  }',
			description: 'accepts flex-wrap',
		},
	],

	reject: [
		{
			code: 'a { flex-wrap: nowrap }',
			message: messages.expected('flex-wrap'),
			line: 1,
			column: 16,
		},
		{
			code: 'a { align-content: space-between; }',
			message: messages.expected('align-content'),
			line: 1,
			column: 20,
		},
		{
			code: 'a { align-items:space-between; }',
			message: messages.expected('align-items'),
			line: 1,
			column: 17,
		},
		{
			code: 'a { gap: 1; }',
			message: messages.expected('gap'),
			line: 1,
			column: 10,
		},
		{
			code: 'a { flex-direction:row; }',
			message: messages.expected('flex-direction'),
			line: 1,
			column: 20,
		},
		{
			code: 'a { flex-flow: 1; }',
			message: messages.expected('flex-flow'),
			line: 1,
			column: 16,
		},
	],
});
