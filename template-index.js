fetch('./posts/_meta.json')
  .then(res => res.json())
  .then(meta => {
    const posts = meta.reverse().map(({ title, slug }, index) => e('li', { className: 'posts__post' }, 
      e('a', { className: 'posts__link', href: `/${slug}`, textContent: `${index + 1}. ${title}` }),
    ));

    e('ol', { className: 'posts' }, ...posts.reverse()).appendToNode(document.querySelector('.main'))
  })