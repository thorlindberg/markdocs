function render() {

    // body
    document.body.style.backgroundColor = "rgb(250, 250, 250)"

    // container
    var container = document.createElement("div")
    container.classList.add("container")

    // hstack
    var hstack = document.createElement("div")
    hstack.classList.add("gap-3")
    hstack.style.display = "flex"
    hstack.style.flexDirection = "column"
    hstack.style.justifyContent = "center"
    hstack.style.position = "sticky"
    hstack.style.top = 0
    hstack.style.height = "calc(100vh - 70px)"
    hstack.style.marginLeft = "70px"
    hstack.style.marginRight = "70px"

    // title
    var title = document.createElement("h1")
    title.classList.add("display-5")
    title.innerHTML = "<b>Markdocs</b> 0.1"
    hstack.append(title)

    // row
    var row = document.createElement("div")
    row.classList.add("d-flex")
    row.classList.add("gap-5")

    // documentation
    var docs = document.createElement("div")
    docs.classList.add("vstack")
    docs.classList.add("gap-3")
    docs.style.width = "100%"

    var docslabel = document.createElement("label")
    docslabel.classList.add("form-label")
    docslabel.innerHTML = "Documentation of available commands"
    docs.append(docslabel)

    var docsbreakgroup = document.createElement("div")
    docsbreakgroup.classList.add("list-group")
    var docsbreakitem = document.createElement("div")
    docsbreakitem.classList.add("list-group-item")
    var docsbreakcode = document.createElement("code")
    docsbreakcode.innerHTML = '{"break":true}'
    docsbreakitem.append(docsbreakcode)
    docsbreakgroup.append(docsbreakitem)
    docs.append(docsbreakgroup)

    var docsdategroup = document.createElement("div")
    docsdategroup.classList.add("list-group")
    var docsdateitem = document.createElement("div")
    docsdateitem.classList.add("list-group-item")
    var docsdatecode = document.createElement("code")
    docsdatecode.innerHTML = '{"date":"m-d-y"} {"date":"d-m-y"} {"date":"y-m-d"}'
    docsdateitem.append(docsdatecode)
    docsdategroup.append(docsdateitem)
    docs.append(docsdategroup)

    var docstocgroup = document.createElement("div")
    docstocgroup.classList.add("list-group")
    var docstocitem = document.createElement("div")
    docstocitem.classList.add("list-group-item")
    var docstoccode = document.createElement("code")
    docstoccode.innerHTML = '{"toc":"cph-sec"} {"toc":"cph"}'
    docstocitem.append(docstoccode)
    docstocgroup.append(docstocitem)

    var docscphitem = document.createElement("div")
    docscphitem.classList.add("list-group-item")
    var docscphcode = document.createElement("code")
    docscphcode.innerHTML = '{"cph":"Chapter 1 Introduction"}'
    docscphitem.append(docscphcode)
    docstocgroup.append(docscphitem)

    var docssecitem = document.createElement("div")
    docssecitem.classList.add("list-group-item")
    var docsseccode = document.createElement("code")
    docsseccode.innerHTML = '{"sec":"1.1 Motivation"}'
    docssecitem.append(docsseccode)
    docstocgroup.append(docssecitem)

    var docssubitem = document.createElement("div")
    docssubitem.classList.add("list-group-item")
    var docssubcode = document.createElement("code")
    docssubcode.innerHTML = '{"sub":"a. Reasoning"}'
    docssubitem.append(docssubcode)
    docstocgroup.append(docssubitem)

    docs.append(docstocgroup)

    var docscitegroup = document.createElement("div")
    docscitegroup.classList.add("list-group")

    var docsciteitem = document.createElement("div")
    docsciteitem.classList.add("list-group-item")
    var docscitecode = document.createElement("code")
    docscitecode.innerHTML = '{"cite":"kshemkalyani"}'
    docsciteitem.append(docscitecode)
    docscitegroup.append(docsciteitem)

    var docscitepitem = document.createElement("div")
    docscitepitem.classList.add("list-group-item")
    var docscitepcode = document.createElement("code")
    docscitepcode.innerHTML = '{"citep":"kshemkalyani"}'
    docscitepitem.append(docscitepcode)
    docscitegroup.append(docscitepitem)

    var docsciteppitem = document.createElement("div")
    docsciteppitem.classList.add("list-group-item")
    var docsciteppcode = document.createElement("code")
    docsciteppcode.innerHTML = '{"citep":"kshemkalyani","page":"246"}'
    docsciteppitem.append(docsciteppcode)
    docscitegroup.append(docsciteppitem)

    docs.append(docscitegroup)

    var docsrefgroup = document.createElement("div")
    docsrefgroup.classList.add("list-group")
    var docsrefitem = document.createElement("div")
    docsrefitem.classList.add("list-group-item")
    var docsrefcode = document.createElement("code")
    docsrefcode.innerHTML = '{"ref":"grid"}'
    docsrefitem.append(docsrefcode)
    docsrefgroup.append(docsrefitem)

    var docsfigitem = document.createElement("div")
    docsfigitem.classList.add("list-group-item")
    var docsfigcode = document.createElement("code")
    docsfigcode.innerHTML = '{"fig":"grid","url":"grid.png","caption":"A grid system.","width":"80%"}'
    docsfigitem.append(docsfigcode)
    docsrefgroup.append(docsfigitem)

    docs.append(docsrefgroup)

    var docsbibgroup = document.createElement("div")
    docsbibgroup.classList.add("list-group")
    var docsbibitem = document.createElement("div")
    docsbibitem.classList.add("list-group-item")
    var docsbibcode = document.createElement("code")
    docsbibcode.innerHTML = '{"bib":"kshemkalyani","title":"Distributed Computing","authors":["Kshemkalyani, A.","Singhal, M."],"year":"2011","publisher":"Cambridge University Press","url":"https://books.google.dk/books?id=G7SZ32dPuLgC"}'
    docsbibitem.append(docsbibcode)
    docsbibgroup.append(docsbibitem)

    docs.append(docsbibgroup)

    row.append(docs)

    // interface
    var interface = document.createElement("div")
    interface.classList.add("vstack")
    interface.classList.add("gap-3")
    interface.style.width = "100%"

    var inputs = document.createElement("div")
    inputs.classList.add("vstack")
    inputs.classList.add("gap-3")

    var uploadlabel = document.createElement("label")
    uploadlabel.classList.add("form-label")
    uploadlabel.innerHTML = "Upload markdown (.md) files"
    inputs.append(uploadlabel)

    var readers = document.createElement("div")
    readers.classList.add("hstack")
    readers.classList.add("gap-3")

    var upload = document.createElement("input")
    upload.classList.add("form-control")
    upload.setAttribute("onchange", "read(this)")
    upload.type = "file"
    upload.multiple = true
    readers.append(upload)

    var sample = document.createElement("button")
    sample.id = "sample"
    sample.type = "button"
    sample.style.whiteSpace = "nowrap"
    sample.classList.add("btn")
    sample.classList.add("btn-primary")
    sample.setAttribute("onclick", "readSample()")
    sample.innerHTML = "Try sample"
    readers.append(sample)

    inputs.append(readers)

    var filegroup = document.createElement("div")
    filegroup.id = "files"
    filegroup.classList.add("list-group");

    ["title", "introduction", "relatedwork", "experimentsetup", "results", "discussion", "conclusion"].forEach(filename => {

        var fileitem = document.createElement("div")
        fileitem.classList.add("list-group-item")

        var fileflex = document.createElement("div")
        fileflex.classList.add("d-flex")
        fileflex.classList.add("justify-content-between")

        var left = document.createElement("div")
        left.innerHTML = filename

        var right = document.createElement("div")
        right.style.color = "rgb(180, 180, 180)"
        right.innerHTML = ".md"
        
        fileflex.append(left)
        fileflex.append(right)
        fileitem.append(fileflex)
        filegroup.append(fileitem)
        inputs.append(filegroup)

    })

    interface.append(inputs)

    var outputs = document.createElement("div")
    outputs.classList.add("hstack")
    outputs.classList.add("gap-3")
    outputs.classList.add("justify-content-between")

    var convert = document.createElement("button")
    convert.id = "convert"
    convert.type = "button"
    convert.classList.add("btn")
    convert.classList.add("btn-secondary")
    convert.classList.add("disabled")
    convert.setAttribute("onclick", "convert()")
    convert.style.width = "100%"
    convert.style.textAlign = "left"
    convert.innerHTML = "Convert references"
    outputs.append(convert)

    var download = document.createElement("button")
    download.id = "download"
    download.type = "button"
    download.classList.add("btn")
    download.classList.add("btn-secondary")
    download.classList.add("disabled")
    download.setAttribute("onclick", "download()")
    download.innerHTML = "Download"
    outputs.append(download)

    interface.append(outputs)

    row.append(interface)

    hstack.append(row)

    container.append(hstack)

    // preview
    var preview = document.createElement("div")
    preview.style.backgroundColor = "rgb(255, 255, 255)"
    preview.style.padding = "70px"
    preview.style.boxShadow = "0 0 70px rgba(0, 0, 0, 0.1)"
    preview.style.position = "sticky"
    preview.style.top = 0
    preview.style.marginBottom = "70px"
    preview.style.transform = "translate(0, 140px)"
    preview.style.transition = "transform 0.5s"
    preview.id = "content"
    container.append(preview)

    document.body.append(container)

}

