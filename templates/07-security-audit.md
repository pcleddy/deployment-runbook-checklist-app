# Security Audit

## Preparation
- [ ] Define audit scope and objectives
- [ ] Identify systems and assets in scope
- [ ] Gather network diagrams and architecture docs
- [ ] Review previous audit findings
- [ ] Confirm audit team access and credentials
- [ ] Notify affected teams of audit timeline

## Access Controls
- [ ] Review user access lists for all systems
- [ ] Verify principle of least privilege is enforced
- [ ] Check for orphaned or inactive accounts
- [ ] Confirm MFA is enabled on all critical systems
- [ ] Review admin and privileged account policies
- [ ] Audit API keys and service account permissions

## Network Security
- [ ] Run vulnerability scan on external-facing systems
- [ ] Review firewall rules and configurations
- [ ] Check for open ports and unnecessary services
- [ ] Verify VPN configuration and access logs
- [ ] Test network segmentation between environments
- [ ] Review DNS and domain security settings

## Application Security
- [ ] Run static code analysis (SAST)
- [ ] Run dynamic application security testing (DAST)
- [ ] Review dependency vulnerabilities
- [ ] Check for hardcoded secrets in codebase
- [ ] Verify input validation and output encoding
- [ ] Test authentication and session management

## Data Protection
- [ ] Verify encryption at rest for sensitive data
- [ ] Confirm encryption in transit (TLS configuration)
- [ ] Review backup procedures and test restores
- [ ] Check data retention and deletion policies
- [ ] Verify PII handling compliance
- [ ] Review logging and log retention

## Incident Response
- [ ] Verify incident response plan is current
- [ ] Confirm alerting and notification systems work
- [ ] Review on-call rotation and escalation paths
- [ ] Test backup restoration procedures
- [ ] Verify security monitoring coverage

## Reporting
- [ ] Document all findings with severity ratings
- [ ] Create remediation plan with owners and deadlines
- [ ] Present findings to stakeholders
- [ ] Schedule follow-up audit for open items
