# react-colour-contrast

![experience with React](https://img.shields.io/badge/experience-react-blue.svg?style=flat)
![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)

A relatively simple React app for displaying a table of HTML colour combinations, along with their contrast values.

## Purposes of the project

- An idea for a tool I would potentially find useful, as someone concerned about web site accessibility.
- A demonstration of how someone with very little React experience (I *did* compete a Udemy course) could use their existing JavaScript/TypeScript experience (primarily using Angular) to build an app.
- A demonstration of how a "simple" app can be divided into components.
- Hopefully useful toward overcoming the age-old hurdle of not having enough "experience" to gain "experience".

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Objectives of the project

- User provides a list of hex colour codes.
- A two-dimensional table is generated from the provided colour codes.
- Each cell in the table corresponds with a background and foreground colour.
- Each cell also displays the respective colour contrast score.
- Indicate which combinations are NOT web-safe:
	- for WC3G AA level
	- for WC3G AAA level
	- considering text sizes.

### A Happy Accident
As well as entering a plain list of 3- or 6-letter hex codes, pasting the contents of a stylesheet will use the HTML colour codes found within it.

## Improvements You Can Make

### Functionality
- Add support for rgb()-format colours. (Some tools - sites or people - will sometimes provide colours in this format.)
- Add support for named colours (lightgrey/lightgray, aliceblue etc.).
- An option to set a custom contrast threshold.
- Export a list of safe colour combinations, based on the chosen settings.

### Aesthetics
- Use something other than Bootstrap for the user interface.
- A more attractive/conducive layout for mobile devices. (Would anyone use a tool like this on a mobile device?)
- A desktop/tablet layout that prevents scrolling outside of the table area.