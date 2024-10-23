import { BaseComponent, Component } from '../component.js';
import { filterExistingItems } from '../dialog/edit/filterExistingItems.js';
import { openEditDialog } from '../dialog/edit/openEditDialog.js';
// import { updatePageItem } from '../dialog/edit/pageItemManager';

export interface Composable {
	addChild(child: Component): void;
	removeChild?(child: Component): void;
}
interface SectionContainer extends Component, Composable {
	setOnCloseListener(listener: OnCloseListener): void;
	setOnEditListener(listener: OnEditListener): void;
}
type SectionContainerConstructor = {
	new (): SectionContainer;
	// 아무런 인자도 전달받지 않은 생성자가 있고, 생성자를 호출하면,
	// SectionContainer 인터페이스의 규격을 따라가는 인스턴스를 생성할 수 있다
};
type OnCloseListener = () => void;
type OnEditListener = (itemId: string) => void;

export class PageItemComponent //<li>
	extends BaseComponent<HTMLElement>
	implements SectionContainer
{
	private closeListener?: OnCloseListener;
	private editListener?: OnEditListener;
	private readonly id: string;

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

		// Connect editListener to Edit button
		const editBtn = this.element.querySelector(
			'.edit'
		)! as HTMLButtonElement;

		editBtn.addEventListener('click', () => {
			this.editListener && this.editListener(this.id);
		});
		const closeBtn = this.element.querySelector(
			'.close'
		)! as HTMLButtonElement;
		closeBtn.onclick = () => {
			this.closeListener && this.closeListener();
		};
	}
	addChild(child: Component) {
		const container = this.element.querySelector(
			'.page-item__body'
		)! as HTMLElement;
		child.attachTo(container);
	}

	setOnCloseListener(listener: OnCloseListener) {
		this.closeListener = listener;
	}
	setOnEditListener(listener: OnEditListener) {
		this.editListener = listener;
	}
}

export class PageComponent // <ul>
	extends BaseComponent<HTMLUListElement>
	implements Composable
{
	constructor(
		private pageItemComponent: SectionContainerConstructor,
		protected dialogRoot: HTMLElement
	) {
		super(`<ul class="page"></ul>`);
	}
	addChild(child: Component): void {
		const item = new this.pageItemComponent();
		item.addChild(child);
		item.attachTo(this.element, 'beforeend');

		item.setOnCloseListener(() => {
			item.removeFrom(this.element);
		});
		item.setOnEditListener((itemId: string) => {
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
