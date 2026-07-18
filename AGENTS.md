# Project Rules

This document defines the coding standards and architectural patterns for the `www` and `backend` projects within this monorepo.

---

## Backend Project (NestJS)

### Architecture Patterns
- **Hexagonal/Clean Architecture**:
  - `src/domain`: Domain entities and repository interfaces.
  - `src/application`: Use Cases (all business logic MUST live here), DTOs, and Mappers.
  - `src/infrastructure`: Framework-specific implementations (TypeORM entities, repositories, migrations, cache, etc.).
- **Persistence**: Use TypeORM with PostgreSQL. Always use migrations for schema changes.
- **Security**:
  - Use **Argon2** for password hashing.
  - Standardize on **JWT** authentication delivered via secure cookies.

### Domain-Specific Rules


---

## Frontend Project (Vite + React)

### UI & UX Standards
- **Component Library**: [Mantine v7](https://mantine.dev/).
- **Design Philosophy**:
  - High-quality aesthetics with dark mode support.
  - Use vibrant accent colors and glassmorphism where appropriate.
  - Implement smooth transitions, micro-animations, and interactive hover effects.

### Technical Stack
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based routing).
  - Use `_authenticated.tsx` and `_public.tsx` layouts for access control.
- **State & Data Fetching**: [TanStack Query](https://tanstack.com/query).
  - Organize logic into `src/queries` and `src/mutations`.
- **Forms**: [React Hook Form](https://react-hook-form.com/) combined with [Zod](https://zod.dev/) for schema validation.

---

## General Guidelines
- Use **yarn** for package management.
- Ensure all new features are covered by basic unit tests.

---

## Clean Code Core Principles

1. KISS (Keep It Simple, Stupid): Always aim for the simplest possible solution and avoid unnecessary complications.
DRY (Don’t Repeat Yourself): Avoid duplicating code by extracting common logic into reusable functions or classes.
SRP (Single Responsibility Principle): Each function or class should have only one reason to change and perform exactly one task.
Boy Scout Rule: Always leave the code a little better than you found it by performing small refactors as you go.

2. Meaningful Naming
Use Descriptive Names: Variables, functions, and classes should clearly describe their purpose without needing a comment.
Noun vs. Verb: Use nouns for classes (e.g., User, Account) and verbs for functions (e.g., calculateTotal, sendEmail).
Avoid Ambiguity: Don't use single letters (except in very small loops) or cryptic abbreviations. 

3. Efficient Functions
Keep Them Small: Ideally, a function should be less than 20 lines.
Limit Parameters: Aim for 0–2 arguments; more than 3 usually indicates the function is doing too much.
No Side Effects: A function should do what its name implies and nothing else (e.g., a "checkPassword" function shouldn't also "logUserIn").

4. Purposeful Commenting
Explain "Why," Not "What": Code should be self-explanatory. Use comments only to explain complex logic or the reasoning behind a non-obvious decision.
Avoid Noise: Do not add redundant comments that simply repeat what the code says.
Delete Commented-Out Code: Use Git or another version control system to track history instead of leaving dead code in your files.

5. Formatting and Structure
Consistency: Adhere to a standard style guide (like Prettier for JS) for indentation and spacing across the whole project.
Vertical Openness: Use blank lines to separate distinct concepts and group related lines of code together.
Limit Line Length: Keep lines under 80–100 characters to prevent horizontal scrolling.

6. Error Handling
Use Specific Exceptions: Avoid catching generic Exception types, which can mask critical bugs.
Handle Gracefully: Provide meaningful, actionable error messages rather than silent failures or cryptic codes.

7. Testing and Quality
Unit Tests: Write tests for individual components to ensure correctness and make future refactoring safer.
Continuous Refactoring: Regularly revisit and improve existing code to eliminate code smells like "bloated methods" or "high coupling".
Code Reviews: Use peer reviews to catch issues and ensure team-wide adherence to standards.

---
