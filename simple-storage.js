const SStorage = (key) => {
  let self = {}

  self.upload = (text) => {
    window.localStorage.setItem(key, text)
  }

  self.download = () => {
    return window.localStorage.getItem(key) || ''
  }

  return self
}