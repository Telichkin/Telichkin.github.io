const mustache = require('mustache')
const fs = require('fs')
const path = require('path')

mustache.escape = value => value

const rawPostsDir = './.raw'
const builtPostsDir = './notes'
fs.readdirSync(rawPostsDir).forEach(fileName => {
  const rawPostPath = path.join(rawPostsDir, fileName)
  const rawPost = fs.readFileSync(rawPostPath)

  const template = fs.readFileSync('./.blocks/post.html').toString()

  const builtPostContent = mustache.render(template, { main: rawPost })
  const builtPostPath = path.join(builtPostsDir, fileName)
  fs.writeFileSync(builtPostPath, builtPostContent)
});

