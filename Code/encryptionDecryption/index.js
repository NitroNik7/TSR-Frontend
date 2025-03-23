// let plainText = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio iste sed unde. Voluptas, sint quod hic ipsa explicabo eum odit? Eos similique praesentium ex fugiat.";
let plainText = `Date,Open,High,Low,Close,Volume,
22-Mar-19,168.6,178.7,165.0,166.1,32744,
25-Mar-19,168.9,168.9,158.8,160.65,43245,
26-Mar-19,160.0,169.8,154.35,165.4,157992,
27-Mar-19,165.45,172.0,160.95,170.1,108166,
28-Mar-19,170.65,171.7,166.35,168.9,44179,
29-Mar-19,168.9,174.0,168.5,169.85,145327,
01-Apr-19,169.9,173.25,169.85,171.1,60072,
02-Apr-19,172.75,172.75,164.3,169.0,239933,
03-Apr-19,170.0,172.9,166.15,168.4,48683,
04-Apr-19,170.4,170.9,166.3,168.25,108216,
05-Apr-19,168.45,172.4,166.5,169.95,59130,
08-Apr-19,171.55,176.0,169.8,174.9,111421,
09-Apr-19,172.95,174.85,170.85,172.5,26224,
10-Apr-19,171.0,184.85,169.0,183.4,269355,
11-Apr-19,183.05,195.4,182.55,189.95,528836,
12-Apr-19,189.5,191.2,182.75,183.8,57137,
15-Apr-19,182.05,185.45,182.0,182.95,21814,`;
let key = [4,5,5];
let blockSize = 5;

let cipherText = encrypt(plainText, key, blockSize);
console.log("Encrypted text: " + cipherText);

plainText = decrypt(cipherText, key, blockSize);
console.log("Decrypted text: " + plainText);



function encrypt(plainText, key, blockSize) {

    let cipherText = "";
    let j = 0; // represents index of the key to be used from key[]
    let asciiCode = 0;

    for (let i = 0; i < plainText.length; i++) {
        j = Math.trunc(i / blockSize) % key.length;

        asciiCode = Number(plainText    .charCodeAt(i) + key[j]) ;
        cipherText+=String.fromCharCode(asciiCode);
    }
    return cipherText;
}

function decrypt(cipherText, key, blockSize) {

    let plainText = "";
    let j = 0; // represents index of the key to be used from key[]
    let asciiCode = 0;

    for (let i = 0; i < cipherText.length; i++) {
        j = Math.trunc(i / blockSize) % key.length;

        asciiCode = Number(cipherText.charCodeAt(i) - key[j]) ;
        plainText+=String.fromCharCode(asciiCode);
    }
    return plainText;
}