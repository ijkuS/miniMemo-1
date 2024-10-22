import { BaseComponent } from '../../component.js';
import { MediaData } from '../dialog';

export class MediaSectionInput extends BaseComponent<HTMLElement> {
	constructor(initialData?: MediaData) {
		super(`<div class="media-input">
               <section class="form__container">
                  <label for="url">URL</label>
                  <input type="text" id="url" />
               </section>
               <section class="form__container">
                  <label for="title">Title</label>
                  <input type="text" id="title" />
               </section>
               <section class="form__container">
                  <label for="body">Description</label>
                  <textarea id="body"></textarea>
               </section>
             </div>`);
		// Get the input elements
		const urlInput = this.element.querySelector(
			'#url'
		)! as HTMLInputElement;
		const titleInput = this.element.querySelector(
			'#title'
		)! as HTMLInputElement;
		const bodyInput = this.element.querySelector(
			'#body'
		)! as HTMLTextAreaElement;

		// If initialData is provided (edit mode), prefill the input fields
		if (initialData) {
			urlInput.value = initialData.url;
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
	get url(): string {
		const element = this.element.querySelector(
			'#url'
		)! as HTMLInputElement;
		return element.value;
	}
}
