import { BaseComponent } from '../../component.js';
export class NoteComponent extends BaseComponent {
    constructor(title, body) {
        super(`<section class="note">
					<div class="text__holder">
						<h2 class="note__title"></h2>
						<p class="note__description"></p>
					</div>
            </section>`);
        const titleElement = this.element.querySelector('.note__title');
        titleElement.textContent = title;
        const bodyElement = this.element.querySelector('.note__description');
        bodyElement.textContent = body;
    }
}
