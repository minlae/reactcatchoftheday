import React from "react";
import PropTypes from "prop-types";


const Header = ({tagline}) => (
  <header className="top">
    {/* this function significantly simplified. Uses arrow function. Implicit return. Can also be written as just a regular function, with props as a parameter.
    When writing stateless functional component (as opposed to regular comp with state, you don't use "this" anymore to reference props. You use props as argument.
    The reason above is using {} is because it's using object destructuring. This allows you to add multiple parameters, separated by a comma. You also no longer refer to it by typing "props.tagline" but just "tagline" 
    By the way, props is set in Header.js as an attribute of the element. You can add multiple props! E.g. add "age". All you have to do is add it to the element in Header.js, then add it separated via comma as a parameter here, and then refer to it as argument below, where it's needed! */}
    <h1>Catch 
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span> 
      Day</h1>
    <h3 className="tagline">
      <span>{tagline}</span>
    </h3>
</header>
);

Header.propTypes = {
  tagline: PropTypes.string.isRequired
};


export default Header;