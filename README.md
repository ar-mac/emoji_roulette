## Features to be implemented

### Done during CoderDojo at 24-Aug-2017

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
* Extract emoji rendering markup to separate component `src/components/DisplayEmoji.js`
  * Use functional component (just a fat arrow returning markup)
    * accept `props` as parameter to this function
  * import extracted component in main one and render it
  * Pass selected index to `DisplayEmoji` as prop
  * In `DisplayEmoji` replace usages of this.state.index with props.index
* Add `proptypes` package via npm
  * Import PropTypes and define them for `DisplayEmoji`

--------------

### Done during CoderDojo at 07-Sep-2017

* Implement resetting index in `DisplayEmoji` component
  * Create method `resetIndex` in `App` resetting `state.index` to `0`
  * Pass this method to `DisplayEmoji` as `resetFn` property (the same way index property is passed)
  * Add button in `DisplayEmoji` component
  * Connect `resetFn` method to button via `onClick` property (that way child can change parent data - data goes down, function calls go up - unidirectional data flow)
* In `DisplayEmoji` add counter for how long is emoji visible
  * Migrate `DisplayEmoji` from functional to class-ical component type.
  * Add `secondsPassed` to `DisplayEmoji` component state with initial value 0
  * Use `componentDidMount` react lifecycle method for `DisplayEmoji` and `setInterval` js function to increment `this.state.secondsPassed` every 1 second.
  * Fix counter not resetting on selecting new emoji by providing unique `key` property `<DisplayEmoji key={this.state.index}>`
  * Fix errors about setting state of unmounted component by saving interval id to `DisplayEmoji` state and in `componentWillUnmount` lifecycle hook add pass interval id as argument to browser function `clearInterval`
  (setState is async, so it does not guarantee property in this.state.intervalId to be updated in the line below)
* Implement getting new emoji automatically after 10s
  * Pass `getRandowEmoji` method as prop to `DisplayEmoji`
  * When `secondsPassed` is 10, call method received from parent to get new emoji.
* Display list of last 5 emojis
  * Save 5 last displayed emojis (not indexes) in main component state.
  * Below currently selected emoji, map over array of stored previous emojis and reuse `DisplayEmoji` component for every one.
  (key property needs to be unique only for the siblings)
* (extra) Add input for getting time when new emoji should be selected
  * Add html input
  * (1 way) Connect input to react as uncontrolled component - use `onBlur` handler and `ref` property. Blur handler should get value from the input available via ref property.
* (extra) ReactDevTools browser add-on

--------------

### Done during CoderDojo at 21-Sep-2017

* Extract behaviour functionality from DisplayEmoji into HOC (Higher Order Component)
  * Create new file `withTimer.js` in `src/assets` folder
    * Create and export fat arrow function `withTimer` which receives `WrappedComponent` property
    * Make function `withTimer` return class component `WithTimer` (import React, Component, PropTypes)
    * Copy all methods handling secondsPassed state into `WithTimer` and remove them from `DisplayEmoji`
    * Rename `getNewEmoji` to `resetHandler` and update name of this prop being send in `App`
    * Rename `resetFn` property and `resetIndex` method to `clearIndex` wherever they are used, to prevent confusion with `resetHandler` property
    * Define `propTypes` for `WithTimer` class before returning it from `withTimer`
  * In `DisplayEmoji` change binding `this.state.secondsPassed` into `secondsPassed` and destructure it from props (just like index and resetFn properties)
    * Update `propTypes` for `DisplayEmoji` to contain index, resetFn and secondsPassed properties
  * Display div with `secondsPassed` conditionally when it is `>= 0` to handle situations when this property is not passed.
  * Change DisplayEmoji back to functional component
  * Create new file `src/assets/NoEmojiMessage.js`
    * Extract markup rendering info about no emoji for given index to functional component to file `NoEmojiMessage.js`
    * functional component should accept index property
    * change `this.state.index` to just `index` received as argument
    * add conditional displaying of 'secondsPassed' just like in DisplayEmoji and accept it as argument
