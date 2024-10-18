import { BaseComponent } from '../../component';
export class TodoComponent extends BaseComponent {
    constructor(title, body) {
        super(`<section class="todo">
               <div class="title-area">
                  <input type="checkbox" class="checkbox" />
                  <h2 class="todo__title"></h2>
               </div>
               <p class="todo__description"></p>
             </section>`);
        const titleElement = this.element.querySelector('.todo__title');
        titleElement.textContent = title;
        const bodyElement = this.element.querySelector('.todo__description');
        bodyElement.textContent = body;
    }
}
