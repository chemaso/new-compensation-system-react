import React from "react";
import { Helmet } from "react-helmet";

export default function CommonHelmet({ title }) {
  return (
    <Helmet>
      <title>SICE | {title}</title>
    </Helmet>
  );
}
