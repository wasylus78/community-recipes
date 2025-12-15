# Reflection Report – Community Recipe Platform

This report reflects the individual work and challenges encountered during the IBE160 project.

## Progress and Key Learnings
The project utilized the BMAD workflow and AI tools (Gemini CLI) for scaffolding and prompt engineering. The main technical foundation (FastAPI Backend, Next.js Frontend) is established.

## Critical Challenge Resolution (500 Internal Server Error)
The most critical challenge was the persistent 500 Internal Server Error during user registration. Diagnosis revealed a conflict with the `bcrypt` hashing library, which enforces a strict 72-byte password length limit, triggering a `ValueError`.
The resolution involved switching the hashing algorithm from `bcrypt` to the more stable and compatible **PBKDF2-SHA256** within the `passlib` context to ensure reliable user authentication.

## Plan for Completion (MVP)
The goal is a functional MVP demonstrating User authentication, CRUD operations for recipes, and public browsing.
