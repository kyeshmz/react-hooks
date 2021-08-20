import { useCallback, useEffect, useState } from "react";

export const Direction = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UNDEFINED: "UNDEFINED",
} as const;

type Direction = typeof Direction[keyof typeof Direction];

interface PS5Controller {
  isSquarePressed: boolean;
  isCirclePressed: boolean;
  isTrianglePressed: boolean;
  isXPressed: boolean;
  isRBumperPressed: boolean;
  isLBumperPressed: boolean;
  isRTriggerPulled: boolean;
  rTriggerVal: number;
  isLTriggerPulled: boolean;
  lTriggerVal: number;
  leftStick: Direction;
  rightStick: Direction;
  arrowPad: Direction;
}
const PS5ControllerInitial: PS5Controller = {
  isSquarePressed: false,
  isCirclePressed: false,
  isTrianglePressed: false,
  isXPressed: false,
  isRBumperPressed: false,
  isLBumperPressed: false,
  isRTriggerPulled: false,
  isLTriggerPulled: false,
  leftStick: Direction.UNDEFINED,
  rightStick: Direction.UNDEFINED,
  arrowPad: Direction.UNDEFINED,
};

export default function useGamepads() {
  const [gamepad, setGamepad] = useState<Gamepad | null>();

  const [controls, setControls] = useState<PS5Controller>(PS5ControllerInitial);

  useEffect(() => {
    memoTick();
  }, []);

  const memoTick = useCallback(() => {
    const poll = pollGamepads();
    setGamepad(poll);
    clearValues();
    window.requestAnimationFrame(() => memoTick());
  }, [gamepad]);

  // function tick() {
  //   const poll = pollGamepads();
  //   setGamepad(poll);
  //   window.requestAnimationFrame(() => tick());
  // }

  function clearValues() {
    setControls(PS5ControllerInitial);
  }

  function pollGamepads() {
    return navigator.getGamepads()[0];
  }

  useEffect(() => {
    if (gamepad !== null && gamepad !== undefined) {
      if (gamepad.buttons[12].pressed) {
        setControls({ ...controls, arrowPad: Direction.UP });
      }
      if (gamepad.buttons[13].pressed) {
        setControls({ ...controls, arrowPad: Direction.DOWN });
      }
      if (gamepad.buttons[14].pressed) {
        setControls({ ...controls, arrowPad: Direction.LEFT });
      }
      if (gamepad.buttons[15].pressed) {
        setControls({ ...controls, arrowPad: Direction.RIGHT });
      }
      if (gamepad.buttons[0].pressed) {
        setControls({ ...controls, isXPressed: true });
      }
      if (gamepad.buttons[1].pressed) {
        setControls({ ...controls, isCirclePressed: true });
      }
      if (gamepad.buttons[2].pressed) {
        setControls({ ...controls, isSquarePressed: true });
      }
      if (gamepad.buttons[3].pressed) {
        setControls({ ...controls, isTrianglePressed: true });
      }
      if (gamepad.buttons[4].pressed) {
        setControls({ ...controls, isLBumperPressed: true });
      }
      if (gamepad.buttons[5].pressed) {
        setControls({ ...controls, isRBumperPressed: true });
      }
      if (gamepad.buttons[6].value > 0) {
        setControls({
          ...controls,
          isLTriggerPulled: true,
          lTriggerVal: gamepad.buttons[6].value,
        });
      }
      if (gamepad.buttons[7].value > 0) {
        setControls({
          ...controls,
          isRTriggerPulled: true,
          rTriggerVal: gamepad.buttons[7].value,
        });
      }
      if (gamepad.axes[0] > 0) {
        setControls({
          ...controls,
          leftStick: Direction.LEFT,
        });
      }
    }
  }, [gamepad]);

  return {
    gamepad,
    controls,
  };
}
