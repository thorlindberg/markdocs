function markdocs (markdown) {

    var including = true
    const excludingUML = markdown.split("\n").filter( n => {
        if (n.includes("@startuml")) {
            including = false
        }
        if (n.includes("@enduml")) {
            including = true
            return false
        }
        return including
    }).join("\n")

    var including = true
    const excludingUMLTable = excludingUML.split("\n").filter( n => {
        if (n.includes("<table")) {
            including = false
        }
        if (n.includes("</table>")) {
            including = true
            return false
        }
        return including
    }).join("\n")

    const excludingUMLTableHTML = excludingUMLTable.split("\n").filter( n => {
        if (n.includes("<") && n.includes(">")) {
            return false
        }
        return true
    }).join("\n")
    
    const brackets = excludingUML.replaceAll(/```([\s\S]*?)```/g, "").match(/{([^}]+)}/g)
    if (brackets != undefined) {

        const parsed = brackets.map(obj => JSON.parse(obj))
        const bibliography = parsed.filter(obj => obj.hasOwnProperty("bib"))
        const figures = parsed.filter(obj => obj.hasOwnProperty("fig"))
        const tables = parsed.filter(obj => obj.hasOwnProperty("tbl"))
        const contents = parsed.filter(obj => obj.hasOwnProperty("chp") || obj.hasOwnProperty("sec"))
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        var chapter
        var section = 0
        var subsection = -1

        parsed.forEach(obj => {

            if (obj.hasOwnProperty("break")) {
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    "<br><div style='page-break-after:always'></div>"
                )
            }

            if (obj.hasOwnProperty("date")) {

                if (obj.date == "m-d-y") {
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `${new Date().toLocaleString('en-US', {month: 'long'})} ${new Date().getDate()}. ${new Date().getFullYear()}`
                    )
                }

                if (obj.date == "d-m-y") {
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `${new Date().getDate()}. ${new Date().toLocaleString('en-US', {month: 'long'})} ${new Date().getFullYear()}`
                    )
                }

                if (obj.date == "y-m-d") {
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
                    )
                }

            }

            if (obj.hasOwnProperty("toc")) {

                if (obj.toc == "chp-sec") {
                    const table = contents.map(obj => {
                        if (obj.hasOwnProperty("chp")) {
                            chapter = contents.filter(obj => obj.hasOwnProperty("chp")).indexOf(obj) + 1
                            section = 0
                            return `\n[${chapter}&emsp;${obj.chp}](#${obj.chp.toLowerCase().replaceAll(" ", "")})`
                        }
                        if (obj.hasOwnProperty("sec")) {
                            section += 1
                            return `${section == 1 ? "\n" : ""}&emsp;[${chapter}.${section}&emsp;${obj.sec}](#${obj.sec.toLowerCase().replaceAll(" ", "")})`
                        }
                    })
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `${table.join("\n<br>\n")}`
                    )
                }

                if (obj.toc == "chp") {
                    const table = contents.filter(obj => obj.hasOwnProperty("chp")).map(obj => {
                        chapter = contents.filter(obj => obj.hasOwnProperty("chp")).indexOf(obj) + 1
                        return `\n[${chapter}&emsp;${obj.chp}](#${obj.chp.toLowerCase().replaceAll(" ", "")})`
                    })
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `${table.join("\n\n")}`
                    )
                }

            }

            if (obj.hasOwnProperty("chp")) {
                chapter = contents.filter(obj => obj.hasOwnProperty("chp")).indexOf(obj) + 1
                section = 0
                subsection = -1
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `<span id="${obj.chp.toLowerCase().replaceAll(" ", "")}"></span>Chapter ${chapter}\n<br>\n<h1>${obj.chp}</h1>\n<br>`
                )
            }

            if (obj.hasOwnProperty("sec")) {
                section += 1
                subsection = -1
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `<span id="${obj.sec.toLowerCase().replaceAll(" ", "")}"></span>\n\n#### ${chapter}.${section}&emsp;${obj.sec}`
                )
            }

            if (obj.hasOwnProperty("sub")) {
                subsection += 1
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `*${alphabet[subsection]}.&emsp;${obj.sub}*`
                )
            }

            if (obj.hasOwnProperty("cite")) {
                const cited = bibliography.filter(bib => bib.bib == obj.cite)[0]
                const authors = cited.authors.length > 2 ? `${cited.authors[0]} et al.` : cited.authors.join(" and ")
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `[${authors} (${cited.year})](#${cited.bib})`
                )
            }

            if (obj.hasOwnProperty("citep")) {
                const cited = bibliography.filter(bib => bib.bib == obj.citep)[0]
                const authors = cited.authors.length > 2 ? `${cited.authors[0]} et al.` : cited.authors.join(" and ")
                const page = obj.hasOwnProperty("page") ? `, p. ${obj.page}` : ""
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `[(${authors}, ${cited.year}${page})](#${cited.bib})`
                )
            }

            if (obj.hasOwnProperty("ref")) {
                if (figures.map(fig => fig.fig).includes(obj.ref)) {
                    target = figures.filter(fig => fig.fig == obj.ref)[0]
                    count = figures.indexOf(target) + 1
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `[${count}](#${target.fig})`
                    )
                }
                if (tables.map(tbl => tbl.tbl).includes(obj.ref)) {
                    target = tables.filter(tbl => tbl.tbl == obj.ref)[0]
                    count = tables.indexOf(target) + 1
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `[${count}](#${target.tbl})`
                    )
                }
            }

            if (obj.hasOwnProperty("fig")) {
                const count = figures.map(fig => fig.fig).indexOf(obj.fig) + 1
                if (obj.hasOwnProperty("url")) {
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `<br>\n\n<span id="${obj.fig}"></span><img style="width:${obj.width}" src="${obj.url}"/>\n\nFigure ${count}: ${obj.caption}\n\n<br>`
                    )
                } else {
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `<br>\n\n<span id="${obj.fig}"></span>\nFigure ${count}: ${obj.caption}\n\n<br>`
                    )
                }
            }

            if (obj.hasOwnProperty("tbl")) {
                const count = tables.map(tbl => tbl.tbl).indexOf(obj.tbl) + 1
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `<br>\n\n<span id="${obj.tbl}"></span>\nTable ${count}: ${obj.caption}\n\n<br>`
                )
            }

            if (obj.hasOwnProperty("bib")) {
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `<span id="${obj.bib}"></span><p align="left">${obj.authors.join(" and ")} (${obj.year}). _${obj.title}_. ${obj.publisher}. <a href="${obj.url}">${obj.url}</a>.</p>`
                )
            }

            if (obj.hasOwnProperty("count")) {
                if (obj.count == "char") {
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        excludingUMLTableHTML.replaceAll(/```([\s\S]*?)```/g, "").length
                    )
                }
                if (obj.count == "word") {
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        excludingUMLTableHTML.replaceAll(/```([\s\S]*?)```/g, "").split(" ").length
                    )
                }
            }

        })

    }

    return markdown
    
}