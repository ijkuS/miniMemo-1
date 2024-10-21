import { BaseComponent, Component } from '../component.js';
import { Composable } from '../pages/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export type ItemId = { type: 'new' } | { type: 'existing'; id: string };

export interface MediaData {
	readonly title: string;
	readonly body: string;
	readonly url: string;
}

export interface TextData {
	readonly title: string;
	readonly body: string;
}

export class InputDialog
	extends BaseComponent<HTMLElement>
	implements Composable
{
	closeListener?: OnCloseListener;
	submitListener?: OnSubmitListener;

	protected isEditMode: boolean;

	constructor(protected itemId: ItemId, isEditMode: boolean = false) {
		super(`<dialog class="dialog">
               <div class="dialog__container">
                  <div class="dialog__controls">
                     <h2 class="memo__title"></h2>
                     <button class="close">&times</button>
                  </div>
                  <div class="dialog__body"></div>
                  <button class="submit">${isEditMode ? 'Edit' : 'Add'}</button>
               </div>
             </dialog>`);
		this.isEditMode = isEditMode; // initilize isEditmode

		const memoTitle = this.element.querySelector(
			'.memo__title'
		)! as HTMLHeadingElement;
		//set the dialog title based on whether it's a new or existing item
		if (itemId.type === 'new') {
			memoTitle.textContent = 'New memo';
		} else {
			memoTitle.textContent = 'Edit memo';
		}

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
			// this.submitListener && this.submitListener();
			// Call the correct listener based on mode

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
