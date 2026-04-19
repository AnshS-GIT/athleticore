# Class Diagram

```mermaid
classDiagram

    %% ==================== MODELS ====================
    class UserModel {
        +ObjectId _id
        +String name
        +String email
        +String password
        +Date createdAt
        +Date updatedAt
    }

    class MoodEntryModel {
        +ObjectId _id
        +ObjectId userId
        +String mood
        +String note
        +Date createdAt
    }

    class RecommendationModel {
        +ObjectId _id
        +String mood
        +String[] activities
        +String[] workouts
        +String[] music
    }

    %% ==================== REPOSITORIES ====================
    class UserRepository {
        +findByEmail(email) User
        +findById(id) User
        +create(userData) User
    }

    class MoodEntryRepository {
        +create(entryData) MoodEntry
        +findByUserId(userId, options) MoodEntry[]
        +findById(id) MoodEntry
    }

    class RecommendationRepository {
        +findByMood(mood) Recommendation
        +upsertByMood(mood, data) Recommendation
        +findAll() Recommendation[]
    }

    %% ==================== SERVICES ====================
    class AuthService {
        -SALT_ROUNDS: Number
        +signup(credentials) Object
        +login(credentials) Object
        -_generateToken(userId) String
    }

    class MoodService {
        +addMoodEntry(data) MoodEntry
        +getMoodHistory(userId, options) Object
    }

    class RecommendationService {
        -DEFAULT_RECOMMENDATIONS: Object
        +getRecommendation(mood) Object
        +seedDefaults() Object
    }

    class ChatbotService {
        -validMoods: String[]
        +processMessage(message) Object
    }

    %% ==================== CONTROLLERS ====================
    class AuthController {
        +signup(req, res, next) void
        +login(req, res, next) void
    }

    class MoodController {
        +addMoodEntry(req, res, next) void
        +getMoodHistory(req, res, next) void
    }

    class RecommendationController {
        +getRecommendation(req, res, next) void
        +seedRecommendations(req, res, next) void
    }

    class ChatbotController {
        +chat(req, res, next) void
    }

    %% ==================== MIDDLEWARE ====================
    class AuthMiddleware {
        +verifyToken(req, res, next) void
    }

    class ErrorMiddleware {
        +handleError(err, req, res, next) void
    }

    %% ==================== RELATIONSHIPS ====================

    %% Repositories depend on Models
    UserRepository --> UserModel : queries
    MoodEntryRepository --> MoodEntryModel : queries
    RecommendationRepository --> RecommendationModel : queries

    %% Services depend on Repositories
    AuthService --> UserRepository : uses
    MoodService --> MoodEntryRepository : uses
    RecommendationService --> RecommendationRepository : uses
    ChatbotService --> RecommendationService : reuses

    %% Controllers depend on Services
    AuthController --> AuthService : delegates to
    MoodController --> MoodService : delegates to
    RecommendationController --> RecommendationService : delegates to
    ChatbotController --> ChatbotService : delegates to

    %% Model relationships
    MoodEntryModel --> UserModel : "userId references"
    RecommendationModel ..> MoodEntryModel : "linked via mood string"
```

---

## Architecture Overview

The class diagram follows a strict **layered architecture** with clear separation of concerns:

### Layer Responsibilities

| Layer | Responsibility | Pattern |
|-------|---------------|---------|
| **Models** | Define MongoDB schemas and data structure | Mongoose Schema |
| **Repositories** | Encapsulate all database operations | Repository Pattern |
| **Services** | Contain all business logic | Service Layer Pattern |
| **Controllers** | Handle HTTP request/response only | Thin Controller |
| **Middleware** | Cross-cutting concerns (auth, errors) | Middleware Pattern |

### Design Patterns Applied

1. **Repository Pattern** — All database queries are encapsulated in repository classes, making it easy to swap data sources without touching business logic.

2. **Service Layer Pattern** — Business rules live exclusively in service classes. Controllers never contain logic beyond request parsing.

3. **Singleton Pattern** — All services and repositories are exported as singleton instances (`module.exports = new ClassName()`), ensuring a single shared instance throughout the application lifecycle.

4. **Dependency Flow:**
   ```
   Controllers → Services → Repositories → Models → MongoDB
   ```
   Each layer only communicates with the layer directly below it. No layer skipping is allowed.
