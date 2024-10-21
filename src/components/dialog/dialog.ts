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

	constructor() {
		super(`<dialog class="dialog">
               <div class="dialog__container">
                  <div class="dialog__controls">
                     <h2 class="memo__title">New memo</h2>
                     <button class="close">&times</button>
                  </div>
                  <div class="dialog__body"></div>
                  <button class="submit">ADD</button>
               </div>
             </dialog>`);

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
