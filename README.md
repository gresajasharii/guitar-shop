# Online Guitar Shop


A three page React + TypeScript app that lets you browse guitar brands, view models per brand, and see model details (specs & musicians).  
Data comes from a public GraphQL API and is fetched with pollo Client.  
Design follows the provided Figma and includes a language switcher (EN/SQ) in the footer.

# Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation and Setup](#installation-and-setup)
   - [Frontend Setup](#frontend-setup)
4. [Project Structure](#project-structure)
5. [Hosting](#hosting)



# Features

- **Page 1 - Brands:** - Fetch and display all brands (name, origin, logo). Click a brand, navigates to its Models page. 
- **Page 2 - Models:** - Search by model name (server-side; debounced). 
- **Filter** by guitar type (Electric/Acoustic/Bass). Click a model, navigates to Guitar Details. 
- **Page 3 - Guitar Details:** - Hero image + meta (type, price, description). 
- **Tabs**: *Specs* and *Musicians*. 
- **Musicians** show 2 at a time with dots/buttons to reveal 2 more. 
- **Language switcher** (English/Albanian) in the footer.


# Technologies Used

### Frontend - **React** (Vite) + **TypeScript** 
- **Apollo Client** (GraphQL) 
- **React Router** 
- **CSS** 

> No backend for this repo; the app consumes the public GraphQL API above.

# Installation and Setup

Ensure you have the following installed on your system:

- **Node.js (v16 or later)**
- **npm (Node Package Manager)**

1. Clone the Repository: git clone:    
https://github.com/gresajasharii/guitar-shop


# Installation

### Project setup

- **cd ../online-guitar-shop**
- **npm install**
- **npm run dev**

- **The app will be available at http://localhost:5174**


# Project Structure


- **Routing:**
- Brands.tsx
- Models.tsx
- GuitarDetails.tsx

- **Data Flow:**
- All data fetched via **Apollo Client** from `https://graphql-api-brown.vercel.app/api/graphql`
- Queries live in `src/graphql/*`
- Global Apollo provider is created in `src/apollo/client.ts` and mounted in `main.tsx`.

- **Styling:**
- Plain CSS in `index.css` following the provided Figma (hero, grids, cards, tabs, footer).

- **i18n:**
- `I18nProvider` + `useI18n()` in `src/i18n/i18n.tsx`
- Strings in `src/i18n/strings.ts` (EN/SQ)
- Footer language select updates the language (persisted in `localStorage`).

# Hosting

[The project is hosted on: ](https://guitar-shop-xi.vercel.app/)
