import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addFish: PropTypes.func
  };

  createFish = (event) => {
    //stop form from submitting
    event.preventDefault();
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    }
    // addFish() has been passed down from App and can now be called within this component! Calling the function and adding fish as an argument to pass the data up into state!
    this.props.addFish(fish);
    //then clear form
    event.currentTarget.reset();
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name"></input>
        <input name="price" ref={this.priceRef} type="text" placeholder="Price"></input>
        <select name="status"ref={this.statusRef} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>
        <input name="image" ref={this.imageRef} type="text" placeholder="Image"></input>
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;