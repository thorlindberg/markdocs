function markdocs (markdown) {

    const brackets = markdown.replaceAll(/```([\s\S]*?)```/g, "").match(/{([^}]+)}/g)
    if (brackets != undefined) {

        const parsed = brackets.map(obj => JSON.parse(obj))
        const bibliography = parsed.filter(obj => obj.hasOwnProperty("bib"))
        const figures = parsed.filter(obj => obj.hasOwnProperty("fig"))
        const contents = parsed.filter(obj => obj.hasOwnProperty("sec") || obj.hasOwnProperty("sub"))
        var section;
        var subsection = 0

        parsed.forEach(obj => {
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
                if (obj.toc == "sec-sub") {
                    const table = contents.map(obj => {
                        if (obj.hasOwnProperty("sec")) {
                            section = contents.filter(obj => obj.hasOwnProperty("sec")).indexOf(obj) + 1
                            subsection = 0
                            return `\n[${section}&emsp;${obj.sec}](#${obj.sec.toLowerCase().replaceAll(" ", "")})`
                        }
                        if (obj.hasOwnProperty("sub")) {
                            subsection += 1
                            return `${subsection == 1 ? "\n" : ""}&emsp;[${section}.${subsection}&emsp;${obj.sub}](#${obj.sub.toLowerCase().replaceAll(" ", "")})`
                        }
                    })
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `${table.join("\n<br>\n")}`
                    )
                }
                if (obj.toc == "sec") {
                    const table = contents.filter(obj => obj.hasOwnProperty("sec")).map(obj => {
                        section = contents.filter(obj => obj.hasOwnProperty("sec")).indexOf(obj) + 1
                        return `\n[${section}&emsp;${obj.sec}](#${obj.sec.toLowerCase().replaceAll(" ", "")})`
                    })
                    markdown = markdown.replace(
                        JSON.stringify(obj),
                        `${table.join("\n\n")}`
                    )
                }
            }
            if (obj.hasOwnProperty("sec")) {
                section = contents.filter(obj => obj.hasOwnProperty("sec")).indexOf(obj) + 1
                subsection = 0
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `<span id="${obj.sec.toLowerCase().replaceAll(" ", "")}"></span><br>${section}&emsp;${obj.sec}\n---`
                )
            }
            if (obj.hasOwnProperty("sub")) {
                subsection += 1
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `<span id="${obj.sub.toLowerCase().replaceAll(" ", "")}"></span><br>#### ${section}.${subsection}&emsp;${obj.sub}`
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
                const figure = figures.filter(fig => fig.fig == obj.ref)[0]
                const section = figures.indexOf(figure) + 1
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `[figure ${section}](#${figure.fig})`
                )
            }
            if (obj.hasOwnProperty("bib")) {
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `<span id="${obj.bib}"></span>${obj.authors.join(" and ")} (${obj.year}). _${obj.title}_. ${obj.publisher}. [${obj.url}](${obj.url}).`
                )
            }
            if (obj.hasOwnProperty("fig")) {
                const section = figures.map(fig => fig.fig).indexOf(obj.fig) + 1
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    `<br>\n\n<span id="${obj.fig}"></span><img style="width:${obj.width}" src="${obj.url}"/>\n\nFigure ${section}: ${obj.caption}\n\n<br>`
                )
            }
            if (obj.hasOwnProperty("break")) {
                markdown = markdown.replace(
                    JSON.stringify(obj),
                    "<br><div style='page-break-after:always'></div>"
                )
            }
        })

    }

    return markdown
    
}