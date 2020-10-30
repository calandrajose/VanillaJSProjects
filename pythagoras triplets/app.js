const p = [3,5,11,5,13];

//Q for each P
const q = p.map((number) => (Math.pow(parseInt(number), 2) - 1) / 2);

//R for each P
const r = p.map((number) => (Math.pow(parseInt(number), 2) + 1) / 2);

//Every q and p present in the original array
const existingQ = p.filter(numEl => q.includes(numEl));
const existingP = p.filter(numEl => r.includes(numEl));

//if length > 0 means that there is a triplet in the original array 
if (existingQ.length > 0 && existingP.length>0) {
  console.log(true);
}else{
    console.log(false);
}

 