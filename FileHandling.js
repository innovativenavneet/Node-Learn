const { error } = require('console');
const fs = require('fs');


// WRITE OPERATION ::: 

// 1. SYNCHRONOUS
 fs.writeFileSync('./write_File.txt', "hello i have written the first file");

//  2. ASNCHRONOUS 
 fs.writeFile('./write_AsynchronousFile.txt', "i have written file in aynchronous way", (error)=>{});


//  READ OPERATIONS
//    1. SYNCHRONOUS
 const result=fs.readFileSync("./contacts.txt","utf-8");
 console.log(result);

    //   2.ASNCHRONOUS

    fs.readFile("./contacts.txt","utf-8",(err,result)=>{
        if(err){
            console.log("ERROR : ",err)
        }
        
            if(result){
                console.log("RESULT : ",result);
            }
    });
    // Aysnchronous always expect a callback function to return


    //  APPEND OPERATIONS
    //    1. SYNCHRONOUS
      fs.appendFileSync("./fileAppend.txt",`hey today's date is :: ${Date.now()}\n`)
     
     fs.cpSync("./write_File.txt","./write_AsynchronousFile.txt");

    //  fs.unlinkSync("./fileAppend.txt");
