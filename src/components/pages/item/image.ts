export class ImageComponent {
	private element: HTMLElement;
	constructor(title: string, body: string, url: string) {
		const template = document.createElement('template');
		template.innerHTML = `<section class="image">
                                 <div class="image__holder">
                                    <img class="image__thumbnail" />
                                 </div>
                                 <h2 class="image__title"></h2>
                                 <p class="image__description"></p>
                            </section>`;
		this.element = template.content.firstElementChild! as HTMLElement;
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
		)! as HTMLHeadingElement;
		bodyElement.textContent = body;
	}
	attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
		parent.insertAdjacentElement(position, this.element);
	}
}
