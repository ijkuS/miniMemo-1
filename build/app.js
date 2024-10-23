import { bindElementToDialog } from './components/dialog/bindElementToDialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/pages/item/image.js';
import { NoteComponent } from './components/pages/item/note.js';
import { TodoComponent } from './components/pages/item/todo.js';
import { VideoComponent } from './components/pages/item/video.js';
import { PageComponent, PageItemComponent, } from './components/pages/page.js';
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent, this.dialogRoot);
        this.page.attachTo(appRoot);
        const mockupData1 = new ImageComponent('across the universe', 'Images of broken light which dance before me like a million eyes. They call me on and on across the universe', 'https://images.unsplash.com/photo-1531700910244-05f8c922877b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        const mockupData2 = new NoteComponent('Nostalgia in CityPop in 1980s', 'In the bustling metropolis of Tokyo, where the neon lights flicker and the streets are alive with energy, City Pop serves as the soundtrack to life in the big city.');
        const mockupData3 = new VideoComponent('A rainy night in Tokyo', 'Take a lyrical journey through the vibrant streets of Tokyo with Japanese City Pop music.', 'https://www.youtube.com/watch?v=wxnsKBFsPTU');
        const mockupData4 = new TodoComponent('Team meeting 2pm', 'Prepare to show design references');
        const mockupData5 = new TodoComponent('Dentist 5pm', 'near the city hall');
        this.page.addChild(mockupData1);
        this.page.addChild(mockupData2);
        this.page.addChild(mockupData3);
        this.page.addChild(mockupData4);
        this.page.addChild(mockupData5);
        bindElementToDialog('#new-image', MediaSectionInput, (input) => new ImageComponent(input.title, input.body, input.url), this.page);
        bindElementToDialog('#new-video', MediaSectionInput, (input) => new VideoComponent(input.title, input.body, input.url), this.page);
        bindElementToDialog('#new-note', TextSectionInput, (input) => new NoteComponent(input.title, input.body), this.page);
        bindElementToDialog('#new-todo', TextSectionInput, (input) => new TodoComponent(input.title, input.body), this.page);
    }
}
new App(document.querySelector('.document'), document.body);
