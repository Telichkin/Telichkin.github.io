const SimpleRouterForFolderWithPosts = (folder) => {
  let self = {}

  self.dispatchPath = (path, { toHtmlNode }) => {
    path = path.startsWith('/') ? path.slice(1) : path
    path = path.endsWith('/') ? path.slice(0, -1) : path
    loadHtmlStringForFilename(path, { toHtmlNode })
  }

  self.dispatchHash = (hash, { toHtmlNode }) => {
    if (!hash.length) return
    
    hash = hash.slice(1)
    loadHtmlStringForFilename(hash, { toHtmlNode })
  }

  const loadHtmlStringForFilename = (path, { toHtmlNode }) => {
    return fetch(`${folder}/${path}.html`)
      .then(resp => resp.text())
      .then(htmlString => toHtmlNode.innerHTML = htmlString)
  }

  return self
}