![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Journey](https://img.shields.io/badge/Todo%20Journey-v1%20→%20v4-purple)
![Status](https://img.shields.io/badge/status-v1%20stable-blue)

## 🧩 todo_simple
> The starting point of my Todo app journey.

This folder represents the **most basic, no-frills version** of a Todo application.
It exists to capture **where everything began** — before state management libraries, backend APIs, persistence, or complex architecture.

If you’re browsing this repository, think of `todo_simple` as **Version 1** as starting point.


## 🎯 Purpose of this Version

The goal of `todo_simple` is **learning by building**, focusing on:

* Understanding **React state management** using `useState`
* Practicing **TypeScript interfaces**
* Handling **form inputs** and controlled components
* Updating UI based on state changes
* Writing cleaner, reusable logic (small refactors included)

No database.
No backend.
No external state library.
Just React doing React things.


## 🛠 Tech Stack

* **React** (with Vite)
* **TypeScript**
* **Tailwind CSS**
* **Vite** (dev server & bundler)


## 📁 What This App Does

* Add a todo with:

  * Task name
  * Description
* Display todos in a table
* Mark a todo as **completed**
* Delete a todo
* Auto-attach a timestamp when a todo is created
* Reset the form after submission

All data lives **only in memory** (page refresh = data gone).


## 🧠 Key Learning Highlights

Some intentional design & learning choices in this version:

### 1. Strong typing with interfaces

```ts
interface toDo {
  task_name: string
  description: string
  status: boolean
  date: Date | string
}
```


### 2. Clean state initialization

Instead of repeating empty objects:

```ts
const makeEmptyTodo = (): toDo => ({
  task_name: "",
  description: "",
  status: false,
  date: ""
})
```


### 3. Immutable state updates

Avoiding direct mutation to ensure re-renders:

```ts
return { ...item, status: true }
```


### 4. Controlled inputs

Every input reflects state → predictable UI behavior.


## 🚀 Running the App Locally

```bash
npm install
npm run dev
```

The app runs on:

```
http://localhost:4200
```


## 🔄 What Comes Next

This is **not** the final Todo app.

Upcoming versions in this repository will build on this foundation:

* `todo_v2` → better structure, persistence, cleaner UI
* `todo_v3` → advanced state handling, features, scalability
* `todo_v4` → backend, auth, real-world patterns (planned)

Each folder tells a **chapter of the same story**.


## 📝 Note

This README is intentionally simple and reflective.
It’s meant to document **progress**, not impress.

If you’re reading this from the future:

> *This is where it all started.*
