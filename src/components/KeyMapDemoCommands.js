let bolded = false
const KeyMapDemoCommands = command => {
  let controllers = {
    "Say Hi!": () => alert("Hi!"),
    "Dark Mode": () => {
      document.querySelector("iframe, img, html").style =
        "-webkit-filter: invert() hue-rotate(180deg) brightness(105%) contrast(105%);"
    },
    "Light Mode": () => {
      document.querySelector("iframe, img, html").style = ""
    },
    Bold: () => {
      bolded = !bolded

      document.querySelector("*").style = bolded
        ? "font-weight: bold;"
        : "font-weight: normal;"
    },
  }
  if (controllers[command]) {
    controllers[command]()
  }
}

// iframe, img, html {
//   -webkit-filter: invert() hue-rotate(180deg) brightness(105%) contrast(105%);
// }

export default KeyMapDemoCommands
