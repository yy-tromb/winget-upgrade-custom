const child_process=require("child_process")

const line_feed="\r\n"; //if you get any problems, this may be the reason.
const data_templete = {
    name: "",
    ID: "",
    previous_version: "",
    new_version: "",
    source: "",
};
const app_filter=JSON.parse(fs.readFileSync("./app_filter.json").toString());

console.log("executing 'winget upgrade'...");
const winget_list=child_process.execFileSync("winget",["upgrade"]).toString().split(line_feed);
const id_start = winget_list[0].indexOf("ID") - winget_list[0].indexOf("名前")+2;
const all_list = winget_list
    .slice(2, -3)
    .map((element) =>
        element
            .split(" ")
            .filter(filter_space)
            .reverse()
            .reduce(assemble_data, { ...data_templete })
    );

const list=all_list.filter(filter_specified);
const required_upgrade=list.length;
let upgrading=0;
for(let i=0;i<required_upgrade;i++){
    //
}

require("fs").writeFileSync("./list.json", JSON.stringify(list));

function filter_space(element){
    if(element===""){
        return false;
    }else{
        return true;
    }
}

function assemble_data(data,segment,index){
    //console.log(data,segment,index);
    switch(index){
        case 0:
            data.source=segment;
            break;

        case 1:
            data.new_version=segment;
            break;

        case 2:
            data.previous_version=segment;
            break;

        case 3:
            data.ID=segment;
            break;

        default:
            data.name = `${segment} ${data.name}`.trimEnd();
    }
    return data;
}

function filter_specified(app_data){
    //
}