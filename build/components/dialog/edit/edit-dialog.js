import { BaseComponent } from '../../component.js';
export class EditDialog extends BaseComponent {
    constructor(itemId) {
        super(`<dialog class="dialog">
               <div class="dialog__container">
                  <div class="dialog__controls">
                     <h2 class="memo__title">Edit memo</h2>
                     <button class="close">&times</button>
                  </div>
                  <div class="dialog__body"></div>
                  <button class="submit">Edit</button>
               </div>
             </dialog>`);
        this.itemId = itemId;
        const dialogCloseBtn = this.element.querySelector('.close');
        dialogCloseBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        const submitBtn = this.element.querySelector('.submit');
        submitBtn.onclick = () => {
            this.submitListener && this.submitListener();
        };
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener) {
        this.submitListener = listener;
    }
    addChild(child) {
        const body = this.element.querySelector('.dialog__body');
        child.attachTo(body);
    }
}
