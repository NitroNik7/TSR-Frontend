const fs = require('fs');

let filePath = './data.txt';
let fileEncoding = 'utf-8';

async function cleanFile(filePath, fileEncoding) {
    fs.readFile(filePath, fileEncoding, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
        } else {
            data = data.trim();
            fs.writeFile(filePath, data, () => {
                // console.log(arguments);
            });
        }
    });
}

function modifyFile() {
    return new Promise()
};

package.then(cleanFile);