# Code Review

## Before Reviewing
- [ ] Read the pull request description and linked ticket
- [ ] Understand the purpose and scope of changes
- [ ] Check if there are related PRs or dependencies
- [ ] Pull the branch locally if needed for testing

## Code Quality
- [ ] Code follows team style guide and conventions
- [ ] Functions and variables have clear, descriptive names
- [ ] No unnecessary code duplication
- [ ] Complex logic has explanatory comments
- [ ] No commented-out code left behind
- [ ] Dead code or unused imports are removed

## Correctness
- [ ] Logic correctly implements the requirements
- [ ] Edge cases are handled
- [ ] Error handling is appropriate and consistent
- [ ] No off-by-one errors
- [ ] Null and undefined cases are handled
- [ ] Race conditions are considered (if applicable)

## Testing
- [ ] New code has adequate test coverage
- [ ] Tests cover happy path and error cases
- [ ] Existing tests still pass
- [ ] Test names clearly describe what they verify
- [ ] No flaky or timing-dependent tests introduced
- [ ] Integration tests added for new APIs or endpoints

## Security
- [ ] No hardcoded secrets or credentials
- [ ] User input is validated and sanitized
- [ ] SQL injection and XSS are prevented
- [ ] Authentication and authorization are checked
- [ ] Sensitive data is not logged

## Performance
- [ ] No obvious N+1 query problems
- [ ] Large data sets are paginated
- [ ] Expensive operations are cached where appropriate
- [ ] No memory leaks introduced
- [ ] Database queries use proper indexes

## Final Checks
- [ ] PR is a reasonable size (not too large)
- [ ] Commit messages are clear and descriptive
- [ ] Documentation is updated if needed
- [ ] Breaking changes are noted
- [ ] Approve, request changes, or leave comments
