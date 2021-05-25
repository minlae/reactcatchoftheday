import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";
// React event handlers vs calling a function (as in the input function getFunName):
// Calling the function (with brackets at end) will cause it to fire once component mounts (or on page load). Removing the brackets and calling it as in the onSubmit form attribute, calls it only once button is clicked.

// Aside on forms: The reason page refreshes is because by default, form sends the data to the action of the form (usually a php page / server-side form handler). If no action location specified, it sends it to the current page and page refreshes. This is why we need a preventDefault!  It is a function within the event object.


class StorePicker extends React.Component {

  static propTypes = {
    history: PropTypes.object
  };

  myInput = React.createRef();

  goToStore = (event) => {
  //1. Stop the form from submitting
  //2. Get the text from the input
  //3. Change the page to /store/whatever-they-entered
    event.preventDefault();
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Enter a store name</h2>
          <input 
            type="text" 
            required 
            placeholder="Store Name" 
            defaultValue={getFunName()}
            ref={this.myInput} 
          />
          <button type="submit">Visit store →</button>
        </form>
      </>
    );
  }
}

export default StorePicker;