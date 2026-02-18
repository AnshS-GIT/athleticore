# Class Diagram

```mermaid
classDiagram

class User {
  +id
  +name
  +email
  +password
  +role
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
  +id
  +name
  +coachId
}

class TrainingRecord {
  +distance
  +sprintSpeed
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
Athlete --> "*" TrainingRecord
TrainingRecord --> InjuryRiskEngine
