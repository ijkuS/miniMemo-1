import { Component } from '../component.js';
import { InputDialog } from './dialog.js';

export type InputComponentConstructor<T extends Component> = {
	new (): T;
};

export function bindElementToDialog<T extends Component>(
	selector: string,
	InputComponent: InputComponentConstructor<T>,
	createComponent: (input: T) => Component,
	page: { addChild(child: Component): void }
	// page object that can add a new Component as a child
) {
	const button = document.querySelector(selector)! as HTMLButtonElement;
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

// bindElementToDialog<T extends (MediaData | TextData) & Component>(
//    selector: string,
//    InputComponent: InputComponentConstructor<T>,
//    createComponent: (input: T) => Component,
//    existingComponent?: Component,
//    initialData?: T extends MediaData ? MediaData : TextData
// ) {
//    const button = document.querySelector(selector)! as HTMLButtonElement;
//    button.addEventListener('click', () => {
//       // set edit mode if existingComponent is provided
//       const dialog = new InputDialog(!!existingComponent, initialData);

//       const inputSection = new InputComponent(initialData);
//       dialog.addChild(inputSection);

//       dialog.setOnCloseListener(() => {
//          dialog.removeFrom(this.dialogRoot);
//       });
//       dialog.setOnSubmitListener(() => {
//          const createdComponent = createComponent(inputSection);
//          this.page.addChild(createdComponent);
//          dialog.removeFrom(this.dialogRoot);
//       });

//       dialog.attachTo(this.dialogRoot);
//    });
// }