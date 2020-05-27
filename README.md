This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Demo: (http://covid-tracker.edwardlanto.com/)

#### API Call

 * Used axios to make HTTP call and to resolve multiple requests.

#### Lazy Loading

 * Lazy loaded images used Intersection API. I put the helper in a seperate component. All images have class called "lazy" on it and set to an array and is used in the useEffect hook, which looks at the results variable & setElements method to see if any changes have occured to render.

 * In the useIO there is a mutable reference to the observer that initially starts at null. Then the observer uses the current property and grabs the current instance of it. After an element is on screen it the value is set to an entries variable. That entries valuable is then set then used in the App component an the image is set.