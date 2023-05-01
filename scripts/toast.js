const ToastType = {
    Danger: "#eb3b5a",
    Warning: "#fdcb6e",
    Succes: "#00b894",
}

class Toast {
    constructor(message, color, time) {
        log('Constructor', message)
        this.message = message;
        this.color = color;
        this.time = time;
        this.element = null;
        const element = document.createElement('div');
        element.className = "toast toast--yellow";
        this.element = element;

        element.innerHTML +=
            `<div class="toast__icon">
            <svg version="1.1" class="toast__svg" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 301.691 301.691"
              style="enable-background:new 0 0 301.691 301.691;" xml:space="preserve">
              <g>
                <polygon points="119.151,0 129.6,218.406 172.06,218.406 182.54,0  "></polygon>
                <rect x="130.563" y="261.168" width="40.525" height="40.523"></rect>
              </g>
            </svg>
          </div>`

        element.innerHTML +=
            `<div class="toast__content">
                <p class="toast__type">Warning</p>
                <p class="toast__message">${message}</p>
            </div>`

        document.body.appendChild(element);

        setTimeout(function () {
            element.remove();
        }, this.time);

        element.addEventListener("click", () => {
            element.remove();
        })
        log('Closed')
    }

    static raiseToast(message, duration = 5000) {
        return new Toast(message, ToastType.Danger, duration)
    }
}