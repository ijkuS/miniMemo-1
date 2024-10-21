import { BaseComponent, Component } from '../component.js';

export interface Composable {
	addChild(child: Component): void;
	removeChild?(child: Component): void;
}
interface SectionContainer extends Component, Composable {
	setOnCloseListener(listener: OnCloseListener): void;
}
type SectionContainerConstructor = {
	new (): SectionContainer;
	// 아무런 인자도 전달받지 않은 생성자가 있고, 생성자를 호출하면,
	// SectionContainer 인터페이스의 규격을 따라가는 인스턴스를 생성할 수 있다
};
type OnCloseListener = () => void;

export class PageItemComponent //<li>
	extends BaseComponent<HTMLElement>
	implements SectionContainer
{
	private closeListener?: OnCloseListener;
	constructor() {
		super(`<li class="page-item">
					<div class="page-item__controls">
						<button class="edit">Edit</button>
						<button class="close">&times</button>
					</div>
					<section class="page-item__body"></section>
				 </li>
	`);
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
			console.log('setOnCloseListner is working');
			item.removeFrom(this.element);
		});
	}
}
