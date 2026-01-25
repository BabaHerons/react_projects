# 🧠 Todo App Journey

![Status](https://img.shields.io/badge/status-in%20progress-blue)
![License](https://img.shields.io/badge/license-MIT-green)


> A progressive exploration of building a Todo application — from fundamentals to real-world architecture.

This repository documents my **learning and architecture journey** through multiple versions of the same Todo application.
Each folder represents a **deliberate stage of evolution**, capturing not just features, but **design decisions, abstractions, and trade-offs**.

This is not a single project.
It’s a **timeline of growth**.


## 📂 Repository Structure

```text
.
├── todo_simple/     # React fundamentals & state management
├── todo_v2/         # Scalable frontend architecture
├── todo_v3/         # Full-stack system with generic backend
└── todo_v4/         # Production-grade evolution (planned)
```

Each version:

* lives in its own folder
* has an independent README
* builds conceptually on the previous one

## 🟢 Version Overview

### 🧩 `todo_simple` — Foundations

**Focus:** Learning React & TypeScript fundamentals

* `useState` and controlled inputs
* Basic form handling
* Immutable state updates
* Simple UI rendering
* No persistence, no backend

📌 Purpose:

> *Understand how a Todo app works at its most basic level.*


### 🔵 `todo_v2` — Frontend Architecture

**Focus:** Structure, scalability, and data flow

* Feature-based folder structure
* Generic CRUD factory pattern
* TanStack Query for server-state management
* React Hook Form for scalable forms
* Axios abstraction
* Mock backend using `json-server`

📌 Purpose:

> *Design a frontend that can scale without becoming fragile.*



### 🟣 `todo_v3` — Full-Stack System

**Focus:** Real-world architecture & backend abstractions

* Python + Flask REST API
* Generic `DynamicResource` CRUD engine
* Policy-driven access control
* SQLAlchemy ORM with metaclass injection
* Centralized audit logging (design-complete)
* JWT-based authentication
* Typed, reusable frontend architecture

📌 Purpose:

> *Build a reusable foundation that goes beyond a Todo app.*


### ⚫ `todo_v4` — Production Evolution (Planned)

**Focus:** Production readiness & observability

Planned additions:

* Production-grade backend
* Request tracing & middleware
* Expanded audit logging
* Better error handling
* Performance & monitoring concerns
* Real deployment patterns

📌 Purpose:

> *Bridge the gap between a solid system and a production-ready application.*

## 🧭 Version Comparison

| Capability / Version | todo_simple | todo_v2 | todo_v3 | todo_v4 |
|----------------------|-------------|---------|---------|---------|
| React + TypeScript | ✅ | ✅ | ✅ | ✅ |
| Controlled Forms | ✅ | ✅ | ✅ | ✅ |
| Feature-based Folder Structure | ❌ | ✅ | ✅ | ✅ |
| Generic CRUD Abstraction | ❌ | ✅ (frontend) | ✅ (full-stack) | ✅ |
| Server State Management | ❌ | ✅ (TanStack Query) | ✅ (TanStack Query) | ✅ |
| Mock Backend | ❌ | ✅ (json-server) | ❌ | ❌ |
| Real Backend API | ❌ | ❌ | ✅ (Flask REST API) | ✅ |
| Authentication | ❌ | ❌ | ✅ (JWT) | ✅ |
| Role / Policy-based Access | ❌ | ❌ | ✅ (Model Policies) | ✅ |
| Audit Logging | ❌ | ❌ | 🧱 (Schema + hooks) | ✅ |
| Lifecycle Hooks (CRUD) | ❌ | ❌ | ✅ (before/after hooks) | ✅ |
| Typed API Contracts | ❌ | ⚠️ (frontend only) | ✅ (end-to-end) | ✅ |
| Production Readiness | ❌ | ❌ | ⚠️ Architecture-ready | ✅ |

Legend: ❌ Not present · ⚠️ Partial · 🧱 Design complete · ✅ Implemented

## 🧠 Why This Repository Exists

Most repositories show only the **final result**.

This one preserves:

* early implementations
* refactors
* architectural shifts
* learning milestones

So that:

* progress is visible
* decisions are explainable
* fundamentals remain traceable.

This repository is intentionally **evolutionary**, not polished.


## 📖 How to Navigate This Repo

If you’re exploring:

1. Start with `todo_simple`
2. Read each version’s README
3. Observe what changed — and *why*
4. Move forward version by version

Each folder assumes knowledge from the previous one.


## 📝 Notes

* Each version is intentionally self-contained
* Earlier versions are not “deprecated” — they are **context**
* This repo prioritizes **clarity over cleverness**

If you want the best features → jump ahead.
If you want the story → start at the beginning.


## 📌 Author

Built with ❤️ and intent by **Manmay**


### 🔚 Closing Thought

> *Good software is built once.*
> *Great software is built many times — better each time.*

