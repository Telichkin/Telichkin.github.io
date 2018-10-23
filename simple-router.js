const SRouterForFolderWithPosts = (folder, { mainPageIs: mainPage }) => {
  let self = {}

  self.dispatchHashToHtmlNode = node => {
    let hash = window.location.hash
    hash = hash.slice(2)
    window.history.replaceState(null, null, hash)
    loadHtmlStringForFilename(hash, { toHtmlNode: node })
  }

  const loadHtmlStringForFilename = (path, { toHtmlNode }) => {
    path = (path.endsWith('/') ? path.slice(0, -1) : path) || mainPage
    return fetch(`${folder}/${path}.html`)
      .then(resp => resp.text())
      .then(htmlString => toHtmlNode.innerHTML = htmlString)
      .then(() => (path !== mainPage) && window.dispatchEvent(new Event('router/post-loaded')))
  }

  return self
}