function doit(id, viewer, isLocal = false) {
    let img = document.createElement("img");
    if (isLocal) img.src = `./${id}/peticon${id}.png`;
    else
        img.src = `https://aoqi.100bt.com/h5/peticon/spine/peticon${id}~20211212.png`;
    img.alt = id;
    img.title = id;
    img.onerror = (e) => img.remove();
    img.onload = () => {
        img.onclick = () => {
            if (confirm(`View ${id}?`)) {
                if (typeof viewer === "function") window.open(viewer(id));
                else if (typeof viewer === "string") window.open(viewer);
                else window.open(`./player.html#${id}`);
            }
        };
    };
    document.body.append(img);
}
