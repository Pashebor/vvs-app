
class AlertPopup{
    constructor(title, message){
        this.title = title;
        this.message = message;
    }

    closePopup() {
        let popup = document.querySelector('.js-popup');
        popup.addEventListener('click', () => {
           this.style = 'opacity: 0';
           window.location.reload();
        });
    }

    popup() {
        let overlay = document.createElement('div'),
            window = document.createElement('div'),
            closeBtn = document.createElement('p'),
            modalBody = document.createElement('div'),
            btnOk = document.createElement('button');

        btnOk.className += 'btn btn-submit';
        btnOk.innerText = 'OK';
        modalBody.innerHTML = `<h2 class="popup__title">${this.title}</h2><p class="popup__message">${this.message}</p>`;
        overlay.className += 'popup-overlay js-popup';
        window.className += 'popup';
        closeBtn.className += 'popup__close js-close-popup';
        window.appendChild(closeBtn);
        window.appendChild(modalBody);
        window.appendChild(btnOk);
        overlay.appendChild(window);

        return overlay;
    }

    showPopup() {
        let body = document.querySelector('body');
        body.appendChild(this.popup());
        this.closePopup();
    }
}

export default AlertPopup;