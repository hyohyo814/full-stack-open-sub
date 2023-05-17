# Sequence Diagram of user submitting note

```mermaid
sequenceDiagram
    participant A
    participant B

    A->>B: GET
    activate server
    B-->>A: doc
    deactivate server

```