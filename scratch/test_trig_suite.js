function testEvaluation(expStr, angleMode = 'D') {
    let exp = expStr;
    const factLib = `
      function fact(n) {
        if (n < 0 || Math.floor(n) !== n) return NaN;
        if (n === 0 || n === 1) return 1;
        let r = 1; for (let i = 2; i <= n; i++) r *= i;
        return r;
      }
      function nPr(n, r) {
        if (n < 0 || r < 0 || r > n) return NaN;
        return fact(n) / fact(n - r);
      }
      function nCr(n, r) {
        if (n < 0 || r < 0 || r > n) return NaN;
        return fact(n) / (fact(r) * fact(n - r));
      }
      function RanInt(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
      }
      function trigSin(x) {
        if ('${angleMode}' === 'D') {
          const norm = ((x % 360) + 360) % 360;
          if (norm === 0 || norm === 180) return 0;
          if (norm === 90) return 1;
          if (norm === 270) return -1;
          if (norm === 30 || norm === 150) return 0.5;
          if (norm === 210 || norm === 330) return -0.5;
          return Math.sin(norm * (Math.PI / 180));
        } else if ('${angleMode}' === 'G') {
          const norm = ((x % 400) + 400) % 400;
          if (norm === 0 || norm === 200) return 0;
          if (norm === 100) return 1;
          if (norm === 300) return -1;
          return Math.sin(norm * (Math.PI / 200));
        } else {
          const kPi = x / Math.PI;
          if (Math.abs(kPi - Math.round(kPi)) < 1e-12) return 0;
          return Math.sin(x);
        }
      }
      function trigCos(x) {
        if ('${angleMode}' === 'D') {
          const norm = ((x % 360) + 360) % 360;
          if (norm === 90 || norm === 270) return 0;
          if (norm === 0) return 1;
          if (norm === 180) return -1;
          if (norm === 60 || norm === 300) return 0.5;
          if (norm === 120 || norm === 240) return -0.5;
          return Math.cos(norm * (Math.PI / 180));
        } else if ('${angleMode}' === 'G') {
          const norm = ((x % 400) + 400) % 400;
          if (norm === 100 || norm === 300) return 0;
          if (norm === 0) return 1;
          if (norm === 200) return -1;
          return Math.cos(norm * (Math.PI / 200));
        } else {
          const k = x / Math.PI - 0.5;
          if (Math.abs(k - Math.round(k)) < 1e-12) return 0;
          return Math.cos(x);
        }
      }
      function trigTan(x) {
        if ('${angleMode}' === 'D') {
          const norm = ((x % 180) + 180) % 180;
          if (Math.abs(norm - 90) < 1e-12) return NaN;
          if (norm === 0) return 0;
          if (norm === 45) return 1;
          if (norm === 135) return -1;
          return Math.tan(x * (Math.PI / 180));
        } else if ('${angleMode}' === 'G') {
          const norm = ((x % 200) + 200) % 200;
          if (Math.abs(norm - 100) < 1e-12) return NaN;
          if (norm === 0) return 0;
          return Math.tan(x * (Math.PI / 200));
        } else {
          const k = x / Math.PI - 0.5;
          if (Math.abs(k - Math.round(k)) < 1e-12) return NaN;
          const kPi = x / Math.PI;
          if (Math.abs(kPi - Math.round(kPi)) < 1e-12) return 0;
          return Math.tan(x);
        }
      }
      function trigAsin(x) {
        if (x < -1 || x > 1) return NaN;
        const res = Math.asin(x);
        if ('${angleMode}' === 'D') return res * (180 / Math.PI);
        if ('${angleMode}' === 'G') return res * (200 / Math.PI);
        return res;
      }
      function trigAcos(x) {
        if (x < -1 || x > 1) return NaN;
        const res = Math.acos(x);
        if ('${angleMode}' === 'D') return res * (180 / Math.PI);
        if ('${angleMode}' === 'G') return res * (200 / Math.PI);
        return res;
      }
      function trigAtan(x) {
        const res = Math.atan(x);
        if ('${angleMode}' === 'D') return res * (180 / Math.PI);
        if ('${angleMode}' === 'G') return res * (200 / Math.PI);
        return res;
      }
    `;

    exp = exp
      .replace(/(?:sin⁻¹|sin\^-1|sin\*\*-1|asin)\(/g, 'TR_ASIN(')
      .replace(/(?:cos⁻¹|cos\^-1|cos\*\*-1|acos)\(/g, 'TR_ACOS(')
      .replace(/(?:tan⁻¹|tan\^-1|tan\*\*-1|atan)\(/g, 'TR_ATAN(');

    exp = exp
      .replace(/sin\(/g, 'trigSin(')
      .replace(/cos\(/g, 'trigCos(')
      .replace(/tan\(/g, 'trigTan(')
      .replace(/TR_ASIN\(/g, 'trigAsin(')
      .replace(/TR_ACOS\(/g, 'trigAcos(')
      .replace(/TR_ATAN\(/g, 'trigAtan(');

    // auto close brackets
    let openCount = 0;
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '(') openCount++;
        else if (exp[i] === ')') openCount = Math.max(0, openCount - 1);
    }
    exp = exp + ')'.repeat(openCount);

    const calcFn = new Function(factLib + 'return ' + exp);
    const res = calcFn();
    if (isNaN(res) || !isFinite(res)) return 'Math ERROR';
    return parseFloat(res.toPrecision(10)).toString();
}

console.log('tan(90) [D]:', testEvaluation('tan(90)', 'D'));
console.log('tan(270) [D]:', testEvaluation('tan(270)', 'D'));
console.log('tan(-90) [D]:', testEvaluation('tan(-90)', 'D'));
console.log('tan(0) [D]:', testEvaluation('tan(0)', 'D'));
console.log('tan(45) [D]:', testEvaluation('tan(45)', 'D'));
console.log('cos(90) [D]:', testEvaluation('cos(90)', 'D'));
console.log('sin(180) [D]:', testEvaluation('sin(180)', 'D'));
console.log('sin(30) [D]:', testEvaluation('sin(30)', 'D'));
console.log('cos(60) [D]:', testEvaluation('cos(60)', 'D'));
console.log('tan⁻¹(1) [D]:', testEvaluation('tan⁻¹(1)', 'D'));
console.log('sin⁻¹(2) [D]:', testEvaluation('sin⁻¹(2)', 'D'));
console.log('tan(Math.PI / 2) [R]:', testEvaluation('tan(Math.PI / 2)', 'R'));
console.log('tan(100) [G]:', testEvaluation('tan(100)', 'G'));
