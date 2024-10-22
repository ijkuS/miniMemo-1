import { BaseComponent, Component } from '../component.js';
import { Composable } from '../pages/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
	// deleted readonly for edit feature
	title: string;
	body: string;
	url: string;
}

export interface TextData {
	title: string;
	body: string;
}

export class InputDialog
	extends BaseComponent<HTMLElement>
	implements Composable
{
	private _updatedData?: MediaData | TextData;
	closeListener?: OnCloseListener;
	submitListener?: OnSubmitListener;

	constructor(
		protected isEditMode: boolean = false, // Flag to distinguish between Add and Edit Mode
		protected initialData?: MediaData | TextData //Optional data for edit mode
	) {
		super(`<dialog class="dialog">
               <div class="dialog__container">
                  <div class="dialog__controls">
                     <h2 class="memo__title">${
						isEditMode ? 'Edit memo' : 'New memo'
					}</h2>
                     <button class="close">&times</button>
                  </div>
                  <div class="dialog__body"></div>
                  <button class="submit">${isEditMode ? 'EDIT' : 'ADD'}</button>
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
			console.log('submit button is clicked');
			this.collectUdatedData();
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

		//populate input with initial data if provided (edit mode)
		if (this.initialData) {
			const titleInput = this.element.querySelector(
				'#title'
			)! as HTMLInputElement;
			const bodyInput = this.element.querySelector(
				'#body'
			)! as HTMLTextAreaElement;

			titleInput.value = this.initialData.title;
			bodyInput.value = this.initialData.body;

			//check if the data is MediaData(ex. it has a 'url' property)
			if ('url' in this.initialData) {
				const urlInput = this.element.querySelector(
					'#url'
				)! as HTMLInputElement;
				urlInput.value = this.initialData.url;
			}
		}
	}
	// internal method to collect updated data before submission
	private collectUdatedData(): void {
		const title = (
			this.element.querySelector('#title') as HTMLInputElement
		).value;
		const body = (
			this.element.querySelector('#body') as HTMLTextAreaElement
		).value;

		if ('url' in this.initialData!) {
			const url = (
				this.element.querySelector('#url') as HTMLInputElement
			).value;
			this._updatedData = { title, body, url } as MediaData;
		} else {
			this._updatedData = { title, body } as TextData;
		}
	} // Public method to access the updated data
	getUpdatedData(): MediaData | TextData | undefined {
		return this._updatedData;
	}
}
