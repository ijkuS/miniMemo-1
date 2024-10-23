import { BaseComponent } from '../../component.js';
export class TextSectionInput extends BaseComponent {
    constructor(initialData, updatedData) {
        super(`<div class="text-input">
               <section class="form__container">
                  <label for="title">Title</label>
                  <input type="text" id="title" />
               </section>
               <section class="form__container">
                  <label for="body">Description</label>
                  <textarea id="body"></textarea>
               </section>
             </div>`);
        const titleInput = this.element.querySelector('#title');
        const bodyInput = this.element.querySelector('#body');
        if (initialData) {
            titleInput.value = initialData.title;
            bodyInput.value = initialData.body;
        }
        if (updatedData) {
            titleInput.value = updatedData.title;
            bodyInput.value = updatedData.title;
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
}
