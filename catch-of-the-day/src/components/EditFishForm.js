import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  // Notice how this is a different way of getting the value of an input, not using refs. You don't need refs here because you're using function anyway and you get access to event object
 
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string, 
      name: PropTypes.string, 
      desc: PropTypes.string, 
      status: PropTypes.string, 
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func
  };

  handleChange = (event) => {
    //update that fish
    // 1. Take a copy of the current fish

    //New thing in ES6: Computed property names, use square brackets. Gets you the name of the field you're editing and then gets its value --i.e. whatever you just changed, since this is a listener for change (e.g. status: Fresh!).
    // Explanation: This is the thing that allows you to display e.g. what the person is typing in the field as they are typing it (in realtime)
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    }
    this.props.updateFish(this.props.index, updatedFish);
  }



  render() {
    return ( <div className="fish-edit">
     <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />     
     <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price} />
     <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
        <option onChange={this.handleChange} value="available">Fresh!</option>
        <option onChange={this.handleChange} value="unavailable">Sold Out!</option>
      </select>
     <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
     <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} />
     <button onClick={() => this.props.deleteFish(this.props.index)}>Delete Fish</button>
    </div>)
  }
}

export default EditFishForm;