render()

function readFile(file) {
    return new Promise((resolve, reject) => {
        let fr = new FileReader()
        fr.onload = () => resolve(fr.result)
        fr.readAsText(file)
    })
}

async function read(input) {
    window.input = await Promise.all(Array.from(input.files).map(async (file) => {
        return await readFile(file)
    }))
    document.getElementById('sample').classList.remove('disabled')
    document.getElementById('sample').classList.remove('btn-secondary')
    document.getElementById('sample').classList.add('btn-primary')
    document.getElementById('convert').classList.remove('disabled')
    document.getElementById('convert').classList.remove('btn-secondary')
    document.getElementById('convert').classList.add('btn-primary')
    window.input = window.input.join('\n\n')
}

function convert() {

    window.output = markdocs(window.input)

    document.getElementById('convert').classList.remove('btn-primary')
    document.getElementById('convert').classList.add('btn-secondary')
    document.getElementById('convert').classList.add('disabled')

    document.body.style.overflow = 'scroll'
    document.getElementById('content').style.transform = "translate(0, 0)"
    document.getElementById('content').innerHTML = marked.parse(window.output)
    
    document.getElementById('download').classList.remove('btn-secondary')
    document.getElementById('download').classList.remove('disabled')
    document.getElementById('download').classList.add('btn-success')

}

