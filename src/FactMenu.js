import React from 'react';
import range from 'lodash/range';
import './FactMenu.css';

function FactMenu({ onSelect }) {
  return (
    <div className="FactMenu">
      <div className="menu">
        <ul className="menu-list">
          {range(9).map(n => (
            <li key={n} onClick={() => onSelect([n, n + 1])}>
              <button className="button is-large is-primary">
                {n}s and {n + 1}s
              </button>
            </li>
          ))}
          <li>
            <button className="button is-large is-primary">Mixed Facts</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FactMenu;
