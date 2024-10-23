import { BaseComponent } from '../component.js';
import { filterExistingItems } from '../dialog/edit/filterExistingItems.js';
import { openEditDialog } from '../dialog/edit/openEditDialog.js';
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li class="page-item" id="memo-item">
						<div class="page-item__controls">
							<button class="edit" id="edit-item">
								<img src="./assets/edit_icon.svg" alt="edit-icon" />
							</button>
							<button class="close">
								<img class="close icon" src="./assets/x_icon.svg" alt="close-icon" />
							</button>
						</div>
						<section class="page-item__body"></section>
				 </li>
	`);
        this.id = `memo-${Date.now()}-${Math.floor(Math.random() * 100)}`;
        this.element.setAttribute('id', this.id);
        const editBtn = this.element.querySelector('.edit');
        editBtn.addEventListener('click', () => {
            this.editListener && this.editListener(this.id);
        });
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }
    addChild(child) {
        const container = this.element.querySelector('.page-item__body');
        child.attachTo(container);
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnEditListener(listener) {
        this.editListener = listener;
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemComponent, dialogRoot) {
        super(`<ul class="page"></ul>`);
        this.pageItemComponent = pageItemComponent;
        this.dialogRoot = dialogRoot;
    }
    addChild(child) {
        const item = new this.pageItemComponent();
        item.addChild(child);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
        item.setOnEditListener((itemId) => {
            const filteredData = filterExistingItems(itemId);
            if (!filteredData) {
                console.error('No data found to edit');
                return;
            }
            console.log(filteredData, 'this is from page.ts');
            openEditDialog(itemId, filteredData, this.dialogRoot);
        });
    }
}
