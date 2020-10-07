import React from "react";

export default function Session({ session, countdown }) {
  let regex = /^[0-9]$/;
  if (regex.test(countdown.toString())) {
    countdown = "0" + countdown;
  }

  return (
    <section id="session">
      <div id="session-circle"></div>
      <h2>{`${session}:${countdown}`}</h2>
    </section>
  );
}
