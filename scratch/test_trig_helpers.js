function trigSin(x, mode) {
    if (mode === 'D') {
        const norm = ((x % 360) + 360) % 360;
        if (norm === 0 || norm === 180) return 0;
        if (norm === 90) return 1;
        if (norm === 270) return -1;
        if (norm === 30 || norm === 150) return 0.5;
        if (norm === 210 || norm === 330) return -0.5;
        return Math.sin(norm * (Math.PI / 180));
    } else if (mode === 'G') {
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

function trigCos(x, mode) {
    if (mode === 'D') {
        const norm = ((x % 360) + 360) % 360;
        if (norm === 90 || norm === 270) return 0;
        if (norm === 0) return 1;
        if (norm === 180) return -1;
        if (norm === 60 || norm === 300) return 0.5;
        if (norm === 120 || norm === 240) return -0.5;
        return Math.cos(norm * (Math.PI / 180));
    } else if (mode === 'G') {
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

function trigTan(x, mode) {
    if (mode === 'D') {
        const norm = ((x % 180) + 180) % 180;
        if (Math.abs(norm - 90) < 1e-12) return NaN;
        if (norm === 0) return 0;
        if (norm === 45) return 1;
        if (norm === 135) return -1;
        return Math.tan(x * (Math.PI / 180));
    } else if (mode === 'G') {
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

console.log('tan(90, D):', trigTan(90, 'D'));
console.log('tan(270, D):', trigTan(270, 'D'));
console.log('tan(-90, D):', trigTan(-90, 'D'));
console.log('tan(0, D):', trigTan(0, 'D'));
console.log('tan(45, D):', trigTan(45, 'D'));
console.log('cos(90, D):', trigCos(90, 'D'));
console.log('cos(0, D):', trigCos(0, 'D'));
console.log('sin(180, D):', trigSin(180, 'D'));
console.log('sin(30, D):', trigSin(30, 'D'));
console.log('cos(60, D):', trigCos(60, 'D'));
console.log('tan(pi/2, R):', trigTan(Math.PI / 2, 'R'));
console.log('cos(pi/2, R):', trigCos(Math.PI / 2, 'R'));
