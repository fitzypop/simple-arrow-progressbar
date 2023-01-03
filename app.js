class Progressbar {
  #currStepIndex = 0;
  #currStepElem = null;
  #tooltipRoot = null;
  #progressbarRoot = null;
  #wrapper = null;

  constructor(index=1){
    this.#currStepIndex = index;
    // Get all elements
    this.#progressbarRoot = document.getElementById("progressbar-root");
    this.#tooltipRoot = document.getElementById("tooltip-root");

    // Get current element in flex progress bar
    this.#currStepElem = this.#progressbarRoot.children[this.#currStepIndex];
    this.moveElems();
  }

  toggleToolTip() {
    // const tooltip = document.getElementById("tooltip-root");
    this.#tooltipRoot.classList.toggle("show");
  }

  moveElems() {
    this.#currStepElem.classList.toggle("current-step");

    // Add hover events
    this.#currStepElem.addEventListener("mouseover", this.toggleToolTip.bind(this), { passive: true });
    this.#currStepElem.addEventListener("mouseout", this.toggleToolTip.bind(this), { passive: true });

    // Create flex column wrapper
    if (!this.#wrapper) {
      this.#wrapper = document.getElementById("tooltip-column-wrapper");
      if (!this.#wrapper) {
        this.#wrapper = document.createElement("div");
        this.#wrapper.id = "tooltip-column-wrapper";
      }
    }

    // Move wrapper just before our currentElem
    this.#currStepElem.before(this.#wrapper);
    // Make currStepElem a child of the wrapper
    this.#wrapper.append(this.#currStepElem);
    // Make tooltipRoot a child of the wrapper
    this.#wrapper.append(this.#tooltipRoot);

    // 💥 Tooltip and hover events are set
  }
}




// "DocumentReady" event
document.addEventListener("DOMContentLoaded", () => {
  const progressbar = new Progressbar();
});
