import { BaseComponent, Component } from '../component.js';
import { Composable } from '../pages/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;
type OnEditSubmitListener = () => void;

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
	closeListener?: OnCloseListener;
	submitListener?: OnSubmitListener;
	editListener?: OnEditSubmitListener; //edit dialog's submit button이 눌리면 알려줘

	constructor(
		protected isEditMode: boolean = false, // Flag to distinguish between Add and Edit Mode
		protected initialData?: MediaData | TextData, //Optional data for edit mode
		protected updatedData?: MediaData | TextData
	) {
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

		const dialogCloseBtn = this.element.querySelector(
			'.close'
		)! as HTMLButtonElement;
		dialogCloseBtn.onclick = () => {
			this.closeListener && this.closeListener();
		};
		const submitBtn = this.element.querySelector(
			'.submit'
		)! as HTMLButtonElement;
		submitBtn.addEventListener('click', () => {
			console.log('submit button is clicked');
			// this.collectUpdatedData();
			this.submitListener && this.submitListener();
			this.editListener && this.editListener();
		});
	}
	setOnCloseListener(listener: OnCloseListener) {
		console.log('this is from dialog');
		this.closeListener = listener;
	}
	setOnSubmitListener(listener: OnSubmitListener) {
		this.submitListener = listener;
	}
	setOnEditSubmitListener(listener: OnEditSubmitListener) {
		this.editListener = listener;
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
		if (this.initialData && this.updatedData) {
			const titleInput = this.element.querySelector(
				'#title'
			)! as HTMLInputElement;
			const bodyInput = this.element.querySelector(
				'#body'
			)! as HTMLTextAreaElement;
			titleInput.value = this.updatedData.title;
			bodyInput.value = this.updatedData.body;

			if ('url' in this.updatedData) {
				const urlInput = this.element.querySelector(
					'#url'
				)! as HTMLInputElement;
				urlInput.value = this.updatedData.url;
			}
		}
	}
}
