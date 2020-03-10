'use strict';

const declarationValueIndex = require('../../utils/declarationValueIndex');
const report = require('../../utils/report');
const ruleMessages = require('../../utils/ruleMessages');

const ruleName = 'inactive-css';

const messages = ruleMessages(ruleName, {
	expected: (propName) => `${propName} will be inactive`,
});

function rule() {
	return (root, result) => {
		root.walkRules((rule) => {
			const propResult = {};

			const props = [
				'flex-wrap',
				'align-content',
				'align-items',
				'gap',
				'flex-direction',
				'flex-flow',
			];

			props.forEach((prop) => {
				propResult[prop] = {};
				rule.walkDecls((decl) => {
					if (decl.prop === prop) {
						propResult[prop].found = true;
						propResult[prop].decl = decl;
					}

					if (decl.prop === 'display' && decl.value === 'flex') {
						propResult[prop].isFlexFound = true;
					}
				});

				if (propResult[prop].found && !propResult[prop].isFlexFound) {
					report({
						message: messages.expected(prop),
						node: propResult[prop].decl,
						index: declarationValueIndex(propResult[prop].decl),
						result,
						ruleName,
					});
				}
			});
		});
	};
}

rule.primaryOptionArray = true;
rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
