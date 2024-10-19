import { ImageComponent } from './components/pages/item/image.js';
import { NoteComponent } from './components/pages/item/note.js';
import { TodoComponent } from './components/pages/item/todo.js';
import { VideoComponent } from './components/pages/item/video.js';
import { PageComponent } from './components/pages/page.js';

class App {
	private readonly page: PageComponent;
	constructor(appRoot: HTMLElement) {
		this.page = new PageComponent();
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

		this.page.addChild(image);
		// image.attachTo(appRoot, 'beforeend');
		this.page.addChild(video);
		// video.attachTo(appRoot, 'beforeend');
		this.page.addChild(note);

		this.page.addChild(todo);
	}
}
new App(document.querySelector('.document')! as HTMLElement);
