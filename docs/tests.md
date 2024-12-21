# Testing Guidelines

## General Principles

- Focus on testing functionality rather than specific text content
- Use role-based queries where possible (e.g. `getByRole('button')`)
- Look for minimal text patterns that are unlikely to change
- Use flexible assertions that won't break with minor UI changes
- Avoid testing implementation details

## Test Structure

- Tests should be simple and focus on one thing
- Group related tests using `describe` blocks
- Use clear, descriptive test names that explain what is being tested
- Keep setup code minimal and clear

## Working with haircare-ingredients-analyzer

- Avoid async/await since it's a synchronous local library
- Get ingredient data directly using `getBundledDatabase()`
- Don't create separate data files for ingredients
- Use types from the library when working with it

## Smoke Tests

- Focus on basic functionality rather than specific details
- Verify that key features work without being too strict about exact content
- Make sure critical paths through the application work
- Don't test every possible edge case

## UI Testing Best Practices

- Use Testing Library's role-based queries when possible
- Prefer `getByRole` over `getByText` when targeting interactive elements
- Use `getAllByText` instead of `getByText` when multiple matches are expected
- Test user interactions using `userEvent` rather than `fireEvent`
- Look for elements that are actually visible to users

## Example Test Pattern

```typescript
// Basic smoke test pattern
it('shows key functionality', () => {
  render(<Component />);

  // Find elements by role where possible
  const buttons = screen.getAllByRole('button');

  // Interact with elements
  userEvent.click(buttons[0]);

  // Check for general patterns rather than exact text
  expect(screen.getByText(/expected pattern/i)).toBeInTheDocument();
});
```

## What to Avoid

- Don't test exact text content unless absolutely necessary
- Don't use implementation details in tests (internal state, component names, etc)
- Don't create complex test setups
- Don't test third-party library functionality
- Don't use async/await unnecessarily
- Don't create separate test data files when data is available from libraries
