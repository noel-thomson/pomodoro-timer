import React from "react";
import SessionTitle from "./SessionTitle";

export default function SessionLength({
  title,
  sessionLength,
  clickDown,
  clickUp,
  isRecess,
}) {
  return (
    <section className="component-wrapper" id="session-length">
      {/* <h3>{title}</h3> */}
      <SessionTitle title={title} isRecess={isRecess} />
      <p className="session-length-minutes">
        {sessionLength} <br />
        minutes
      </p>
      <div className="session-length-btn-container">
        <button className="btn session-btn" onClick={() => clickDown(title)}>
          Down
        </button>
        <button className="btn session-btn" onClick={() => clickUp(title)}>
          Up
        </button>
      </div>
    </section>
  );
}
