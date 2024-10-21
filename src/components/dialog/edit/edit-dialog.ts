import { BaseComponent, Component } from '../../component.js';
import { Composable } from '../../pages/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

// export type ItemId = { type: 'new' } | { type: 'existing'; id: string };

export class EditDialog
	extends BaseComponent<HTMLElement>
	implements Composable
{
	closeListener?: OnCloseListener;
	submitListener?: OnSubmitListener;

	// protected isEditMode: boolean;

	constructor(protected itemId: string) {
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
		// this.isEditMode = isEditMode; // initilize isEditmode

		const dialogCloseBtn = this.element.querySelector(
			'.close'
		)! as HTMLButtonElement;
		dialogCloseBtn.onclick = () => {
			this.closeListener && this.closeListener();
		};
		const submitBtn = this.element.querySelector(
			'.submit'
		)! as HTMLButtonElement;
		submitBtn.onclick = () => {
			this.submitListener && this.submitListener();
		};
	}
	setOnCloseListener(listener: OnCloseListener) {
		this.closeListener = listener;
	}
	setOnSubmitListener(listener: OnSubmitListener) {
		this.submitListener = listener;
	}

	addChild(child: Component): void {
		const body = this.element.querySelector(
			'.dialog__body'
		)! as HTMLElement;
		child.attachTo(body);
	}
}
