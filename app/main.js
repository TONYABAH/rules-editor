
// import RulesEditor from '../dist/rules-editor.esm.js'
const editor = RulesEditor.edit('editor')
// var count = 0
const initial = '// Language en\n// @Author Tony Abah\nTITLE [your title here]\nSUMMARY [your summary here]\nGOAL [\'your goal here\']\n'
const winOptions = 'resizable=yes,scrollbars=yes, left=0,bottom=0,width=960,height=450'

window.addEventListener('load', (e) => {
  const text = localStorage.getItem('@rules-editor')
  editor.setValue(text)
  editor.clearSelection()
  document.getElementById('run').addEventListener('click', debounce(() => {
    run(editor.getValue())
  }, 100, true))
})

window.addEventListener('beforeunload', () => {
  localStorage.setItem('@rules-editor', editor.getValue())
})

function debounce (func, wait, immediate) {
  var timeout
  return function () {
    var context = this; var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
function run (data) {
  localStorage.setItem('@rules-editor', data)
  const win = window.open('app/console.html', 'console', winOptions)
  // win.postMessage('Hello world', 'http://127.0.0.1')
}
