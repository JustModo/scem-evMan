import React from "react";
import ConstraintsCard from "./constraint-card";
import BoilerplateCard from "./boilerplate-card";
import IOFormatCard from "./ioformat-card";

export default function CodingCard() {
  return (
    <>
      <ConstraintsCard />
      <BoilerplateCard />
      <IOFormatCard />
    </>
  );
}
