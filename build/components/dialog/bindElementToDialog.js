import { InputDialog } from './dialog.js';
export function bindElementToDialog(selector, InputComponent, createComponent, page) {
    const button = document.querySelector(selector);
    button.addEventListener('click', () => {
        const dialog = new InputDialog();
        const inputSection = new InputComponent();
        dialog.addChild(inputSection);
        dialog.setOnCloseListener(() => {
            dialog.removeFrom(document.body);
        });
        dialog.setOnSubmitListener(() => {
            const createdComponent = createComponent(inputSection);
            page.addChild(createdComponent);
            dialog.removeFrom(document.body);
        });
        dialog.attachTo(document.body);
    });
}
