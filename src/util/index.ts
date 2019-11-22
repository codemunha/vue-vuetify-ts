const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const kebab = (str: any) => (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const toggleFullScreen = () => {
  let doc: any = window.document
  let docEl: any = doc.documentElement

  let requestFullScreen =
    docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
  let cancelFullScreen =
    doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl)
  } else {
    cancelFullScreen.call(doc)
  }
}

export default {
  randomElement,
  toggleFullScreen,
  kebab
}