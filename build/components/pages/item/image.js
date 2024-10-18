import { BaseComponent } from '../../component.js';
export class ImageComponent extends BaseComponent {
    constructor(title, body, url) {
        super(`<section class="image">
               <div class="image__holder">
                  <img class="image__thumbnail" />
               </div>
               <h2 class="image__title"></h2>
               <p class="image__description"></p>
             </section>`);
        const imageElement = this.element.querySelector('.image__thumbnail');
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = this.element.querySelector('.image__title');
        titleElement.textContent = title;
        const bodyElement = this.element.querySelector('.image__description');
        bodyElement.textContent = body;
    }
}
