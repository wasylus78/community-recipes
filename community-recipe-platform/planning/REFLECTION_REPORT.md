# Reflection Report – Community Recipe Platform

**Author:** Sebastian Robert Wierzbicki (sebastianvonzigernkorn@gmail.com)

This report reflects the individual work and challenges encountered during the IBE160 project.

## Critical Challenge Resolution (500 Internal Server Error)
The most critical challenge was the persistent 500 Internal Server Error during user registration. Diagnosis revealed a conflict with the `bcrypt` hashing library, which enforces a strict 72-byte password length limit, triggering a `ValueError`.
The resolution involved switching the hashing algorithm from `bcrypt` to the more stable and compatible **PBKDF2-SHA256** within the `passlib` context to ensure reliable user authentication.

## AI Usage and Methodology
[cite_start]The project utilized the BMAD workflow and relied heavily on AI tools (Gemini CLI) for scaffolding and prompt engineering, demonstrating the 'Vibe programming' approach[cite: 59]. [cite_start]The entire documentation process (PRD, Case Description, Prompts) was managed to provide the right context for the model[cite: 62].

## Conclusion
The project successfully implemented a functional MVP foundation while highlighting the critical need for human oversight and validation of AI-generated code (e.g., resolving the hashing conflict).
