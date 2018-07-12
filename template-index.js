const sMeta = [
  {
    title: 'Тесты на одном уровне абстракции',
    slug: 'one-level-abstraction-tests',
  },
  {
    title: 'Интеграционные или модульные тесты?',
    slug: 'integration-or-unit-tests',
  },
  {
    title: 'Невозможно разрабатывать без тестов',
    slug: 'u-can-not-to-code-without-tests',
  },
  {
    title: 'Какой у вас опыт работы по Agile?',
    slug: 'agile-experience',
  },
  {
    title: 'Вакансии',
    slug: 'job-opportunities',
  }
]

const sPosts = sMeta.reverse().map(({ title, slug }, index) => e('li', { className: 'posts__post' }, 
  e('a', { className: 'posts__link', href: `/${slug}`, textContent: `${index + 1}. ${title}` }),
))

e('ol', { className: 'posts' }, ...sPosts.reverse()).appendToNode(document.querySelector('.main'))