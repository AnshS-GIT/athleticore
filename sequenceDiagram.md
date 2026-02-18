# Sequence Diagram — Training Data Logging & Injury Prediction

```mermaid
sequenceDiagram
    participant Athlete
    participant Frontend
    participant Controller
    participant Service
    participant Repository
    participant Database
    participant InjuryRiskEngine

    Athlete->>Frontend: Enter training metrics
    Frontend->>Controller: POST /training
    Controller->>Service: Validate data
    Service->>Repository: Save record
    Repository->>Database: Insert training data
    Database-->>Repository: Success

    Service->>InjuryRiskEngine: Analyze workload
    InjuryRiskEngine-->>Service: Risk Score

    Service-->>Controller: Return response
    Controller-->>Frontend: Training + Risk level
    Frontend-->>Athlete: Display insights
