## Features to be implemented
* Implement getRandomEmoji and display emoji, codepoint
* Implement fromCodePoint function getting random emoji from the list
  * conditional rendering when no emoji selected
* Use twemoji package to handle not supported emojis
* Extract emoji rendering markup to function
  * Further extraction to functional component
  * Use PropTypes
* Implement resetting emojis button
* Keep selectedIndex in state rather than full emoji
* Add counter for how long is emoji visible
  * Migrate functional to classical component + lifecycle
  * Key for detecting component changes
  * Add clearInterval on unmount
* Add auto getting next random emoji after 10s (child calls parent method)
  * (optional) Add input to define time after which new emoji will be get
* Render 5 last emojis (rendering with map)
* (extra) Jest specs
  * enzyme
  * `setup` pattern
  * snapshot specs
  * tests for implementation
