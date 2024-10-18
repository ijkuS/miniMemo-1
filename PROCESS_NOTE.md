# MiniMemo App

A memo application project with HTML, CSS, and TypeScript.
This Process Note aims to document the development process of the MiniMemo app.

## Table of contents

-    [Overview](#overview)
     -    [Goal](#goal)
-    [My process](#my-process)
     -    [Planning](#planning)
          -    [Basic interaction planning](#basic-interaction-planning)
          -    [Technical planning](#technical-planning)
     -    [Challenges and Lessons](#challenges-and-lessons)
     -    [Continued development](#continued-development)
     -    [Useful resources](#useful-resources)
-    [Author](#author)
-    [Acknowledgments](#acknowledgments)

## Overview

-    This project serves as an exercise to deepen familiarity with TypeScript and object-oriented programming (OOP).
-    A React-like component-based file structure was adopted for better maintainability, though the React library itself was not used.
-    The project is designed as a web application.

### Goal

Users should be able to:

**Must have (as a user)**

-    See all memos on the homepage
-    Add a memo with an image, a video, a note, a todo on the homepage
-    Delete each memo

**Good to have (as a user)**

-    Reorder memos with drag & drop motion
-    Filter memos by group (image / video / todo / note)
-    Edit all the memo

**Optional**

-    Search for a keyword
-    Toggle the color scheme between light and dark mode

## My process

### Planning

#### App UX/UI Planning - SPA

-    header / navbar
     -    Logo
     -    Buttons
          -    Image button (to add new Image memo)
          -    Video button (to add new Video memo)
          -    Note button (to add new Note memo)
          -    Todo button (to add new Todo memo)
     -    (Optional) Toggle button for dark mode and light mode
     -    (Optional) Search input
     -    (Optional) Login/Logout
-    main
     -    list of memos
-    footer
     -    license information

#### Basic interaction planning

-    Click Image & Video button (media-section)

     -    → popup input window (dialog)
     -    → input: title / url
     -    → add button click
     -    → update the main list on the board

-    Click Note & Todo button (text-section)

     -    → popup input window (dialog)
     -    → input: title / description(body)
     -    → add button click
     -    → update the main list on the board

-    The composition of the list of memos

     -    a memo box of media-section

          -    'delete' button
          -    Title
          -    Thumbnail of image or iframe of video

     -    a memo box of text-section
          -    'delete' button
          -    Title
          -    Body (description)

#### Technical planning

-    Semantic HTML5 markup
-    CSS custom properties
-    Mobile-first workflow
-    [TypeScript](https://www.typescriptlang.org/)

### Challenges and Lessons

#### TypeScript environment Preparation

-    tsc watch mode and init for making tsconfig.json
-    Set up tsconfig.json

`index.html` : the below information needed to work with multiple TS files

```html
<script type="module" src="./build/app.js" defer></script>
```

-    `app.ts` : app main display
     -    `class App`

#### 1. Component planning for OOP

Before starting the project, I tried to plan the basic tree of the components for its relations.

**Set up the project structure with essential files**

-    `app.ts` : app main display
     -    `class App`
-    `page.ts` : ul
     `class PageComponent`
-    `image.ts` : image list item section
     -    `class ImageComponent`

> Since PageComponent and ImageComponent are quite similar, I can make class BaseComponent that 2 components can extend(inherit)

-    `component.ts` :
     -    `class BaseComponent` & `interface Component`

> **interface Component** with BaseComponent.
>
> -    Reusability
> -    No more repeated 'template' creation and calling 'attachTo()'

Updated `page.ts`

```typescript
import { BaseComponent } from '../component.js';

export class PageComponent extends BaseComponent<HTMLUListElement> {
	constructor() {
		super(`<ul class="page">This is PageComponent</ul>`);
	}
}
```

#### 2. Use RegExp to extract videoId from URL

The following are several possible formats for YouTube URL attachments:

-    https://www.youtube.com/watch?v=videoId
-    https://youtu.be/videoId
-    https://www.youtube.com/embed/videoId

**Solution:**
By utilizing [Regular Expression](https://regexr.com/), the `videoId` can be extracted from the URL provided by users. Using the extracted `videoId`, a new URL is generated to embed the video.

-    1st option

```typescript
const regExp = /(?:youtu\.be\/|youtube\.com\/.*[?&]v=)([a-zA-Z0-9_-]{11})/;
```

-    2nd option

```typescript
const regExp =
	/^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
```
