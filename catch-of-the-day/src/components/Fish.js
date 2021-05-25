import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string, 
      name: PropTypes.string, 
      desc: PropTypes.string, 
      status: PropTypes.string, 
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  }
  // Note: Can either create a "handleClick" function for the add to order button OR you can just put the code inline in the button (as below). Inline is ok / preferable if you only use the function once, I think. Clears up clutter up here.
  // handleClick = () => {
  //   this.props.addToOrder(this.props.index);
  // }
  
  render() {
    // object destructuring, to the rescue! 
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';

    return (
      <li className="menu-fish">
        <img src={image} alt={name}></img>
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
    <button 
      disabled={!isAvailable}
      onClick={() => this.props.addToOrder(this.props.index)}
      >
        {isAvailable ? 'Add to order' : 'Sold out!'}
    </button>
      </li>
    );
  }
}

export default Fish;