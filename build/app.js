import { ImageComponent } from './components/pages/item/image.js';
import { PageComponent } from './components/pages/page.js';
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent('Image Title', 'Image Description', 'https://picsum.photos/600/300');
        image.attachTo(appRoot, 'beforeend');
    }
}
new App(document.querySelector('.document'));
