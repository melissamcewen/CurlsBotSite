# CurlsBot Ingredient Analyzer

> 🧪 A modern Next.js web app that analyzes haircare product ingredients using a custom-built analysis engine. Built with TypeScript, React 19, and TailwindCSS.


## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with React 19
- **Type Safety:** TypeScript
- **Styling:**
  - Tailwind CSS
  - DaisyUI for UI components
  - Custom flat rounded design system
- **Performance Optimizations:**
  - Resource preloading for critical assets
  - Static site generation
  - Route groups for code organization
  - Hardware-accelerated animations
- **Testing:**
  - Jest
  - React Testing Library
  - Smoke tests for critical paths
- **UI Components:**
  - Lucide icons
  - Custom React components
  - Loading skeletons for better UX
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
- Advanced performance optimizations:
  - Resource preloading for critical assets
  - Optimized image loading
  - Hardware-accelerated animations
  - Minimal layout shifts (CLS)

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
- Loading skeletons that match final content

## 📚 Architecture

The project follows modern React best practices:
- Component-based architecture
- Type-safe props and state management
- Synchronous local processing for ingredient analysis
- Efficient client-side search and filtering
- Static site generation for optimal performance
- Route groups for better code organization
- Smart resource preloading

## 🔧 Custom Libraries

- **[haircare-ingredients-analyzer](https://github.com/melissamcewen/curlsbotAPI)**: A library I developed from scratch for analyzing hair care product ingredients
  - Provides ingredient classification
  - Offers comprehensive ingredient analysis
  - Includes a bundled ingredient database
  - Type-safe API integration

## 📈 Performance Optimizations

- Static site generation for fast page loads
- Client-side processing to minimize server load
- Optimized bundle size through proper code splitting
- Efficient search algorithms for real-time filtering
- Resource preloading for critical assets
- Hardware-accelerated animations
- Minimal layout shifts through proper content sizing
- Route groups for better code splitting
- Loading skeletons for improved perceived performance

## 🧪 Testing

The project employs a pragmatic testing approach focusing on smoke tests to ensure core functionality remains intact. Tests are designed to:
- Verify component rendering
- Ensure basic user interactions work
- Validate core business logic
- Prevent regressions in critical paths
- Test synchronous operations efficiently
