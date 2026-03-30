import React from "react";
import ReactDOM from "react-dom/client";
import IntakeForm from "./IntakeForm";
import AgencyIntakeForm from "./AgencyIntakeForm";

const path = window.location.pathname;
const isAgency = path.includes("agency");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAgency ? <AgencyIntakeForm /> : <IntakeForm />}
  </React.StrictMode>
);
