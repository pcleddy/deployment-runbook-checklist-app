# Software Deployment

## Pre-Deployment
- [ ] Confirm release branch is tagged and approved
- [ ] Run full test suite against staging
- [ ] Verify database migration scripts are tested
- [ ] Confirm rollback plan is documented
- [ ] Notify stakeholders of deployment window

## Infrastructure
- [ ] Check server capacity and health
- [ ] Verify load balancer configuration
- [ ] Confirm SSL certificates are valid
- [ ] Review environment variables and secrets

## Deploy
- [ ] Enable maintenance mode
  - [ ] Notify users via status page
  - [ ] Verify no active critical sessions
- [ ] Deploy application artifacts
  - [ ] Upload build package
  - [ ] Restart application services
- [ ] Run database migrations
- [ ] Warm caches if applicable

## Post-Deployment Validation
- [ ] Smoke test critical paths
  - [ ] API health endpoint returns 200
  - [ ] User login and registration work
  - [ ] Payment flow processes correctly
- [ ] Monitor error rates for 15 minutes
- [ ] Check application logs for warnings
- [ ] Verify third-party integrations respond

## Wrap-Up
- [ ] Disable maintenance mode
- [ ] Post deployment summary to team channel
- [ ] Update changelog and release notes
- [ ] Close deployment ticket
