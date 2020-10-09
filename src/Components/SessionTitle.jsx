import React from "react";

export default function SessionTitle({ isRecess, title }) {
  if (!isRecess) {
    return (
      <div>
        {title === "Pomodoro" ? <h3>• {title} •</h3> : <h3>{title}</h3>}
      </div>
    );
  } else if (isRecess) {
    return (
      <div>{title === "Break" ? <h3>• {title} •</h3> : <h3>{title}</h3>}</div>
    );
  }
}
