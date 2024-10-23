import { BaseComponent } from '../component.js';
export class InputDialog extends BaseComponent {
    constructor(isEditMode = false, initialData, updatedData) {
        super(`<dialog class="dialog">
						<div class="dialog__container">
							<div class="dialog__controls">
								<h2 class="memo__title">
									${isEditMode ? 'Edit memo' : 'New memo'}
								</h2>
								<button class="close">
									<img
										class="close icon"
										src="./assets/x_icon.svg"
										alt="close-icon" />
								</button>
							</div>
							<div class="dialog__body"></div>
							<button class="submit">${isEditMode ? 'Save' : 'Add'}</button>
						</div>
				 </dialog>`);
        this.isEditMode = isEditMode;
        this.initialData = initialData;
        this.updatedData = updatedData;
        const dialogCloseBtn = this.element.querySelector('.close');
        dialogCloseBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        const submitBtn = this.element.querySelector('.submit');
        submitBtn.addEventListener('click', () => {
            console.log('submit button is clicked');
            this.submitListener && this.submitListener();
            this.editListener && this.editListener();
        });
    }
    setOnCloseListener(listener) {
        console.log('this is from dialog');
        this.closeListener = listener;
    }
    setOnSubmitListener(listener) {
        this.submitListener = listener;
    }
    setOnEditSubmitListener(listener) {
        this.editListener = listener;
    }
    addChild(child) {
        const body = this.element.querySelector('.dialog__body');
        child.attachTo(body);
        if (this.initialData) {
            const titleInput = this.element.querySelector('#title');
            const bodyInput = this.element.querySelector('#body');
            titleInput.value = this.initialData.title;
            bodyInput.value = this.initialData.body;
            if ('url' in this.initialData) {
                const urlInput = this.element.querySelector('#url');
                urlInput.value = this.initialData.url;
            }
        }
        if (this.initialData && this.updatedData) {
            const titleInput = this.element.querySelector('#title');
            const bodyInput = this.element.querySelector('#body');
            titleInput.value = this.updatedData.title;
            bodyInput.value = this.updatedData.body;
            if ('url' in this.updatedData) {
                const urlInput = this.element.querySelector('#url');
                urlInput.value = this.updatedData.url;
            }
        }
    }
}
