const { opendir, writeFile } = require("fs/promises");

async function lsFolder(path = "./", showHide = false) {
    const folders = [];
    try {
        const dir = await opendir(path);
        for await (const dirent of dir) {
            if (!showHide && dirent.name.startsWith(".")) continue;

            if (dirent.isDirectory()) {
                folders.push(dirent.name);
            }
        }
    } catch (err) {
        console.error(err);
    }
    return folders;
}

//

//

//

(async function () {
    const folders = await lsFolder().then((e) => e.sort((a, b) => a - b));
    const ids = folders.filter((name) => !Number.isNaN(Number(name)));
    console.log(ids);
    await writeFile("data.json", JSON.stringify(ids))
        .then(() => console.log("Saved!"))
        .catch(() => console.error("Fail!"));
})();
