import { BaseComponent, Component } from '../component.js';
// import { InputDialog } from '../dialog/dialog.js';
import { EditDialog } from '../dialog/edit/edit-dialog.js';
import { editPageItem } from '../dialog/edit/editPageItem.js';
// import { EditDialog } from '../dialog/edit/dialog-edit.js';

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
						<button class="edit">Edit</button>
						<button class="close">&times</button>
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
		editBtn.onclick = () => {
			try {
				this.editListener && this.editListener(this.id);
			} catch (error) {
				console.error(
					'Something wrong on itemId or editListener',
					error
				);
			}
			// console.log('editbutton is clicked', this.id);
		};

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
	getItemKey(): string {
		return this.id;
	}
	update() {}

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
	constructor(private pageItemComponent: SectionContainerConstructor) {
		super(`<ul class="page"></ul>`);
	}
	addChild(child: Component): void {
		//const item = new PageItemComponent(); // this is not good part, refactoring later
		const item = new this.pageItemComponent();
		// 이제는 어떤 타입의 아이템이라도 인자로 받아 생성이 가능하다
		item.addChild(child);
		item.attachTo(this.element, 'beforeend');
		item.setOnCloseListener(() => {
			item.removeFrom(this.element);
		});
		item.setOnEditListener((itemId: string) => {
			// console.log(`setOnEditListener is working, itemID: ${itemId}`);
			editPageItem(itemId);

			// this.openEditDialog(itemId);
		});
	}
	openEditDialog(itemId: string) {
		// const editDialog = new EditDialog(
		// 	{ type: 'existing', id: itemId },
		// 	true
		// );
		const editDialog = new EditDialog(itemId);

		editDialog.attachTo(document.body); // Attach the dialog to the document

		editDialog.setOnSubmitListener(() => {
			editDialog.removeFrom(document.body);
		});
		editDialog.setOnCloseListener(() => {
			editDialog.removeFrom(document.body);
		});
	}
}
