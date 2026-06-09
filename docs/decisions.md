# Architecture Decisions Log

## ADR-001: Multi-Tenancy Strategy
**Decision:** Single database with tenant_id column (Stancl Tenancy)
**Reason:** Simpler for MVP, easier backups, lower cost

## ADR-002: API-First Design
**Decision:** Every feature exposes API endpoint before web UI
**Reason:** Mobile apps need APIs. Prevents rebuild.

## ADR-003: Event-Driven Architecture
**Decision:** Every business action dispatches an event
**Reason:** Loose coupling, easier to add notifications/audit later

## ADR-004: Modular Monolith
**Decision:** Use nwidart/laravel-modules for module structure
**Reason:** Clear boundaries, organized codebase

## ADR-005: Soft Deletes
**Decision:** Use SoftDeletes on users, staff, guests, rooms, bookings, properties