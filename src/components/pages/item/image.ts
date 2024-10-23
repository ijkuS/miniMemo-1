import { BaseComponent } from '../../component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
	constructor(title: string, body: string, url: string) {
		super(`<section class="image">
               <div class="image__holder">
                  <img class="image__thumbnail" />
               </div>
					<div class="text__holder">
						<h2 class="image__title"></h2>
						<p class="image__description"></p>
					</div>
             </section>`);
		const imageElement = this.element.querySelector(
			'.image__thumbnail'
		)! as HTMLImageElement;
		imageElement.src = url;
		imageElement.alt = title;

		const titleElement = this.element.querySelector(
			'.image__title'
		)! as HTMLHeadingElement;
		titleElement.textContent = title;

		const bodyElement = this.element.querySelector(
			'.image__description'
		)! as HTMLParagraphElement; // 
		bodyElement.textContent = body;
	}
}
