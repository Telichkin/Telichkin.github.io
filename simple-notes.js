const SEditor = (selector, { withStorage: storage }) => {
  let self = {}, htmlNode

  const init = () => {
    htmlNode = document.querySelector(selector)
    htmlNode.innerHTML = storage.download()
    htmlNode.setAttribute('contenteditable', true)
    document.execCommand('enableObjectResizing  ', false)
    htmlNode.addEventListener('paste', pasteAsPlainText)
    htmlNode.focus()
    setInterval(saveContent, 10000)
  }

  self.bold = () => {
    document.execCommand('bold', false)
  }

  self.italic = () => {
    document.execCommand('italic', false)
  }

  self.title = () => {
    updateSelectionWithTag('h1')
  }

  self.heading = () => {
    updateSelectionWithTag('h3')
  }

  self.small = () => {
    updateSelectionWithTag('pre')
    const selectedNode = window.getSelection().focusNode.parentNode
    if (selectedNode.tagName !== 'PRE') return
    selectedNode.classList.toggle('small')
  }

  self.body = () => {
    updateSelectionWithTag('div')
  }

  self.center = () => {
    document.execCommand('justifyCenter', false)
  }

  self.left = () => {
    document.execCommand('justifyLeft', false)
  }

  self.right = () => {
    document.execCommand('justifyRight', false)
  }

  self.linkToUrl = (url) => {
    document.execCommand('createLink', false, url)
  }

  self.deleteLink = () => {
    document.execCommand('unlink', false)
  }

  self.addImageFromUrl = (url) => {
    document.execCommand('insertImage', false, url)
  }

  self.unorderedList = () => {
    document.execCommand('insertUnorderedList', false)
  }

  self.orderedList = () => {
    document.execCommand('insertOrderedList', false)
  }

  self.saveAsHtmlWithName = (name) => {
    const blob = new Blob([htmlNode.innerHTML], { type: 'text/html' })
    const aTag = document.createElement('a')

    aTag.href = URL.createObjectURL(blob)
    aTag.download = name
    aTag.hidden = true

    document.body.appendChild(aTag)
    aTag.click()
    document.body.removeChild(aTag)
  }

  const updateSelectionWithTag = (tagName) => {
    document.execCommand('formatBlock', false, `<${tagName.toUpperCase()}>`)
  }

  const pasteAsPlainText = (event) => {
    event.preventDefault()
    const plainText = event.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, plainText)
  }

  const saveContent = () => {
    storage.upload(htmlNode.innerHTML)
  }

  init()
  return self
}

const SMenuForEditor = (editor) => c(update => {
  let visible, left, top, onTopOfHtmlNode

  const init = () => {
    visible = false
    left = 0
    top = 0
    window.addEventListener('contextmenu', open)
    window.addEventListener('click', close)
  }

  const render = () => e('div', { className: className(), style: { left, top } },
    e('button', { textContent: 'Bold', onclick: editor.bold, className: 's-menu__button' }),
    e('button', { textContent: 'Italic', onclick: editor.italic, className: 's-menu__button' }),
    e('hr'),
    e('button', { textContent: 'Title', onclick: editor.title, className: 's-menu__button' }),
    e('button', { textContent: 'Heading', onclick: editor.heading, className: 's-menu__button' }),
    e('button', { textContent: 'Body', onclick: editor.body, className: 's-menu__button' }),
    e('button', { textContent: 'Small', onclick: editor.small, className: 's-menu__button' }),
    e('hr'),
    e('button', { textContent: 'Left', onclick: editor.left, className: 's-menu__button' }),
    e('button', { textContent: 'Center', onclick: editor.center, className: 's-menu__button' }),
    e('button', { textContent: 'Right', onclick: editor.right, className: 's-menu__button' }),
    e('hr'),
    e('button', { textContent: 'Unordered list', onclick: editor.unorderedList, className: 's-menu__button' }),
    e('button', { textContent: 'Ordered list', onclick: editor.orderedList, className: 's-menu__button' }),
    e('hr'),
    e('button', { textContent: 'Link to', onclick: addLink, className: 's-menu__button' }),
    e('button', { textContent: 'Delete link', onclick: editor.deleteLink, className: 's-menu__button' }),
    e('hr'),
    e('button', { textContent: 'Add image', onclick: addImage, className: 's-menu__button' }),
    e('button', { textContent: 'Image width', onclick: changeImageSize, className: 's-menu__button' }),
    e('hr'),
    e('button', { textContent: 'Save as HTML', onclick: saveAsHtml, className: 's-menu__button' }),
  )

  const className = () => {
    const visibility = visible ? 'visible' : 'hidden'
    return `s-menu ${visibility}`
  }

  const open = (event) => {
    event.preventDefault()
    onTopOfHtmlNode = event.target
    left = event.pageX
    top = event.pageY
    visible = true
    update()
  }

  const close = () => {
    if (!visible) return
    visible = false
    update()
  }

  const addLink = () => {
    const url = prompt('Enter the URL')
    editor.linkToUrl(url)
  }

  const addImage = () => {
    const url = prompt('Enter the image URL')
    editor.addImageFromUrl(url)
  }

  const changeImageSize = () => {
    if (onTopOfHtmlNode.tagName !== 'IMG') return
    const widthInPx = prompt('Image width', parseInt(onTopOfHtmlNode.width))
    onTopOfHtmlNode.style.width = parseInt(widthInPx) + 'px'
  }

  const saveAsHtml = () => {
    const name = prompt('Enter file name', window.location.href.slice(1))
    editor.saveAsHtmlWithName(name)
  }

  init()
  return render
})
