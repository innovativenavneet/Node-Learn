const fs = require("fs");

console.log(4 + 5);

// Blocking operations
const result = fs.readFileSync("./contacts.txt", "utf-8");
console.log(result);

// Non-blocking operations
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});

console.log(8);
console.log(4);
console.log(1);
console.log(6);
console.log(2);
console.log(6);


// seee the non-blocking request doesn't block in any request
