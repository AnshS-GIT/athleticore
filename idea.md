# AthletiCore — Mood-Based Activity & Wellness Recommendation Platform

## Project Overview

AthletiCore is a full-stack web application that tracks user moods and provides personalized recommendations for activities, workouts, and music. The platform enables users to log how they feel, view their mood history, and receive intelligent rule-based suggestions to improve their well-being.

The application also features an interactive chatbot that guides users through mood selection and delivers recommendations in a conversational interface.

---

## Problem Statement

People often struggle to identify appropriate activities, workout routines, or music that align with their current emotional state. Without a structured system, users may resort to unhealthy coping mechanisms or remain inactive during low-energy periods.

AthletiCore addresses this by providing:

- A simple and intuitive mood-logging system
- Personalized activity, workout, and music recommendations based on current mood
- A historical mood journal for self-awareness and emotional tracking
- An interactive chatbot for guided mood-based assistance

---

## Solution

AthletiCore offers a clean, user-friendly interface where users can:

1. **Sign up and log in** securely using JWT-based authentication
2. **Log their current mood** (happy, sad, stressed, energetic, calm, tired) with an optional note
3. **View mood history** to track emotional patterns over time
4. **Get personalized recommendations** — activities, workouts, and music curated for their selected mood
5. **Interact with a chatbot** that conversationally guides them through mood selection and delivers suggestions inline

---

## Scope

### Current Scope (Implemented)

- User authentication (Signup/Login) with password hashing and JWT tokens
- Mood entry logging with timestamps and optional notes
- Mood history retrieval with pagination
- Rule-based recommendation engine for 6 mood types
- Interactive chatbot with mood detection and inline recommendations
- Responsive, dark-themed frontend UI

### Future Enhancements

- Mood analytics dashboard with trends and charts
- Integration with Spotify API for real music playlist suggestions
- Machine learning-based mood prediction from journal notes
- Social features — sharing mood streaks with friends
- Push notification reminders for daily mood logging

---

## Key Features

### 1. Secure Authentication
- Email-based signup and login
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiry for session management
- Protected routes — unauthenticated users cannot access core features

### 2. Mood Logging
- Visual mood selector with emoji-based options (😊 😢 😰 ⚡ 😌 😴)
- Optional note field for journaling context
- Timestamped entries stored in MongoDB
- Paginated mood history with most recent entries first

### 3. Recommendation Engine
- Rule-based system with curated suggestions for each of the 6 moods
- Three recommendation categories: Activities, Workouts, and Music
- Database-first lookup with hardcoded fallback defaults
- Seedable recommendation data via utility endpoint

### 4. Interactive Chatbot
- Floating chat widget accessible from all authenticated pages
- Greeting and mood detection from natural language input
- Clickable mood option buttons for quick selection
- Inline recommendation cards displayed within the chat interface
- Typing indicator animation for realistic conversational feel

### 5. Clean Architecture
- Strict separation of concerns: Controllers → Services → Repositories → Models
- OOP-based Service and Repository classes
- Repository Pattern, Service Layer Pattern, and Singleton Pattern applied
- Global error handling middleware
- Modular, scalable codebase

---

## Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | React.js (Vite)    |
| Backend    | Node.js + Express  |
| Database   | MongoDB (Mongoose) |
| Auth       | JWT + bcrypt       |
| HTTP Client| Axios              |
| Styling    | Vanilla CSS        |

---

## System Architecture

```
┌─────────────┐     HTTP/JSON      ┌─────────────────┐     Mongoose     ┌───────────┐
│   React.js  │ ◄──────────────► │  Express Server  │ ◄──────────────► │  MongoDB  │
│  (Frontend) │                    │   (Backend API)  │                  │ (Database) │
└─────────────┘                    └─────────────────┘                  └───────────┘
       │                                   │
  Axios + JWT                    Controllers → Services
  Interceptor                    → Repositories → Models
```

### Architectural Principles

- Encapsulation
- Abstraction
- Separation of Concerns
- SOLID Principles
- Repository Pattern
- Service Layer Pattern