function download() {
    var link = document.createElement('a');
    link.download = 'output.md';
    var blob = new Blob([window.output], {type: 'markdown/plain'});
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

function readSample() {
    var rawFile = new XMLHttpRequest()
    rawFile.open("GET", 'sample.md', false)
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText
                window.input = allText
            }
        }
    }
    rawFile.send(null)
    document.getElementById('files').innerHTML = "";
    ["title", "introduction", "relatedwork", "experimentsetup", "results", "discussion", "conclusion"].forEach(filename => {
        var fileitem = document.createElement("div")
        fileitem.classList.add("list-group-item")
        var fileflex = document.createElement("div")
        fileflex.classList.add("d-flex")
        fileflex.classList.add("justify-content-between")
        var left = document.createElement("div")
        left.innerHTML = filename
        var right = document.createElement("div")
        right.style.color = "rgb(180, 180, 180)"
        right.innerHTML = ".md"
        fileflex.append(left)
        fileflex.append(right)
        fileitem.append(fileflex)
        document.getElementById('files').append(fileitem)
    })
    document.getElementById('sample').classList.remove('btn-primary')
    document.getElementById('sample').classList.add('btn-secondary')
    document.getElementById('sample').classList.add('disabled')
    document.getElementById('convert').classList.remove('btn-secondary')
    document.getElementById('convert').classList.remove('disabled')
    document.getElementById('convert').classList.add('btn-primary')
    convert()
}