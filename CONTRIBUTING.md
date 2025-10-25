# Contributing to Real-Time Launchpad

Thank you for your interest in contributing to Real-Time Launchpad! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Questions or Issues?](#questions-or-issues)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- **Node.js**: 20.9 or higher
- **npm**: 10.x or higher
- **Git**: Latest version
- **TypeScript**: 5.x or higher

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone git@github.com:YOUR_USERNAME/React-19-Real-Time-Launchpad.git
   cd React-19-Real-Time-Launchpad
   ```
3. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream git@github.com:RichLewis007/React-19-Real-Time-Launchpad.git
   ```

## Development Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Run linting**:

   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug Reports**: Report bugs or issues
- 💡 **Feature Requests**: Suggest new features or improvements
- 📝 **Documentation**: Improve existing documentation or add new content
- 🔧 **Code**: Fix bugs or implement new features
- ✅ **Tests**: Add or improve test coverage
- 🎨 **Design**: Improve UI/UX or create new components

### Contributing Process

1. **Create a branch**:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**: Write clean, tested, and documented code

3. **Test your changes**: Ensure all tests pass and the code builds successfully

4. **Commit your changes**: Follow our [commit guidelines](#commit-guidelines)

5. **Push to your fork**:

   ```bash
   git push origin your-branch-name
   ```

6. **Create a Pull Request**: Open a PR on GitHub with a clear description

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` - use proper types or `unknown`
- Prefer interfaces over types for object shapes
- Use descriptive variable and function names
- Follow the existing code style

### React Components

```tsx
// ✅ Good: Proper TypeScript with clear props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### File Organization

```
src/
├── app/              # Next.js pages and routes
├── components/       # Reusable React components
├── actions/          # Server Actions
└── lib/             # Utilities and helpers
```

### Code Style

- Use **ESLint** and **Prettier** configurations (included in the project)
- Follow the existing code formatting
- Keep functions small and focused
- Add JSDoc comments for complex logic
- Use meaningful variable names

### Server vs Client Components

```tsx
// ✅ Server Component (default)
export default async function ProductList({ products }) {
  return <div>{/* ... */}</div>;
}

// ✅ Client Component (when needed)
("use client");
export function InteractiveButton() {
  return <button>Click me</button>;
}
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(cart): add optimistic cart updates
fix(search): resolve case-sensitive search issue
docs(readme): update installation instructions
refactor(components): extract ProductCard component
test(actions): add tests for addToCart action
```

## Pull Request Process

### Before Submitting

- [ ] Code follows the project's coding standards
- [ ] Self-review your code
- [ ] Add comments for complex logic
- [ ] Update documentation if needed
- [ ] Add or update tests
- [ ] All tests pass
- [ ] Linting passes with no errors
- [ ] Build succeeds without errors

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing

How has this been tested?

## Screenshots (if applicable)

Add screenshots here

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Thank you for contributing!

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for new features
- Update tests when fixing bugs
- Aim for good test coverage
- Use descriptive test names

### Test Structure

```tsx
describe("ProductCard", () => {
  it("renders product information correctly", () => {
    // Test implementation
  });

  it("handles add to cart action", async () => {
    // Test implementation
  });
});
```

## Documentation

### Code Documentation

- Add JSDoc comments for public functions
- Document complex logic inline
- Keep comments up to date with code changes

```tsx
/**
 * Adds a product to the user's cart
 * @param userId - The ID of the user
 * @param productId - The ID of the product to add
 * @param quantity - The quantity to add
 * @returns Promise resolving to the updated cart
 */
async function addToCart(userId: string, productId: string, quantity: number) {
  // Implementation
}
```

### Updating Documentation

- Update README.md for user-facing changes
- Update docs/ for architectural or technical changes
- Keep examples up to date
- Add screenshots for UI changes

## Questions or Issues?

- 🐛 **Bug Reports**: [Open an issue](https://github.com/RichLewis007/React-19-Real-Time-Launchpad/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Open an issue](https://github.com/RichLewis007/React-19-Real-Time-Launchpad/issues/new?template=feature_request.md)
- ❓ **Questions**: [Start a discussion](https://github.com/RichLewis007/React-19-Real-Time-Launchpad/discussions)

## Recognition

Contributors will be:

- Listed in our CONTRIBUTORS.md file
- Credited in release notes
- Appreciated by the community!

---

Thank you for contributing to Real-Time Launchpad! Your efforts help make this project better for everyone. 🚀
