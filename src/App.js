import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  function updateUserName(event) {
    setUserName(event.target.value);
  }

  function updateUserEmail(event) {
    setUserEmail(event.target.value);
  }

  function updateInterests(event) {
    const { value, checked } = event.target;

    setInterests((prevInterests) => {
      if (checked && !prevInterests.includes(value)) {
        return [...prevInterests, value];
      } else if (!checked) {
        return prevInterests.filter((interest) => interest !== value);
      }
      return prevInterests;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Contact Info</h3>
        <label htmlFor="user">Enter your user name: </label>
        <input 
          type="text"
          value={userName}
          id="user"
          placeholder="user name"
          onChange={updateUserName}
        />
        <label htmlFor="email">Enter your email address: </label>
        <input 
          type="text"
          value={userEmail}
          id="email"
          placeholder="email address"
          onChange={updateUserEmail}
        />
        <button type="submit">Submit</button>
      </form>

      {formSubmitted ? 
        <p>
          Thank you, {userName}! Your form has been submitted. We will contact you at {userEmail}.
        </p> :
        null
      }

      <h3>Interests</h3>
      <label>Select your interests below:</label>
      <div id="select-interests">
        <label>
          <input
            type="checkbox"
            id="interest-1"
            value="Interest 1"
            onChange={updateInterests}
            checked={interests.includes("Interest 1")}
          />
          Interest 1
        </label>
        <label>
          <input
            type="checkbox"
            id="interest-2"
            value="Interest 2"
            onChange={updateInterests}
            checked={interests.includes("Interest 2")}
          />
          Interest 2
        </label>
        <label>
          <input
            type="checkbox"
            id="interest-3"
            value="Interest 3"
            onChange={updateInterests}
            checked={interests.includes("Interest 3")}
          />
          Interest 3
        </label>
      </div>
      <h4>Selected Interests: </h4>
      <ul>
        {interests.map((interest) => (
          <li key={interest}>{interest}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
