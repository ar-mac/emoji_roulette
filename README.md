## Features to be implemented
* Display random emoji in `App` component
  * Import array of emojis from `src/assets/emojis.js` to component file
  * Display first emoji from the array (codepoint and emoji itself)
  * In `render` get random value of index and display emoji from that index
  * Extract index value to component state
  * Display button with text `Get another emoji`
  * Implement function calculating another random index value and saving it in state
  * Connect function for calculating random index with button click
    * Use fat arrow or bind `this` in order to prevent `this` being undefined
* Use `String.fromCodePoint` function to parse codepoints into emoji and display parsed emoji
* Tweak algorithm for getting random index to return values bigger than array of emojis
  * When no emoji is selected, display alternative text (use ternary operator for conditional rendering)
  * Extract emoji rendering markup to component method
* Use twemoji package to handle emojis not supported (rendered as square)
  * https://www.npmjs.com/package/twemoji
  * add `twemoji` package via npm
  * `import twemoji from 'twemoji'`
  * follow the package documentation
* Extract emoji rendering markup to separate component `src/components/DisplaySelectedEmoji.js`
  * Use functional component (just a fat arrow returning markup)
    * accept `props` as parameter to this function
  * import extracted component in main one and render it
  * Pass selected index to `DisplaySelectedEmoji` as prop
  * In `DisplaySelectedEmoji` replace usages of this.state.index with props.index
* Add `proptypes` package via npm
  * Import PropTypes and define them for `DisplaySelectedEmoji`
* Implement resetting index in `DisplaySelectedEmoji` component
  * Create method `resetIndex` in `App` resetting `state.index` to `0`
  * Pass this method to `DisplaySelectedEmoji` as `resetFn` property (the same way index property is passed)
  * Add button in `DisplaySelectedEmoji` component
  * Connect `resetFn` method to button via `onClick` property (that way child can change parent data - data goes down, function calls go up - unidirectional data flow)
* In `DisplaySelectedEmoji` add counter for how long is emoji visible
  * Migrate `DisplaySelectedEmoji` from functional to class-ical component type.
  * Add `secondsPassed` to `DisplaySelectedEmoji` component state with initial value 0
  * Use `componentDidMount` react lifecycle method for `DisplaySelectedEmoji` and `setInterval` js function to increment `this.state.secondsPassed` every 1 second.
  * Fix counter not resetting on selecting new emoji by providing unique `key` property `<DisplaySelectedEmoji key={this.state.index}>`
  * Fix errors about setting state of unmounted component by saving interval id to `DisplaySelectedEmoji` state and in `componentWillUnmount` lifecycle hook add pass interval id as argument to browser function `clearInterval`
  (setState is async, so it does not guarantee property in this.state.intervalId to be updated in the line below)
* Implement getting new emoji automatically after 10s
  * Pass `getRandowEmoji` method as prop to `DisplaySelectedEmoji`
  * When `secondsPassed` is 10, call method received from parent to get new emoji.
* Display list of last 5 emojis
  * Save 5 last displayed emojis (not indexes) in main component state.
  * Below currently selected emoji, map over array of stored previous emojis and reuse `DisplaySelectedEmoji` component for every one.
  (key property needs to be unique only for the siblings)
* (extra) Add input for getting time when new emoji should be selected
  * Add html input
  * (1 way) Connect input to react as uncontrolled component - use `onBlur` handler and `ref` property. Blur handler should get value from the input available via ref property.
  * (2 way) Change input to controlled component - use `value` and `onChange` handler. onChange handler should call `setState` saving new value received as parameter.
* (extra) Jest specs
  * enzyme
  * `setup` pattern
  * snapshot specs
  * tests for implementation
* (extra) ReactDevTools browser add-on
