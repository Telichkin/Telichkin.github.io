const sMeta = [
  {
    title: 'Объектно-ориентированное программирование без классов',
    slug: 'objects-vs-classes',
  },
  {
    title: 'Париж',
    slug: 'paris',
  },
  {
    title: 'Рефакторинг от души',
    slug: 'glided-rose-refactoring',
  },
  {
    title: 'Один инбокс для всего-всего',
    slug: 'one-inbox-is-overkill',
  },
  {
    title: 'Тесты на одном уровне абстракции',
    slug: 'one-level-abstraction-tests',
  },
  {
    title: 'Как сделать популярное веб-приложение в 2018 году?',
    slug: 'popular-web-app-in-2018',
  },
  {
    title: 'Интеграционные или модульные тесты?',
    slug: 'integration-or-unit-tests',
  },
  {
    title: 'У Elixir более приятный синтаксис, чем у Erlang?',
    slug: 'is-elixir-syntax-sweet',
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