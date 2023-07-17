const { kMaxLength } = require("buffer");
const child_process = require("child_process");
const fs = require("fs");
const { key } = require("localforage");

const line_feed = "\r\n"; //if you get any problems, this may be the reason.
const data_templete = {
    name: "",
    ID: "",
    previous_version: "",
    new_version: "",
    source: "",
};

const app_filters_promise = read_json_async("./app_filters.json");

console.log("executing 'winget upgrade'...");
const winget_list = child_process
    .execFileSync("winget", ["upgrade"])
    .toString()
    .split(line_feed);
const id_start =
    winget_list[0].indexOf("ID") - winget_list[0].indexOf("名前") + 2;
const all_list = winget_list.slice(2, -3).map((element) =>
    element
        .split(" ")
        .filter(filter_space)
        .reverse()
        .reduce(assemble_data, { ...data_templete })
);

let app_filters;

(async () => {
    app_filters = await app_filters_promise;
    console.log(app_filters);
    const list = all_list.filter(filter_apps);
    const required_upgrade = list.length;
    let upgrading = 0;
    for (let i = 0; i < required_upgrade; i++) {
        //
    }

    fs.writeFileSync("./list.json", JSON.stringify(list));
})();

//functions

async function read_json_async(path) {
    return JSON.parse(await fs.promises.readFile(path, { encoding: "utf-8" }));
}

function filter_space(element) {
    if (element === "") {
        return false;
    } else {
        return true;
    }
}

function assemble_data(app_data, segment, index) {
    switch (index) {
        case 0:
            app_data.source = segment;
            break;

        case 1:
            app_data.new_version = segment;
            break;

        case 2:
            app_data.previous_version = segment;
            break;

        case 3:
            app_data.ID = segment;
            break;

        default:
            app_data.name = `${segment} ${app_data.name}`.trimEnd();
    }
    return app_data;
}

function filter_apps(app_data) {
    for (let i = 0; i < app_filters.length; i++) {
        if (
            Object.keys(app_filters[i]).every(
                (key) => app_data[key] === app_filters[i][key]
            )
        ) {
            return false;
        }
    }
    return true;
}

function check_apps() {}

function has_filter() {}
