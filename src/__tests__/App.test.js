import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />)

  const user = screen.getByLabelText(/enter your user name/i);
  const email = screen.getByLabelText(/enter your email address/i);

  userEvent.type(user, "John Smith");
  userEvent.type(email, "johnsmith@yahoo.com");

  expect(user).toHaveValue("John Smith");
  expect(email).toHaveValue("johnsmith@yahoo.com");
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />)

  const checkboxes = screen.getAllByRole("checkbox");

  expect(checkboxes.length).toBeGreaterThanOrEqual(3);
});

test("the checkboxes are initially unchecked", () => {
  render(<App />)

  const checkboxes = screen.getAllByRole("checkbox");

  checkboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  })
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />)

  const user = screen.getByLabelText(/enter your user name/i);
  const email = screen.getByLabelText(/enter your email address/i);

  userEvent.type(user, "John Smith");
  userEvent.type(email, "johnsmith@yahoo.com");

  expect(user).toHaveValue("John Smith");
  expect(email).toHaveValue("johnsmith@yahoo.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />)

  const interest1 = screen.getByLabelText(/interest 1/i);
  const interest2 = screen.getByLabelText(/interest 2/i);
  const interest3 = screen.getByLabelText(/interest 3/i);

  expect(interest1.checked).toBe(false);
  expect(interest2.checked).toBe(false);
  expect(interest3.checked).toBe(false);

  userEvent.click(interest1);
  userEvent.click(interest2);

  expect(interest1.checked).toBe(true);
  expect(interest2.checked).toBe(true);
  expect(interest3.checked).toBe(false);

  userEvent.click(interest1);

  expect(interest1.checked).toBe(false);
  expect(interest2.checked).toBe(true);
  expect(interest3.checked).toBe(false);
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />)

  const user = screen.getByLabelText(/enter your user name/i);
  const email = screen.getByLabelText(/enter your email address/i);
  const submitButton = screen.getByText(/submit/i);

  userEvent.type(user, "John Smith");
  userEvent.type(email, "johnsmith@yahoo.com");
  userEvent.click(submitButton);

  const message = screen.getByText(/thank you, john smith! your form has been submitted. we will contact you at johnsmith@yahoo.com./i);
  expect(message).toBeInTheDocument();
});
