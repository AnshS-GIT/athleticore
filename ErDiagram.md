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
