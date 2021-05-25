import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// IMPORTANT NOTE: Once CSS styling is in effect, will need to use command "npm run watch" rather than "npm start". This command concurrently watches and compiles css updates as well as runs the localhost app.
// Ctrl C ends the watch etc

class Order extends React.Component {
  
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
    renderOrder: PropTypes.func
  }

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      classNames: "order",
      key,
      // remember: above is short for key: key
      timeout: { enter: 500, exit: 500}
    };
    // first make sure the fish is loaded. Display nothing if it isn't:
    if (!fish) return null;

    // directly below can also be written as:
    // <CSSTransition 
    //     classNames="order" 
    //     key={key} 
    //     timeout={{ enter: 500, exit: 500 }}
    //     >  
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>  
          <li key={key}>Sorry, {fish ? fish.name : "fish"} is no longer available.</li>
        </CSSTransition>
      );
    
    }
    return (
      <CSSTransition {...transitionOptions}>  
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              {/* Note: Can't replace the below with the ...transitionOptions spread because the classNames property doesn't match. */}
              <CSSTransition classNames="count" key={count} timeout={{enter: 500, exit: 500}}>
              <span>
                {count} 
              </span>
              </CSSTransition> 
            </TransitionGroup>
            lbs {fish.name}&nbsp;
            <button onClick={()=> this.props.removeFromOrder(key)}>&times;</button>
            {formatPrice(count * fish.price)}
          </span>
        </li>
      </CSSTransition>
    );
  }

  render() { 
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order!</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
        
      </div>
    );
  }
}

export default Order;