# MiniMemo App 

A memo application project with HTML, CSS, and TypeScript.
This Process Note aims to document the development process of the MiniMemo app.


----
## Table of contents

- [Overview](#overview)
   - [Goal](#goal)
- [My process](#my-process)
   - [Planning](#planning)
       - [Basic interaction planning](#basic-interaction-planning)
       - [Technical planning](#technical-planning)
   - [Challenges and Lessons](#challenges-and-lessons)
   - [Continued development](#continued-development)
   - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)



## Overview 
- This project serves as an exercise to deepen familiarity with TypeScript and object-oriented programming (OOP).
- A React-like component-based file structure was adopted for better maintainability, though the React library itself was not used.
- The project is designed as a web application.

### Goal 

Users should be able to: 

**Must have (as a user)**
- See all memos on the homepage 
- Add a memo with an image, a video, a note, a todo on the homepage 
- Delete each memo

**Good to have (as a user)**
- Reorder memos with drag & drop motion  
- Filter memos by group (image / video / todo / note)
- Edit all the memo

**Optional**
- Search for a keyword
- Toggle the color scheme between light and dark mode 



## My process

### Planning 

#### App UX/UI Planning - SPA
- header / navbar 
   - Logo
   - Buttons
      - Image button (to add new Image memo) 
      - Video button (to add new Video memo) 
      - Note button (to add new Note memo) 
      - Todo button (to add new Todo memo) 
   - (Optional) Toggle button for dark mode and light mode 
   - (Optional) Search input
   - (Optional) Login/Logout 
- main
   - list of memos
- footer 
   - license information        

#### Basic interaction planning 
- Click Image & Video button (media-section)
    - → popup input window (dialog)
    - → input: title / url
    - → add button click
    - → update the main list on the board

- Click Note & Todo button (text-section)
    - → popup input window (dialog)
    - → input: title / description(body)
    - → add button click
    - → update the main list on the board

- The composition of the list of memos 
    - a memo box of media-section
       - 'delete' button 
       - Title
       - Thumbnail of image or iframe of video 

    - a memo box of text-section
       - 'delete' button 
       - Title
       - Body (description)  

#### Technical planning 

- Semantic HTML5 markup
- CSS custom properties
- Mobile-first workflow
- [TypeScript](https://www.typescriptlang.org/) 



---------

### Challenges and Lessons

#### Component planning for OOP
- Before starting the project, I tried to plan the basic tree of the components for its relations. 