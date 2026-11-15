const fs = require('fs');

function evaluateTest(exp, angleMode = 'D') {
    // 10. Normalize Inverse Trigonometry
    exp = exp
      .replace(/(?:sin⁻¹|sin\^-1|sin\*\*-1|asin)\(/g, 'TR_ASIN(')
      .replace(/(?:cos⁻¹|cos\^-1|cos\*\*-1|acos)\(/g, 'TR_ACOS(')
      .replace(/(?:tan⁻¹|tan\^-1|tan\*\*-1|atan)\(/g, 'TR_ATAN(');

    // Expand Trigonometric functions according to Angle Mode
    if (angleMode === 'D') {
        exp = exp
          .replace(/sin\(/g, 'Math.sin((Math.PI/180)*')
          .replace(/cos\(/g, 'Math.cos((Math.PI/180)*')
          .replace(/tan\(/g, 'Math.tan((Math.PI/180)*')
          .replace(/TR_ASIN\(/g, '(180/Math.PI)*Math.asin(')
          .replace(/TR_ACOS\(/g, '(180/Math.PI)*Math.acos(')
          .replace(/TR_ATAN\(/g, '(180/Math.PI)*Math.atan(');
    }
    
    // Balance parens
    let openCount = 0;
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '(') openCount++;
        else if (exp[i] === ')') openCount = Math.max(0, openCount - 1);
    }
    exp = exp + ')'.repeat(openCount);

    const calcFn = new Function('return ' + exp);
    const res = calcFn();
    const outStr = parseFloat(res.toPrecision(10)).toString();
    return { res, outStr };
}

console.log('tan(90):', evaluateTest('tan(90)'));
console.log('cos(90):', evaluateTest('cos(90)'));
console.log('sin(180):', evaluateTest('sin(180)'));
console.log('sin(30):', evaluateTest('sin(30)'));
console.log('tan(45):', evaluateTest('tan(45)'));
console.log('cos(60):', evaluateTest('cos(60)'));
