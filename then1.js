const promise1 = new Promise((resolve,reject)=> {
    resolve("success");
    reject("failure");
});
promise1
  .then((result)=> { console.log("promise result:", result); })
  .catch((error)=> { console.log("promise error:", error) });