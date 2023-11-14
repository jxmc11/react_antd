import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
};

const Transition = ({
  children,
  classNames,
  animation,
  ...props
}: TransitionProps) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={classNames ? classNames : animation}
      {...props}
    >
      <div ref={nodeRef}>{children as React.ReactNode}</div>
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
