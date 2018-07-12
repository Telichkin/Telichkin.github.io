const c = (createRender) => {
  let render, component

  const init = () => {
    render = createRender(update)
    component = render()
  }

  const update = () => {
    component = component.updateByElement(render())
  }

  init()
  return component
}

const e = (type, options = {}, ...children) => {
  let self = {}, htmlNode
  
  const init = () => {
    htmlNode = document.createElement(type)
    options = SDict(options)
    children = SList(children)

    applyOptions(options, { toHtmlNode: htmlNode })
    applyStyles(options.withKey('style'), { toHtmlNode: htmlNode })
  }

  self.appendToNode = (aHtmlNode) => {
    aHtmlNode.appendChild(htmlNode)
    children.do(child => child.appendToNode(htmlNode))
    return self
  }

  self.mountInsteadOfNode = (aHtmlNode) => {
    aHtmlNode.parentNode.replaceChild(htmlNode, aHtmlNode)
    children.do(child => child.appendToNode(htmlNode))
    return self
  }

  self.updateByElement = (anElement) => {
    anElement.mergeIntoElement(self)
    return self
  }

  self.mergeIntoElement = (anElement) => {
    anElement.updateOptions(options, { andChildren: children })
  }

  self.updateOptions = (newOptions, { andChildren }) => {
    applyOptions(newOptions, { toHtmlNode: htmlNode })
    applyStyles(newOptions.withKey('style'), { toHtmlNode: htmlNode })
    unmountChildrenFromNode(htmlNode)
    andChildren.do(child => child.appendToNode(htmlNode))
    
    options = newOptions
    children = andChildren
  }

  const applyOptions = (someOptions, { toHtmlNode }) => {
    options.do(name => { toHtmlNode.removeAttribute(name) })
    someOptions.copyToObject(toHtmlNode)
    options = someOptions
  }

  const applyStyles = (someStyles, { toHtmlNode }) => {
    someStyles = SDict(someStyles)
    someStyles.do((name, style) => {
      if (!name in toHtmlNode.style) return
      toHtmlNode.style[name] = style
    })
  }

  const unmountChildrenFromNode = (aHtmlNode) => {
    while (aHtmlNode.firstChild) {
      aHtmlNode.removeChild(aHtmlNode.firstChild)
    }
  }

  init()
  return self
}
