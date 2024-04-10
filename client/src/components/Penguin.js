import React from "react";
import './penguin-styles.css';

const Penguin = () => {
  return (
    <div className="penguin">
      <div className="penguin-head">
        <div className="face left"></div>
        <div className="face right"></div>
        <div className="chin"></div>
        <div className="eye left">
          <div className="eye-lid"></div>
        </div>
        <div className="eye right">
          <div className="eye-lid"></div>
        </div>
        <div className="blush left"></div>
        <div className="blush right"></div>
        <div className="beak top"></div>
        <div className="beak bottom"></div>
      </div>
      <div className="shirt">
        <div>💜</div>
        <p>I Spuds</p>
      </div>
      <div className="penguin-body">
        <div className="arm left">
          {/* Fishing rod, line, and hook */}
          <div className="fishing-rod"></div>
          <div className="line"></div>
          <div className="hook"></div>
        </div>
        <div className="arm right"></div>
        <div className="foot left"></div>
        <div className="foot right"></div>
      </div>
    </div>
  );
};

export default Penguin;
