type PrintOptions = {
  styles?: string[]
  callback?: () => void
}

export const usePrintElement = () => {
  function addStyles(win: any, styles: string[]) {
    styles.forEach((style) => {
      let link = win.document.createElement("link")
      link.setAttribute("rel", "stylesheet")
      link.setAttribute("type", "text/css")
      link.setAttribute("href", style)
      win.document.getElementsByTagName("head")[0].appendChild(link)
    })
  }

  const printElement = (el: any, options = {} as PrintOptions) => {
    let defaultStyles: string[] = []
    let { styles = defaultStyles, callback } = options

    const _el = unref(el)
    const element = _el?.$el || _el

    if (!element) {
      alert(`Element to print #${el} not found!`)
      return
    }

    var ifprint = document.createElement("iframe")
    document.body.appendChild(ifprint)
    ifprint.setAttribute("style", "height:0;width:0;display:flex;")

    const win = ifprint.contentWindow

    if (!win) {
      alert(`window not found!`)
      return
    }

    win.document.write(`
          <html>
            <head>
              <title>${window.document.title}</title>
            </head>
            <body>
              ${element.innerHTML}
            </body>
          </html>
        `)

    addStyles(win, styles)

    setTimeout(() => {
      win.document.close()
      win.focus()
      win.print()
      win.close()
      document.body.removeChild(ifprint)
      callback?.()
    }, 1)

    return true
  }

  return {
    printElement,
  }
}
