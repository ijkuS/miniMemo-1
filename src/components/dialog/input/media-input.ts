import { BaseComponent } from '../../component.js';

export class MediaSectionInput extends BaseComponent<HTMLElement> {
	constructor() {
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
