const util = require("util");
const child_process = require("child_process");
const fs = require("fs");
const cp_execFile = util.promisify(child_process.execFile);

const line_feed = "\r\n"; //if you get any problems, this may be the reason.
const upgrading_max = 3;

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
    const list = all_list.filter(filter_apps);
    const required_upgrade = list.length;
    const upgrading_promises = Array.from({ length: upgrading_max }, () =>
        Promise.resolve()
    );
    const upgrading_apps = Array.from({ length: upgrading_max }, () => []);
    for (let i = 0; i < required_upgrade; i++) {
        const queue = i % upgrading_max;
        upgrading_promises[queue] = upgrading_promises[queue].then(() => {
            console.info(`upgrading ${list[i].name}...`);
            return cp_execFile("winget", ["upgrade", "--id", list[i].ID]);
        });
        upgrading_apps[queue].push(list[i]);
    }
    upgrading_promises.map((app) =>
        app.catch((error) => {
            throw error;
        })
    );
    console.info(upgrading_apps);
    console.info("start upgrading...");
    await Promise.allSettled(upgrading_promises);
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
