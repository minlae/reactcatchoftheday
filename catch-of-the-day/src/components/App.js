import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish"; 
import base from "../base";

class App extends React.Component {

//State can also be set using Constructor and super. Wes doesn't go too much into it but says he prefers the "property" method.
//The Constructor way is:
// constructor() {
//   super();
//   this.state = {
//     fishes: {},
//     order: {}
//   }
// }

 state = {
   fishes: {},
   order: {}
 }

 componentDidMount() {
  //  Remember: you get match from React Router props.
  const { params } = this.props.match;
   // When you refresh page, this lifecycle method is called when component mounts, and state is updated due to the syncState below. This then triggers the componentDidUpdate method which updates the order in localStorage to be blank since that's what it is for that split second when you refresh.
  //  Need to set whatever the local storage is back to state. But of course, only if there IS a local storage for that store.
   // So now you need to reinstate the local storage as soon as you mount
  //  Need to wrap it into an object -- the opposite of what we did in localstorage.SetItem. JSON.parse.
  // Direction of info: From local storage TO state (Order).
  // (But )
  const localStorageRef = localStorage.getItem(params.storeId);
  // Remember to first check that there IS a storeId.
  if (localStorageRef) {
    this.setState({
      order: JSON.parse(localStorageRef)
    });
  }
 
  //NB: This ref is different from the react refs, like in the AddFishForm component. Potentially more notes to add later on in course.
  // Remember: This step is to get the data from Firebase. You are only getting the FISHES data from Firebase (NOT the order. Order comes from local storage). Direction of info: From Firebase database TO state (Fishes)
  this.ref = base.syncState(`${params.storeId}/fishes`, {
    context: this,
    state: 'fishes'
  });
 }

 componentDidUpdate() {
  //  setItem(key, value). Setting the value of the storeID to order.
  // JSON.stringify converts an object to a string representation. Value is expected to be a string.
   localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
 }

 //When "unmount" / leaving the page, need to clean up so that Firebase doesn't continue to listen (? need to go over this again. But also this feels like a thing you can just remember to do without going into detail)
 componentWillUnmount() {
  base.removeBinding(this.ref);
 }

 //QUESTION: Lifecycle methods specify at what times whatever is in their body gets called. But what about the functions that are living in this App class, outside of any lifecycle method?
 //Attempted answer: I think the stuff in lifecycle methods actually gets called/executed right at whatever point in the lifecycle the method is for. The ones outside of that are just part of the class, able to be called once needed, but not immediately executed at whatever point in the lifecycle.

 addFish = (fish) => {
  // In order to update state in React, have to use their existing update state API. The only way to do it!
  //Take a copy of the existing state.
  //Add our new fish to the fishes variable
  //Then send the thing to the current state
  const fishes = {...this.state.fishes};

  //This part is assigning a value to fish#####
  // i.e. it's doing fishes.fish#### = { fish data which is an object! }
  // so you get fish#### { desc: "fish description", name: "fish name" (etc)}
  // so can access via e.g. fishes.fish####.desc
  // so now you'd have added fish
  fishes[`fish${Date.now()}`] = fish;

  //the object key is the piece of state you want to update--fishes. Then the value is the new variable defined ^ which is fishes (copy of old + added new fish)!
  this.setState({
    // this is fine: fishes: fishes
    // but in es6 if your property and value are the same, you just need to specify the one word like so:
    fishes
  });
 }

 loadSampleFishes = () => {
  this.setState({ fishes: sampleFishes });
 };

 addToOrder = key => {
   //1. take a copy of state
   const order = {...this.state.order};

   //2. either add to the order or update number in our order
   //Below is nifty trick for incrementing or starting at 1
   //example, below is basically like order.fish1: 1
   order[key] = order[key] + 1 || 1;

   //3. call setState to update our order state
   this.setState({ order });
 }

 removeFromOrder = (key) => {
  // 1. Copy current state
  const order = {...this.state.order};
  // 2. Update that state. Because we're not using Firebase for order, can just use delete.
  // Remember: With Firebase, you have to set it to "null"
  delete order[key];
  // 3. Set that to state
  this.setState({ order });
}

updateFish = (key, updatedFish) => {
// 1. Take a copy of the current state
const fishes = {...this.state.fishes};
// 2. Update that state
fishes[key] = updatedFish;
// 3. Set that to state
this.setState({ fishes });
}

deleteFish = (key) => {
  // 1. Copy current state
  const fishes = {...this.state.fishes};
  // 2. Update that state. Note this is almost identical to updateFish--only difference being at this step, instead of setting to updatedFish, we're setting the fish.key to null. You could say delete fishes[key] but that would have trouble with Firebase, so have to use fishes[key] = null
  fishes[key] = null;
  // 3. Update state
  this.setState({ fishes })
}

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Always Fresh!" />
          <ul className="fishes">
            {/* Object.keys gets you all the keys in the object, so for the fishes state object, you'd get an array of all the individual/unique fishes in it (e.g Fish1, Fish2, ... Fish####). Now you can loop over that array with array methods... such as map! 
            
            Note on the "key" element attribute below. Each child in an array or iterator should have a unique "key" prop. The easist way to do this in this case is to assign the actual object key, since they are unique! This is why we have key={key} as a prop.

            Need to pass down fish details to the actual fish component. Do it via props, as usual. Note syntax below. You're looking for the fish object that you're currently iterating over, so it would be this.state.fishes.fish####. To use the key parameter, need to use bracket notation, not dot.

            Slightly confusing note on getting the key of the fish for the addToOrder method. No way to access it other than to pass the key down again as a different prop. So in Fish below, there's key={key} and then also index={key}. Same data, different props.

            CONFUSIONS: How does map work below? Doesn't it output an array? Also, why does the key need to be passed twice as different props? Why can't Fish component use the same one?

            Attempted answer: If I look at the props in chrome inspector, it doesn't list key. it's got details and index. Maybe it has something to do with this. Key is probably a set term/item specifically for unique id, and so unavailable as a normal prop.

            */
            }
            {Object.keys(this.state.fishes).map(key => <Fish 
              key={key}
              index={key}
              details={this.state.fishes[key]}
              addToOrder={this.addToOrder}
            />)}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
          addFish={this.addFish} 
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        /> 
      </div>
    );
  }
}

export default App;