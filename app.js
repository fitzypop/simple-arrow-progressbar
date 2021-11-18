// Utilize css transitions and class toggling to show/hide tooltip
let currStepIndex = 1;
let currStepElem = null;
let tooltipRoot = null;
let progressbarRoot = null;
let wrapper = null;

function toggleToolTip() {
  const tooltip = document.getElementById("tooltip-root");
  tooltip.classList.toggle("show");
}

function removeOldStep(elem) {
  elem.classList.toggle("current-step");
  elem.removeEventListener("mouseover", toggleToolTip);
  elem.removeEventListener("mouseout", toggleToolTip);

  progressbarRoot.insertBefore(elem, wrapper)
  wrapper.removeChild(tooltipRoot);
  progressbarRoot.removeChild(wrapper);
}

function setCurrentStep(num) {
  num -= 1;
  if (currStepIndex === num) {
    console.log("same step selected")
    return;
  }
  else if (progressbarRoot.children.length <= num) {
    console.log("not enough steps");
    return;
  }

  if (currStepElem) {
    removeOldStep(currStepElem);
  }

  currStepIndex = num;
  currStepElem = progressbarRoot.children[currStepIndex];
  moveElems(currStepElem, tooltipRoot);
}

function moveElems(elem, tooltipElem) {
  elem.classList.toggle("current-step");

  // Add hover events
  elem.addEventListener("mouseover", toggleToolTip, { passive: true });
  elem.addEventListener("mouseout", toggleToolTip, { passive: true });

  // Create flex column wrapper
  if (!wrapper) {
    wrapper = document.getElementById("tooltip-column-wrapper");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "tooltip-column-wrapper";
    }
  }

  // Move wrapper just before our currentElem
  elem.before(wrapper);
  // Make currStepElem a child of the wrapper
  wrapper.append(elem);
  // Make tooltipRoot a child of the wrapper
  wrapper.append(tooltipElem);

  // 💥 Tooltip and hover events are set
}

// "DocumentReady" event
document.addEventListener("DOMContentLoaded", () => {
  // Get all elements
  progressbarRoot = document.getElementById("progressbar-root");
  tooltipRoot = document.getElementById("tooltip-root");

  // Get current element in flex progress bar
  currStepElem = progressbarRoot.children[currStepIndex];
  moveElems(currStepElem, tooltipRoot);
});
