import { Component } from './components/component.js';
import { InputDialog } from './components/dialog/dialog.js';
import { ImageComponent } from './components/pages/item/image.js';
import { NoteComponent } from './components/pages/item/note.js';
import { TodoComponent } from './components/pages/item/todo.js';
import { VideoComponent } from './components/pages/item/video.js';
import {
	Composable,
	PageComponent,
	PageItemComponent,
} from './components/pages/page.js';

class App {
	// private readonly page: PageComponent;
	private readonly page: Component & Composable;
	constructor(appRoot: HTMLElement) {
		this.page = new PageComponent(PageItemComponent);
		this.page.attachTo(appRoot);

		const image = new ImageComponent(
			'Image Title',
			'Image Description',
			'https://picsum.photos/600/300'
		);
		const video = new VideoComponent(
			'Video Title',
			'Video Description',
			'https://www.youtube.com/watch?v=VPpG0yy8Cbk'
		);
		const note = new NoteComponent('Note Title', 'Note Description');
		const todo = new TodoComponent('Todo Title', 'Todo Description');

		const buttonImage = document.querySelector(
			'#new-image'
		)! as HTMLButtonElement;
		buttonImage.addEventListener('click', () => {
			const dialog = new InputDialog();
			dialog.setOnCloseListener(() => {
				// 섹션 만들어서 나중에 페이지에 추가 - 나중에 구현 예정
				dialog.removeFrom(document.body);
			});
			dialog.attachTo(document.body);
		});

		this.page.addChild(image);
		// image.attachTo(appRoot, 'beforeend');
		this.page.addChild(video);
		// video.attachTo(appRoot, 'beforeend');
		this.page.addChild(note);

		this.page.addChild(todo);
	}
}
new App(document.querySelector('.document')! as HTMLElement);
