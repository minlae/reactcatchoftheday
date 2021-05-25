import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm"
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, {firebaseApp} from "../base";

class Inventory extends React.Component {
 
// localized state, only to this component:
state = {
  uid: null,
  owner: null
}

  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    addFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  //Check login status on refresh.
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user});
      }
    })
  }

  authHandler = async (authData) => {
    // 1. look up the curent store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if (!store.owner) {
      //save it as our own
      //Use uid, or potentially email. But I think they give you different results. UID is different for each auth method but email could be the same (e.g. one person using same email across Git, Twitter, FB). So with UID version, app would see you as a different owner based on if you login via Git or Twitter. But in email version, you are seen as the same person.
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
    console.log(authData);
  }

  authenticate = provider => {
    // Remember: square brackets instead of dot notation in order to use template literals to pass in provider argument for the first part of the string.
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = async () => {
    console.log('Logging out!');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }

  render() {

    //this could even be a component if you want.
    const logout = <button onClick={this.logout}> Log Out</button>;

    //1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>;
    }
    //2. Check if they are not the store owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div
          ><p>Sorry, you are not the store owner.</p>
          {logout}
        </div>
      )
    }
    // 3. They must be the owner, just render the inventory
    return (
      <>
        <div className="inventory">
          <h2>Inventory</h2>
          {logout}
          {/* Note that when passing down props (as opposed to passing down directly from component) you have to use this.props, since the info is in the props of this container component, and not in component itself. */}
          {/* Note: You cannot pass down a "key" prop (it's a special prop) of a component. You have to use a different name to pass down that info (e.g. like below we use "index"). */}
          {/* Functions directly below: First getting an array of the keys of the fishes state (this is e.g. Fish1, Fish2, Fish## etc. Then mapping over that and for each key (Fish1, etc) you render out an EditFishForm component for that key.NB: If you were to remove the [key] in the fish=, you just get the fishes state repeating for every key (i.e. for every fish object in state).) */}
          {Object.keys(this.props.fishes).map(key => <EditFishForm 
          key={key} 
          index={key}
          fish={this.props.fishes[key]} 
          updateFish={this.props.updateFish}
          deleteFish={this.props.deleteFish}
          />)}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
        </div>
      </>
    );
  }
}

export default Inventory;