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
lsFolder()
    .then((e) => e.sort((a, b) => a - b))
    .then((e) => console.log("Data:", e) || e)
    .then(JSON.stringify)
    .then((e) => writeFile("data.json", e))
    .then(() => console.log("Saved!"))
    .catch((e) => console.error(e));
