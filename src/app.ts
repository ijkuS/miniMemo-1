import { ImageComponent } from './components/pages/item/image';
import { PageComponent } from './components/pages/page.js';

class App {
	private readonly page: PageComponent;
	constructor(appRoot: HTMLElement) {
		this.page = new PageComponent();
		this.page.attachTo(appRoot);

		const image = new ImageComponent(
			'Image Title',
			'Image Description',
			'https://picsum.photos/600/300'
		);
		image.attachTo(appRoot, 'beforeend');
	}
}
new App(document.querySelector('.document')! as HTMLElement);
