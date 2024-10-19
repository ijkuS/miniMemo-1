import { BaseComponent, Component } from '../component.js';

export interface Composable {
	addChild(child: Component): void;
}
type OnCloseListener = () => void;

export class PageItemComponent //<li>
	extends BaseComponent<HTMLElement>
	implements Composable
{
	private closeListener?: OnCloseListener;
	constructor() {
		super(`<li class="page-item">
					<div class="page-item__controls">
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
	constructor() {
		super(`<ul class="page"></ul>`);
	}
	addChild(child: Component): void {
		const item = new PageItemComponent(); // this is not good part, refactoring later
		item.addChild(child);
		item.attachTo(this.element, 'beforeend');
		item.setOnCloseListener(() => {
			console.log('setOnCloseListner is working');
			item.removeFrom(this.element);
		});
	}
}
