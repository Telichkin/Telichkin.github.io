function toggleComments(button) {
  commentsAreOpen() ? closeComments() : openComments();

  function commentsAreOpen() { return Boolean(document.querySelector('#disqus_script')) }
  function openComments() {
    var script = document.createElement('script')
    script.id = 'disqus_script'
    script.src = 'https://telich.disqus.com/embed.js'
    script.setAttribute('data-timestamp', +new Date())
    document.body.appendChild(script)
    button.innerText = 'Закрыть комментарии'
  }
  function closeComments() {
    document.body.removeChild(document.querySelector('#disqus_script'))
    document.querySelector('#disqus_thread').innerHTML = ''
    button.innerText = 'Открыть комментарии'
  }
}

function disqus_config() {
  this.page.url = window.location.href
  this.page.identifier = 'telich'
}