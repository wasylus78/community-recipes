# Key Prompts Used for AI-Assisted Development (Gemini CLI)

## 1. Initial Full-Stack Scaffolding (Vibe Programming)
Generate a full-stack web application for the 'Community Recipe Sharing Platform'. The stack must be: Backend: Python FastAPI; Frontend: Next.js (React). The MVP must include: JWT-based user authentication and CRUD endpoints for the 'Recipe' entity.

## 2. Critical Bug Fix Prompt (500 Internal Server Error)
I am experiencing a 500 Internal Server Error (ValueError: password cannot be longer than 72 bytes) during user registration using bcrypt. Provide the complete, corrected code for backend/utils.py that uses the PBKDF2-SHA256 algorithm from 'passlib' to resolve this issue, ensuring get_password_hash and verify_password functions work correctly.
