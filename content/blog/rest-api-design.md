---
title: "REST API Design Principles"
desc: "Best practices for designing clean and maintainable RESTful APIs."
date: 2026-05-22
tags: ["backend", "api"]
---

Good API design is about consistency and predictability.

## Resources, not actions

Use nouns for endpoints, not verbs.

- `GET /users` — list users
- `POST /users` — create a user
- `GET /users/:id` — get one user

## Status codes matter

Use the right HTTP status codes so clients can handle responses without parsing the body.

- `200` — success
- `201` — created
- `400` — bad request
- `404` — not found
- `500` — server error

## Versioning

Put a version prefix in the URL so you can evolve the API without breaking existing clients.

```
/api/v1/users
/api/v2/users
```

Start simple, iterate based on *actual* need, not hypothetical future requirements.
