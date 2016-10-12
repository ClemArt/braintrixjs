let { Matrix, Vector } = require('../build/matrix');

let m = new Matrix(3, 3, [1,1,4, 0,10,6, 0,0,2]);
let rv = Vector.randomVector(3);
let rvn = rv.mult(1/rv.norm);

let gramscmhidt = [];
let values = [];

for(let kk=0; kk<3; kk++){

    let i=0;
    let prevNorm = 0;

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
