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

### Done during CoderDojo at 12-Oct-2017

#### Form Features
* validation, and server validation
* error handling
* formatting
* scoped fields (price range, disabling options depending on other input)
* array of fields (you can add/remove them)

#### Steps

* Add form data structure matching `Form schema` below to `RegisterForm` state

##### Form schema
* **age** **-** *presence, numericality* **-** if below 13 hides form
* **username** **-** *presence length and regex (serverside already taken from the predefined list)*
* **email** **-** *presence regex (serverside already taken from the predefined list)*
* **addresses[]** **-** *inputs not validated if every is empty* **-** can add/remove from the list
  * **addresses[]city** **-** *presence presence in predefined list* **-** it automatically fills zip-code
  * **addresses[]zipCode** **-** *presence presence in predefined list* **-** it automatically fills city, auto formatting

* Add `handleChange` method updating state property accessible by `event.target.name` with value `event.taget.value`
  * create method `handleChange`
  * import `set` method from `lodash` package
  * set `value` using `name` path to `this.state.data`
  * setState with modified state assigned to `data` property
* Add `age` input field and fill up the missing parts
  ```
  <div className={cn('form-group', {
    'has-error': get(X, 'X')
  })}>
    <label htmlFor="X">X</label>
    <input
      type="text"
      className="form-control"
      name="X"
      placeholder="X"
      value={X}
      onChange={X}
    />
    {get(X, 'X') &&
    <span className="help-block">{X}</span>
    }
  </div>
  ```
  * import cn from classnames package
* Repeat for `userName email` fields
* Add `adresses` field lists
  * Add iteration over addresses in form data and render 
  ```
  <div className="panel panel-default" key={index}>
    <div className="panel-heading">
      <h3 className="panel-title">address #{index+1}</h3>
      <button>Remove</button>
    </div>
    <div className="panel-body">
      Panel content
    </div>
  </div>
  ```
  * Create method removing address of given index from form data
  * Bind Remove button to removing function
  * Create method adding new address to form data
  * After iteration add button triggering adding new address
  * In place of `Panel content` add `select` element for `city` similar as before, but use nested name like `addresses[0].city` where 0 is current index value
    * Inside `select` tag put `option` tags for some cities
  * Add regular input field for `zipCode` and bind it accordingly
* Bind fields city and zipCode together
  * Replace their city handleChange method with custom one
  * In this custom method trigger handleChange of zipCode field with appropriate value
* Add validations
  * Make function `validate` return false if errors detected
  * Update `state.errors` with properly nested error objects according to specification
  * If no errors detected then return true

* (extra) fragments from https://www.youtube.com/watch?v=-tDy7ds0dag
* (extra) bootstrap https://bootstrapdocs.com/v3.3.6/docs/css/#overview
* (extra) yup https://github.com/jquense/yup

#### Not implemented during workshops
* Format zipCode field
  * create method transforming zipCode in raw form into dashed form or in reverse depending on parameter
  * bind transforming method with format flag to zipCode value
  * before passing value to handleChange transform it with format flag off

-------------

### Done during CoderDojo at 23-Nov-2017

#### Introduction
* What is [Jest](http://facebook.github.io/jest/)
* What is [Enzyme](http://airbnb.io/enzyme/)
  * shallow vs mount
  * lifecycleExperimental for shallow
* Types of testing approaches
  * Unit test for method
  * User interaction test for method
  * Snapshot test for markup & markup changes 
* `setup` pattern and the steps leading to it

#### Testing with Jest features
* Things to test
  * Markup and props (for snapshots)
  * Regular component method
  * Handler method triggered by user interaction
  * Lifecycle method
  * Asynchronous method
  * Method which returns complex object (to use special matchers)
  * Method conditionally calling function from props with attributes (to expect it being called with attributes)
  * mock import

#### Steps
* snapshot specs
  * markup in different conditions
  * snapshot tests for data
* tests for implementation
  * all lifecycle methods
    * triggered naturally
    * triggered manually
  * handler methods via find and simulate event
    * `onClick` `onSubmit` event handlers
  * all non handler methods in components (they are called by lifecycle, handlers, or child components)
* async testing
  * `handleSubmitByBackend` in `withBackend`
* useful matchers (objectContaining, arrayMatching)
* testing HOCs
  * using mock component
* mocking imports
  * mock `twemoji.parse` method in `DisplayEmoji`
  * mock `emojis` import in `Roulette`
* coverage generation and usage

-------

### Done during CoderDojo at 8-Feb-2018

#### Introduction
* What is Redux
 * https://medium.freecodecamp.org/an-introduction-to-the-redux-first-routing-model-98926ebf53cb
 * https://cdn-images-1.medium.com/max/2000/1*R_d_jeLBUp3hdjLeWRnz4Q.png
* When to use it
* Rules
  * Do not mutate state
* Redux Devtools
* Reducers
* Action Creators
* Selectors

#### Steps
* setup redux and react-redux 
  * https://redux.js.org/docs/basics/UsageWithReact.html#passing-the-store
  * https://redux.js.org/docs/api/combineReducers.html#reducersindexjs
* setup redux dev-tools
  * https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm
* implement registration via redux
  * define which state properties are related to handling registration status
  * create folder `src/store/registration` with `types.js`, `actionCreators.js`, `reducer.js`, `selectors.js` files
  * define and export `types` for what can happen with registration (login/logout)
  * implement reducer for registration which will react on the types https://redux.js.org/docs/basics/Reducers.html#handling-actions
  * implement action creators for defined types https://redux.js.org/docs/basics/Actions.html#action-creators
  * `connect` `App` component to store and map state to its props https://redux.js.org/docs/basics/UsageWithReact.html#containersfilterlinkjs
  * `connect` `withBackend` `WrappedComponent` to store and map action creators to its props https://redux.js.org/docs/basics/UsageWithReact.html#containersfilterlinkjs
  * remove state from `App` which was extracted to redux
  * remove props from `withBacked` which were reimplemented via actionCreators
  * update `withBackend` methods which previously called handleRegistration, to call proper action creator
* implement emojis via redux
  * define which state properties are related to handling emoji
  * create folder `src/store/emojis` with `types.js`, `actionCreators.js`, `reducer.js`, `selectors.js` files
  * define and export `types` for what can happen with emoji (initialization, selecting new)
  * implement reducer for emojis which will react on the types https://redux.js.org/docs/basics/Reducers.html#handling-actions
  * implement action creators for defined types https://redux.js.org/docs/basics/Actions.html#action-creators
  * `connect` Roulette to store and map state and action creators to its props https://redux.js.org/docs/basics/UsageWithReact.html#containersfilterlinkjs
  * create selectors so component does not need to know about store structure https://redux.js.org/docs/recipes/ComputingDerivedData.html#containersvisibletodolistjs
  * remove state from Roulette which was extracted to redux
  * update Roulette methods which previously changed state, to call proper action creator

#### Materials
* Free Redux tutorial on egghead https://egghead.io/courses/getting-started-with-redux
* Part 2 Redux tutorial on egghead https://egghead.io/courses/building-react-applications-with-idiomatic-redux

------

### Redux thunk

### Testing redux and middleware

### React 16 differences and new things

### React Router

### Redux Form

### Functional JS

### React patterns

### Web accessibility
* Form handling
* Image handling
* Overall design
  * Coloring 
  * Sizes

## Topics
* (extra) Use axios to make requests to external api
