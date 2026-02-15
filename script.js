const display = document.getElementById("display");
const keys = document.querySelector(".keys");

let current = "0";

const render = () => {
  display.value = current;
};

const appendValue = (value) => {
  if (current === "Error") {
    current = "0";
  }

  if (value === ".") {
    const parts = current.split(/[+\-*/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) {
      return;
    }
  }

  if (current === "0" && /\d/.test(value)) {
    current = value;
  } else {
    current += value;
  }
};

const clearAll = () => {
  current = "0";
};

const deleteOne = () => {
  if (current.length <= 1 || current === "Error") {
    current = "0";
    return;
  }
  current = current.slice(0, -1);
};

const calculate = () => {
  try {
    const result = Function(`"use strict"; return (${current})`)();

    if (!Number.isFinite(result)) {
      current = "Error";
      return;
    }

    current = String(result);
  } catch {
    current = "Error";
  }
};

keys.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const { value, action } = button.dataset;

  if (value) {
    appendValue(value);
  }

  if (action === "clear") {
    clearAll();
  }

  if (action === "delete") {
    deleteOne();
  }

  if (action === "equals") {
    calculate();
  }

  render();
});

window.addEventListener("keydown", (event) => {
  const allowed = "0123456789.+-*/";

  if (allowed.includes(event.key)) {
    appendValue(event.key);
  } else if (event.key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (event.key === "Backspace") {
    deleteOne();
  } else if (event.key === "Escape") {
    clearAll();
  } else {
    return;
  }

  render();
});

render();
