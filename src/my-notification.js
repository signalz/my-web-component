const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    button {
      position: relative;
      display: inline-block;
      cursor: pointer;
      white-space: nowrap;
      width: fit-content;
      border: none;
      background-color: white;

      > #notification-count {
        font-family: Roboto;
        font-size: 10px;
        font-weight: 700;
        line-height: 12px;
        letter-spacing: 0px;
        text-align: center;
        background-color: #E03C31;
        color: white;
        padding: 2px;
        position: absolute;
        border-radius: 4px;
        height: 16px;
        min-width: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 24px;
        top: 0;
      }

      > div {
        height: 200px;
        width: 200px;
        background-color: blue;
        position: absolute;
        left: 0;
        top: 48px;
        display: none;
      }
    }

    button:hover {
      background-color: #F2F2F2;
    }

    .button-md {
      height: 48px;
      padding: 12px;
      border-radius: 8px;

      > svg {
        font-size: 24px;
      }
    }

    .button-sm {
      height: 32px;
      padding: 8px;
      border-radius: 4px;

      > svg {
        font-size: 16px;
      }
    }
  </style>
  <button id="button">
    <div id="notification-count"></div>
    <svg id="svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M12 2.75C8.67748 2.75 6 5.40774 6 8.66667C6 11.0037 5.41084 13.3133 4.83562 15.0176C4.59743 15.7234 4.35919 16.3324 4.16095 16.8056H19.8391C19.6408 16.3324 19.4026 15.7234 19.1644 15.0176C18.5892 13.3133 18 11.0037 18 8.66667C18 5.40774 15.3225 2.75 12 2.75ZM21.6692 17.217C21.7868 17.4495 21.7754 17.7263 21.639 17.9483C21.5025 18.1703 21.2606 18.3056 21 18.3056H16.125V18.6667C16.125 20.9306 14.2694 22.75 12 22.75C9.73064 22.75 7.875 20.9306 7.875 18.6667V18.3056H3C2.7394 18.3056 2.49748 18.1703 2.36103 17.9483C2.22463 17.7263 2.21317 17.4495 2.33073 17.2171L3 17.2171M2.33073 17.2171L2.33142 17.2157L2.33516 17.2082L2.35176 17.1746C2.36674 17.144 2.38937 17.0973 2.41857 17.0355C2.47696 16.9119 2.56152 16.7282 2.66355 16.4931C2.86776 16.0225 3.14103 15.3479 3.41438 14.5379C3.96416 12.909 4.5 10.774 4.5 8.66667C4.5 4.5618 7.86668 1.25 12 1.25C16.1333 1.25 19.5 4.5618 19.5 8.66667C19.5 10.774 20.0358 12.909 20.5856 14.5379C20.859 15.3479 21.1322 16.0225 21.3365 16.4931C21.4385 16.7282 21.523 16.9119 21.5814 17.0355C21.6106 17.0973 21.6333 17.144 21.6482 17.1746L21.6648 17.2082L21.6686 17.2157L21.6692 17.217M9.375 18.3056V18.6667C9.375 20.0846 10.5414 21.25 12 21.25C13.4586 21.25 14.625 20.0846 14.625 18.6667V18.3056H9.375Z"
      fill="#2C2C2C" />
    </svg>
    <div id="notification-list">Notification list</div>
  </button>`;

const RANDOM_ARRAY = [0, 1, 10, 50, 99, 100];

class MyNotification extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.notification = 0;
    this.open = false;
    this.shadowRoot.getElementById("button").onclick = () => this.toggle();
    fetch(
      "https://test.propertyguru.vn/microservice-architecture-router/Systems/Account/GetNotificationCount"
    )
      .then((res) => res.json())
      .then((res) => {
        this.notification = res;
        // this.notification = RANDOM_ARRAY[Math.floor(Math.random() * 5)];
        this.update(this.notification);
      })
      .catch((e) => console.log(e));
  }

  connectedCallback() {
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["size"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.shadowRoot.getElementById("button").className = `button-${
        newVal || "md"
      }`;
    }
  }

  update(notification) {
    console.log(notification);
    if (notification === 0) {
      this.shadowRoot.getElementById("notification-count").remove();
      return;
    }
    let converted = notification;
    if (notification > 99) {
      converted = "99+";
    }
    this.shadowRoot.getElementById("notification-count").innerHTML = converted;
  }

  toggle() {
    this.open = !this.open;
    this.shadowRoot.getElementById("notification-list").style.display = this
      .open
      ? "flex"
      : "none";
  }
}

customElements.define("my-notification", MyNotification);
