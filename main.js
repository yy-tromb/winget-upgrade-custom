const child_process=require("child_process")

const list_buf=child_process.execFileSync("winget",["upgrade"]);
const list=list_buf.toString();

//
console.log(list);
