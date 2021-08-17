function autoImplementedMode (filename) {
  var ext = filename.split('.').pop()
  var prefix = "ace/mode/"

  if (!ext) {
    return prefix + "text"
  }

  /**
   *  Functional, but inefficient if you want to write it by yourself ....
   */
  switch (ext) {
    case "js":
      return prefix + "javascript"
    case "cs":
      return prefix + "csharp"
    case "php":
      return prefix + "php"
    case "rb":
      return prefix + "ruby"
    case "json":
      return prefix + "json"
    default: 'text'
  }
}


// var filename = "myfile.js"
// In this case "ace/mode/javascript"
// var mode = autoImplementedMode(filename)
// editor.getSession().setMode(mode)
export default autoImplementedMode
