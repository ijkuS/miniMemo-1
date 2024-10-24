
import { BaseComponent } from '../../component.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
	constructor(title: string, body: string) {
		super(`<section class="todo">
					<div class="text__holder">
						<div class="title-area">
							<input type="checkbox" class="checkbox" />
							<h2 class="todo__title"></h2>
						</div>
						<p class="todo__description"></p>
					</div>
             </section>`);

		const titleElement = this.element.querySelector(
			'.todo__title'
		)! as HTMLHeadingElement;
		titleElement.textContent = title;

		const bodyElement = this.element.querySelector(
			'.todo__description'
		)! as HTMLParagraphElement;
		bodyElement.textContent = body;
	}
}
