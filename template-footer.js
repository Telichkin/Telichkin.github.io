const sComments = c(update => {
  let oppened = false;

  const render = () => e('div', {},
    e('div', { className: className() }, 
      e('div', { textContent: 'Открыть комментарии', onclick: openComments, className: 's-comments__open-button' })
    ),
    e('div', { id: 'disqus_thread' }),
  )

  const className = () => {
    const visibility = oppened ? 'hidden' : 'visible'
    return `s-comments ${visibility}`
  }

  const openComments = () => {
    const script = document.createElement('script')
    script.src = 'https://telich.disqus.com/embed.js'
    script.setAttribute('data-timestamp', +new Date())
    document.body.appendChild(script)
    oppened = true
    update()
  }

  return render
})

const disqus_config = () => {
  this.page.url = window.location.href
  this.page.identifier = 'telich'
}

window.addEventListener('router/post-loaded', () => sComments.appendToNode(document.querySelector('.footer')))