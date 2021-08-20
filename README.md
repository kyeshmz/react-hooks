# Collection of React Hooks

### useKeypress

usage

```
const Demo = () => {
  const isEscapePressed = useKeyPress({ targetKey: "Escape" });

  return isEscapePressed ? "Yes" : "No";
};
```

### usePS5

```
 const { gamepad, controls } = useGamepads();
  useEffect(() => {
    console.log(controls.isLTriggerPulled);
  }, [gamepad]);
```
