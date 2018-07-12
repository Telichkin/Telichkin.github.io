e('div', { className: 'header' }, 
  e('a', { 
    textContent: 'Заметки Романа Теличкина',
    className: 'header__title', 
    href: '/'
  }),
).mountInsteadOfNode(document.querySelector('.header'))