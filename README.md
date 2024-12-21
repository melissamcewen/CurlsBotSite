# CurlsBot Ingredient Analyzer

A modern, type-safe web application built with Next.js that helps users analyze hair care product ingredients.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with React 19
- **Type Safety:** TypeScript
- **Styling:**
  - Tailwind CSS
  - DaisyUI for UI components
  - Custom flat rounded design system
- **Testing:**
  - Jest
  - React Testing Library
- **UI Components:**
  - Heroicons V2 (Solid variants)
  - Custom React components
- **Search & Analysis:**
  - [haircare-ingredients-analyzer](https://github.com/melissamcewen/curlsbotAPI) - A custom library I developed for ingredient analysis
- **Development Tools:**
  - ESLint for code quality
  - PostCSS for CSS processing
  - SWC for fast compilation

## 🌟 Key Features

- Real-time ingredient analysis using a custom-built haircare ingredient database
- Type-safe ingredient processing with custom TypeScript types
- Modern, accessible UI with a flat rounded design system
- Efficient client-side search and filtering
- Responsive design that works across all devices

## 💻 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```


## 🎨 Design System

The application implements a custom design system featuring:
- Flat, rounded UI elements
- Solid colors from the DaisyUI palette
- No shadows or opacity effects
- Consistent spacing and typography
- Semantic color coding for analysis results

## 📚 Architecture

The project follows modern React best practices:
- Component-based architecture
- Type-safe props and state management
- Synchronous local processing for ingredient analysis
- Efficient client-side search and filtering
- Static site generation for optimal performance

## 🔧 Custom Libraries

- **[haircare-ingredients-analyzer](https://github.com/melissamcewen/curlsbotAPI)**: A library I developed from scratch for analyzing hair care product ingredients
  - Provides ingredient classification
  - Offers comprehensive ingredient analysis
  - Includes a bundled ingredient database
  - Type-safe API integration

## 📈 Performance

- Static site generation for fast page loads
- Client-side processing to minimize server load
- Optimized bundle size through proper code splitting
- Efficient search algorithms for real-time filtering


## 🧪 Testing

The project employs a pragmatic testing approach focusing on smoke tests to ensure core functionality remains intact. Tests are designed to:
- Verify component rendering
- Ensure basic user interactions work
- Validate core business logic
- Prevent regressions in critical paths
