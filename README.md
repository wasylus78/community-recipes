# Community Recipe Sharing Platform

**Author:** Sebastian Robert Wierzbicki (sebastianvonzigernkorn@gmail.com)

This is a full-stack web application developed for the IBE160 Programming with AI course. The primary goal is to deliver a Minimum Viable Product (MVP) for managing and sharing recipes.

## Project Status & Key Features (MVP)
The application provides the core features required for the MVP:
1.  **User Authentication:** Secure registration and login.
2.  **Recipe CRUD:** Users can create, read, update, and delete their own recipes.
3.  **Public Browsing:** Users can view recipes shared by the community.

## Technology Stack
- **Frontend:** Next.js (React)
- **Backend:** FastAPI (Python)
- **Database:** SQLite (local file: `recipes.db`)

## Project Documentation & Artifacts (IBE160 Requirements)
This repository contains all documentation artifacts generated following the BMAD methodology:

- **`case-description.md`**: Defines the project scope, MVP features, and data requirements.
- **`planning/prd.md`**: Product Requirements Document (PRD), detailing all feature specifications.
- **`planning/REFLECTION_REPORT.md`**: Personal reflection on the development process, challenges, and critical assessment of AI usage.
- **`planning/prompts/`**: Repository of key prompts used for AI scaffolding and problem-solving (e.g., the critical fix below).

## Critical Problem Resolution: The 500 Internal Server Error

A critical bug was encountered during the development of the user authentication module: a persistent `500 Internal Server Error` during user registration.

- **Diagnosis:** The Python backend's default hashing library (`bcrypt`) enforces a strict **72-byte password length limit**, which was triggering a `ValueError` inside the application whenever a user attempted to register.
- **Resolution:** The application was modified to replace the unstable `bcrypt` hashing schema with the robust and standard **PBKDF2-SHA256** within the `passlib` library. This fix ensures reliable and secure user authentication.

---

## Instructions to Run Locally

### 1. Backend Setup (FastAPI)
1.  Navigate to the main directory: `cd community-recipe-platform`
2.  Activate virtual environment: `source venv/bin/activate`
3.  Install dependencies: `pip install "fastapi[all]" passlib`
4.  Run the server:
    ```bash
    uvicorn backend.main:app --reload
    ```

### 2. Frontend Setup (Next.js)
1.  Navigate to the frontend directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Run the development server:
    ```bash
    npm run dev
    ```
The application will be accessible at `http://localhost:3000`.
