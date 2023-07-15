const child_process=require("child_process")

const line_feed="\r\n"; //if you get any problems, this may be the reason.
const data_templete = {
    name: "",
    ID: "",
    previous_version: "",
    new_version: "",
    source: "",
};

console.log("executing 'winget upgrade'...");
const winget_list=child_process.execFileSync("winget",["upgrade"]).toString().split(line_feed);
const id_start = winget_list[0].indexOf("ID") - winget_list[0].indexOf("名前")+4;
const list = winget_list
    .slice(2, -3)
    .map((element) =>
        element.split(" ").filter(filter_space).reduce(assemble_data, data_templete)
    );


console.log(id_start);
require("fs").writeFileSync("./list.json", JSON.stringify(list));

function filter_space(element){
    if(element===""){
        return false;
    }else{
        return true;
    }
}


function assemble_data(data,segment,index){
    console.log(segment,segment.length,index);
}
