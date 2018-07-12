const SDict = (items = {}) => {
  const self = {}

  self.do = (aFunc) => {
    Object.keys(items).forEach(key => aFunc(key, items[key]))
  }

  self.copyToObject = (object) => {
    Object.assign(object, items)
  }

  self.withKey = (key, { orDefault } = {}) => {
    return items[key] || orDefault
  }

  return self
}

const SList = (items = []) => {
  const self = {}

  self.do = (aFunc) => {
    items.forEach(aFunc)
  }

  return self
}