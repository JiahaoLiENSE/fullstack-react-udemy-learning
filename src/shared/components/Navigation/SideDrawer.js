import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

/* 
    Side bar display
    CSSTransition: CSSTransition applies a pair of class names during the appear , enter , and exit states of the transition.
    Portal: ReactDOM.createPortal(child, container); Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
 */
const SideDrawer = props => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