* Wrap both components in HOCs and use them in `App`
  * In `NoEmojiMessage.js`
    * Import `withTimer` HOC
    * Add default export for `withTimer(NoEmojiMessage)` and use it in `App.js`
    * Add `resetTime` and `resetHandler` and `key` properties to NoEmojiMessage component in `App.js`
  * In `DisplayEmoji.js`
    * Import `withTimer` HOC
    * Add default export for `withTimer(DisplayEmoji)` and use it in `App`
* When rendering 5 last emojis use `DisplayEmoji` component without HOC as they do not need timer functionality
  * Make `clearIndex` property optional and render button only when it is provided
  * Update `state.previousEmojis` to contain indexes not whole Emojis (update state initialization and `getRandomEmoji`)
  * Replace div rendering emoji in function mapping through `previousEmojis` with `DisplayEmoji` or `NoEmojiMessage` depending on index value being less than `Emojis.length`

* Add input for getting time when new emoji should be selected
  * (2 way) Change input to controlled component - use `value` and `onChange` handler. onChange handler should call `setState` saving new value received as parameter.
  * (Using this pattern you can prevent updating input value/reformat it which is useful when having inputs for area code or phone number)

-------------

##Features
* validation
* error handling
* scoped fields (price range, disabling options depending on other input)
* select/multiselect
* checkboxes
* array of fields (you can add/remove them)
* (extra) curated fragments from https://www.youtube.com/watch?v=-tDy7ds0dag

## Form schema
* **age** **-** *presence* **-** if below 13 hides form
* **username** **-** *presence length and regex (serverside already taken from the predefined list)*
* **email** **-** *presence regex (serverside already taken from the predefined list)*
* **addresses[]** **-** *inputs not validated if every is empty* **-** can add/remove from the list
  * **addresses[]city** **-** *presence presence in predefined list* **-** it automatically fills zip-code
  * **addresses[]zip-code** **-** *presence presence in predefined list* **-** it automatically fills city, auto formatting
  * **addresses[]address** **-** *presence format of street and home/apartment number*
* **interests[]** **-** --- **-** list of checkboxes
* **favourite_things** **-** --- **-** multiselect input
   

# React Form
* Initial setup for React Form
  * Add React Form to the dependencies
  * Get emojis from `LocalStorage` or File and store them in `App` state.
  * Add new component `AddEmojiForm` accepting properties `emojis` and `submitHandler` (empty for now)
  * In `App`
* In `AddEmojiForm` implement form for adding new emojis (http://unicode.org/Public/emoji/5.0/emoji-data.txt)
  * Add inputs for emoji and codepoint (one setState with computed key, to handle both inputs)
  * Connect inputs that adding emoji assigns its codepoint and vice versa 
  * Add multi select tag for providing emoji group [face, funny, food, thing]
  * Add validation to prevent adding already existing emoji
* Allow adding multiple entries with "Add more" button
  * Add validation preventing adding same emoji twice in one submit
  * Add removing emojis from form



Na następne CD mam zamiar wprowadzić kilka zmian, które pomogą osobom słabszym, ale nie spowolnią całości postępu.
- Będę trzymał się swoich wytycznych, i po każdej z nich robił commit + push tak aby osoby słabsze mogły sobie to ściągać na bierząco bez konieczności przepisywania. To załatwi problem, mojej chaotyczności, utraty uwagi przez uczestników przy przepisywaniu, spowolnienia związanego z sypiącą się implementacją u kilku osób, a w konsekwencji potrzeby kilku prowadzących.
- Przed samą implementacją i tłumaczeniem tematu, jeśli będzie to miało sens to przedstawię w formie graficznej jak omawiana rzecz jest zbudowana, działa, wiąże się z innymi, tak aby to bardziej schematycznie mogli zobaczyć zanim zacznę kodować.




## Topics
* (extra) Use axios to make requests to external api

### Testing with Jest
* Jest specs
  * enzyme
  * `setup` pattern
  * snapshot specs
  * tests for implementation

### React Router

### React Redux
  * Redux thunk

### Redux Form
