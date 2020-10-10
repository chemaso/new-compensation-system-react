import React from "react";
import { Helmet } from "react-helmet";

export default function CommonHelmet({ title }) {
  return (
    <Helmet>
      <title>{title} | SICE</title>
    </Helmet>
  );
}
