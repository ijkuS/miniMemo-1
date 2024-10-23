import { BaseComponent } from '../../component.js';
export class MediaSectionInput extends BaseComponent {
    constructor(initialData) {
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
        const urlInput = this.element.querySelector('#url');
        const titleInput = this.element.querySelector('#title');
        const bodyInput = this.element.querySelector('#body');
        if (initialData) {
            urlInput.value = initialData.url;
            titleInput.value = initialData.title;
            bodyInput.value = initialData.body;
        }
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get body() {
        const element = this.element.querySelector('#body');
        return element.value;
    }
    get url() {
        const element = this.element.querySelector('#url');
        return element.value;
    }
}
