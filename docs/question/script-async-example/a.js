const sleep = time => {
    let t = new Date();
    while (new Date() - t < time) { }
}
console.log(1);
sleep(500);
console.log(2)