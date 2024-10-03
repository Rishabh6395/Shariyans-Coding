// const fs = require('fs');
const http = require('http')

// fs.writeFile('hey.txt', "Hello Rishabh how are you!", function(err){
//     if(err) console.log(err)
//     else console.log("done")
// })
// fs.appendFile('hey.txt', "Tell me about yourself", function(err){
//     if(err) console.log(err)
//     else console.log("done")
// })

// fs.rename("hey.txt", "hello.txt", function(err){
//     if(err) console.log(err)
//     else console.log("done")
// })

// fs.copyFile("hello.txt", "./copy/lol.txt", function(err){
//     if(err) console.log(err)
//     else console.log("done!")
// })

// fs.unlink("temp.txt", function(err){
//     if(err) console.log(err)
//     else console.log("removed")
// })

// fs.rmdir("./copy",{recursive: true}, function(err){
//     if(err) console.log(err)
//     else console.log("removed")
// })


// HTTP ---->


const server = http.createServer(function(req,res){
    res.end('Hello world')
})

server.listen(3000)