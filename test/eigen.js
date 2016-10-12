let { Matrix, Vector } = require('../build/matrix');

let m = new Matrix(4, 4, [1,0,0,0, 0,10,0,0, 0,0,2,0, 0,0,0,6]);

let gramscmhidt = [];
let values = [];

for(let kk=0; kk<4; kk++){

    let i=0;
    let prevNorm = 0;
    let rv = Vector.randomVector(4);
    let rvn = rv.mult(1/rv.norm);
    
    while(i <= 1000 && Math.abs(prevNorm - rv.norm) > 0.0000001){
        prevNorm = rv.norm;
        rv = m.dot(rvn);

        //Orthonormalize
        for(let schmidt of gramscmhidt){
            let sdr = -1 * schmidt.dot(rv);
            rv = rv.add(schmidt.mult(sdr));
        }

        console.log('RV '+i+' ', rv.val, ' Norm ', rv.norm, ' Delta ', Math.abs(prevNorm - rv.norm));

        rvn = rv.mult(1/rv.norm);
        i++;
    }

    gramscmhidt.push(rvn);
    values.push(rv.norm);
}

console.log('Values ', values);
console.log('Schmidt ', gramscmhidt);
