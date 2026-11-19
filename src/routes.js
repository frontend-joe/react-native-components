import { Accordion1Example, Card2Example, DeleteButton, Login1 } from "./components";

// Register each component here. `path` must be /<category>/<name>,
// matching src/app/[category]/[name].jsx.
// Screens are full-screen with no header, so handle the top safe area in the component.
export const routes = [
  {
    name: "DeleteButton",
    path: "/buttons/delete-button",
    Component: DeleteButton,
  },
  {
    name: "Card2",
    path: "/cards/card-2",
    Component: Card2Example,
  },
  {
    name: "Accordion1",
    path: "/accordions/accordion-1",
    Component: Accordion1Example,
  },
  {
    name: "Login1",
    path: "/logins/login-1",
    Component: Login1,
  },
];
