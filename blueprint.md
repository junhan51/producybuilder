# Project Blueprint

## Overview

A web application for "Looksmax" analysis. Users can upload a photo and enter their height and weight to get feedback on their appearance from OpenAI's GPT-4 Vision model.

## Implemented Features

- **Initial project setup with React and Vite.**
- **Modern UI/UX:**
    - A "glassmorphism" design with semi-transparent, blurred backgrounds.
    - An animated gradient background for a dynamic feel.
    - Custom-styled Material-UI components (buttons, text fields, etc.).
    - Modern typography with the "Poppins" font from Google Fonts.
- **Looksmax Input Screen:**
    - A modern, dark-themed UI for user inputs.
    - Fields for photo upload, height (cm), and weight (kg).
- **OpenAI Integration:**
    - A Cloudflare Pages Function (`/functions/analyze.ts`) that securely calls the OpenAI API.
    - Frontend logic to send user data to the Cloudflare Function and display the analysis.
    - Loading and error states to provide user feedback.

## Current Plan

- **[Completed]** Redesign the UI to be more modern and visually appealing.
- **[Completed]** Implement a "glassmorphism" effect for the main form.
- **[Completed]** Add a dynamic gradient background.
- **[Completed]** Integrate a custom font and color palette.

## Next Steps

- **Deployment:** To test the full functionality, the project needs to be deployed to Cloudflare Pages.
- **API Key:** An `OPENAI_API_KEY` environment variable must be set in the Cloudflare Pages project settings.