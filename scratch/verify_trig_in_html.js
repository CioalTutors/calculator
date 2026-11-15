const fs = require('fs');

const indexHtml = fs.readFileSync('c:/Users/Person/Documents/GitHub/calculator/index.html', 'utf8');

// We want to test evaluateMath in the same environment
const vm = require('vm');

// Create mock React/DOM environment
let state = {
    variables: { A:0, B:0, C:0, D:0, E:0, F:0, X:0, Y:0, M:0 },
    ansValue: 0,
    ansDisplay: '0',
    angleMode: 'D',
    displayFormat: 'Norm'
};

// Check if index.html contains trigTan
console.log('Contains trigTan:', indexHtml.includes('function trigTan'));
console.log('Contains Math ERROR:', indexHtml.includes('Math ERROR'));
