import { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { FormControl, Input, InputLabel, Button }from "@mui/material";

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  return (
    <FormControl className="userform">
        <InputLabel htmlFor="username">Name: </InputLabel>
        <Input id="username" name="inputName" value={inputName} onChange={e => setInputName(e.target.value)}/>
        <Button onClick={handleSubmit}>Start</Button>
    </FormControl>
  )
}