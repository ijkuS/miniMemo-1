import { BaseComponent } from '../../component';

export class NoteComponent extends BaseComponent<HTMLElement> {
	constructor(title: string, body: string) {
		super(`<section class="note">
               <h2 class="note__title"></h2>
               <p class="note__description"></p>
            </section>`);

		const titleElement = this.element.querySelector(
			'.note__title'
		)! as HTMLHeadingElement;
		titleElement.textContent = title;

		const bodyElement = this.element.querySelector(
			'.note__description'
		)! as HTMLParagraphElement;
		bodyElement.textContent = body;
	}
}
