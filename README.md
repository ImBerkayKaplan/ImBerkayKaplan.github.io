# ImBerkayKaplan.github.io

This repository is my web page to introduce myself and consolidate my social media profiles in one hub. You can visit this page on https://imberkaykaplan.github.io/

## Implementation

This HTML code is a personal website for Berkay Kaplan. The website is built to be responsive and contains various sections, including Homepage, About, and Contact. The layout and styling of the site rely on Bootstrap, a widely-used CSS framework, and jQuery for the interactive components.

Let's break down the code structure and its features:

- The ```<!DOCTYPE html>``` declaration specifies the document type and the HTML version used.

- The ```<html lang="en">``` tag indicates that the website's content is in English.

- The ```<head>``` tag comprises meta information and links to external stylesheets and fonts:

    - The ```<meta>``` tags offer details about the document, such as character encoding, viewport settings, and authorship.

    - The ```<link>``` tags import styles from the Google Fonts API, Bootstrap, and additional custom CSS files.

    - The ```<title>``` tag sets the title of the web page that appears in the browser's tab.

- The ```<body>``` tag contains the primary content of the web page:

    - The ```<div class="sequence">``` holds an SVG preloader animation displaying three circles while the page loads.

    - The ```<div class="logo">``` presents a "Welcome" message and a logo represented by the letter "E."

    - The ```<nav>``` element features an unordered list with three navigation links directing users to the Homepage, About, and Contact sections.

    - The ```<div class="slides">``` comprises three "slide" divs, each representing a distinct section of the webpage: Homepage, About, and Contact.

        - The Homepage slide showcases an image slider with two slides and a thumbnail navigation.

        - About slide employs a tabbed layout to display information about Berkay's background, current projects, and offerings.

        - The Contact slide provides Berkay's email address for communication.

- The ```<script>``` tags positioned at the bottom of the <body> import JavaScript libraries, including jQuery and Bootstrap, as well as custom scripts for interactivity:

    - owl.js exists for the image slider featured in the Homepage section.

    - accordations.js is for the tabbed layout presented in the About section.

    - main.js houses custom scripts that govern page behavior, such as navigation links and scrolling functionality.

- The final ```<script>``` block includes inline jQuery code that handles events like navigation clicks, scroll-to-top actions, and mobile navigation toggling.
