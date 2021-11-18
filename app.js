// Utilize css transitions and class toggling to show/hide tooltip
function toggleToolTip() {
  const tooltip = document.getElementById("tooltip-root");
  tooltip.classList.toggle("show");
}

// "DocumentReady" event
document.addEventListener("DOMContentLoaded", () => {
  // Index of step with tooltip
  currStepIndex = 2;

  // Get all elements
  const progressRoot = document.getElementById("progressbar-root");
  const tooltipRoot = document.getElementById("tooltip-root");

  // Get current element in flex progress bar
  const currStepElem = progressRoot.children[currStepIndex];
  // Add class to make this element "pop out"
  currStepElem.classList.toggle("current-step");

  // Add hover events
  currStepElem.addEventListener("mouseover", toggleToolTip);
  currStepElem.addEventListener("mouseout", toggleToolTip);

  // Create flex column wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("progressbar-tooltip-wrapper");

  // Move wrapper just before our currentElem
  currStepElem.before(wrapper);
  // Make currStepElem a child of the wrapper
  wrapper.append(currStepElem);
  // Make tooltipRoot a child of the wrapper
  wrapper.append(tooltipRoot);

  // 💥 Tooltip and hover events are set
});
