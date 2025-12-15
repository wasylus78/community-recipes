# Product Requirements Document (PRD) - Community Recipe Platform MVP

**Author:** Sebastian Robert Wierzbicki (sebastianvonzigernkorn@gmail.com)
**Date:** $(date +"%Y-%m-%d")
**Version:** 1.0

## 1. Goal
The primary goal is to launch a Minimum Viable Product (MVP) that allows users to securely manage their personal recipe collection and share them with the public community, demonstrating effective AI-assisted development.

## 2. Scope (Must Have - MVP)
The MVP covers: User Registration/Login, CRUD operations for personal recipes, and browsing public recipes.

### Key Fix Included in Release
The critical 500 Internal Server Error during user registration was resolved by replacing the insecure/failing `bcrypt` hashing schema with the robust **PBKDF2-SHA256** algorithm in `backend/utils.py`.

## 3. Technology Stack
- **Backend:** FastAPI (Python)
- **Frontend:** Next.js (React)
- **Database:** SQLite (local file: `recipes.db`)

## 4. Documentation Artifacts
All planning is documented in the repository as required by the IBE160 course:
- Case Description (`case-description.md`)
- Reflection Report (`planning/REFLECTION_REPORT.md`)
- Prompts (`planning/prompts/`)
