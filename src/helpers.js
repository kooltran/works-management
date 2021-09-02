const isEmpty = obj => {
  for (var prop in obj) {
    return false
  }
  return true
}

export { isEmpty }
