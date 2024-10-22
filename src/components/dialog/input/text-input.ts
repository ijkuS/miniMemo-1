import { BaseComponent } from '../../component.js';
import { TextData } from '../dialog';

export class TextSectionInput extends BaseComponent<HTMLElement> {
	constructor(initialData?: TextData) {
		super(`<div class="text-input">
               <section class="form__container">
                  <label for="title">Title</label>
                  <input type="text" id="title" />
               </section>
               <section class="form__container">
                  <label for="body">Description</label>
                  <textarea id="body"></textarea>
               </section>
             </div>`);

		const titleInput = this.element.querySelector(
			'#title'
		)! as HTMLInputElement;
		const bodyInput = this.element.querySelector(
			'#body'
		)! as HTMLTextAreaElement;

		// If initialData is provided (edit mode), prefill the input fields
		if (initialData) {
			titleInput.value = initialData.title;
			bodyInput.value = initialData.body;
		}
	}
	get title(): string {
		const element = this.element.querySelector(
			'#title'
		)! as HTMLInputElement;
		return element.value;
	}
	get body(): string {
		const element = this.element.querySelector(
			'#body'
		)! as HTMLInputElement;
		return element.value;
	}
}
