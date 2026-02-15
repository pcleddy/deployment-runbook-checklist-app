# Database Migration

## Planning
- [ ] Document current schema and data volumes
- [ ] Design target schema and mapping
- [ ] Identify breaking changes and compatibility issues
- [ ] Estimate migration duration and downtime window
- [ ] Create rollback plan and scripts
- [ ] Get stakeholder approval for maintenance window

## Pre-Migration
- [ ] Take full backup of source database
- [ ] Verify backup integrity with test restore
- [ ] Test migration scripts on staging environment
- [ ] Measure migration timing on realistic data volume
- [ ] Notify affected teams and users of downtime
- [ ] Freeze schema changes during migration window

## Migration Execution
- [ ] Put application in maintenance mode
- [ ] Take final pre-migration backup
- [ ] Disable automated jobs and cron tasks
- [ ] Run migration scripts
- [ ] Verify row counts match between source and target
- [ ] Check data integrity on sample records
- [ ] Run constraint and index validation

## Validation
- [ ] Run application test suite against new database
- [ ] Verify critical queries return correct results
- [ ] Check foreign key relationships are intact
- [ ] Validate stored procedures and triggers
- [ ] Confirm data types and encodings are correct
- [ ] Test application read and write operations

## Post-Migration
- [ ] Re-enable automated jobs and cron tasks
- [ ] Take application out of maintenance mode
- [ ] Monitor query performance for regressions
- [ ] Watch error logs for database-related issues
- [ ] Keep old database available for fallback period
- [ ] Update documentation with new schema
- [ ] Decommission old database after confirmation period
