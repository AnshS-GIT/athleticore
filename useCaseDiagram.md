# Use Case Diagram

```mermaid
actor Athlete
actor Coach
actor Admin

rectangle AthletiCore {
    Athlete --> (Register / Login)
    Athlete --> (Log Training Data)
    Athlete --> (View Performance Insights)
    Athlete --> (View Injury Risk)
    Athlete --> (Get Training Recommendations)

    Coach --> (Login)
    Coach --> (Create Team)
    Coach --> (Add Players)
    Coach --> (Monitor Athlete Performance)
    Coach --> (Compare Players)

    Admin --> (Manage Users)
    Admin --> (Manage Teams)
}


---

# sequenceDiagram.md

```markdown
# Sequence Diagram — Training Data Logging & Injury Prediction

```mermaid
sequenceDiagram
    participant Athlete
    participant Frontend
    participant Controller
    participant Service
    participant Repository
    participant Database
    participant RiskEngine

    Athlete->>Frontend: Submit training data
    Frontend->>Controller: POST /training
    Controller->>Service: validateTraining()
    Service->>Repository: saveTraining()
    Repository->>Database: Insert record
    Database-->>Repository: Success

    Service->>RiskEngine: calculateInjuryRisk()
    RiskEngine-->>Service: Risk Score

    Service-->>Controller: Response with risk
    Controller-->>Frontend: Success + Risk Level
    Frontend-->>Athlete: Show insights


---

# classDiagram.md

```markdown
# Class Diagram

```mermaid
classDiagram

class User {
  +String id
  +String name
  +String email
  +String password
  +Role role
  +login()
}

class Athlete {
  +logTraining()
  +viewInsights()
}

class Coach {
  +createTeam()
  +addPlayer()
  +viewAnalytics()
}

class Admin {
  +manageUsers()
}

class Team {
  +String id
  +String name
  +addPlayer()
  +removePlayer()
}

class TrainingRecord {
  +distance
  +heartRate
  +trainingLoad
  +sleepHours
  +fatigueLevel
}

class InjuryRiskEngine {
  +calculateRisk()
}

User <|-- Athlete
User <|-- Coach
User <|-- Admin

Team "1" --> "*" Athlete
Athlete "1" --> "*" TrainingRecord
TrainingRecord --> InjuryRiskEngine


---

# ErDiagram.md

```markdown
# ER Diagram

```mermaid
erDiagram

USER {
    string id
    string name
    string email
    string password
    string role
}

TEAM {
    string id
    string name
    string coachId
}

ATHLETE {
    string id
    string userId
    string teamId
}

TRAINING_RECORD {
    string id
    string athleteId
    float distance
    float sprintSpeed
    int heartRate
    int trainingLoad
    int sleepHours
    int fatigueLevel
    date createdAt
}

USER ||--o{ ATHLETE : has
TEAM ||--o{ ATHLETE : contains
ATHLETE ||--o{ TRAINING_RECORD : logs


---
