# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features a dark/light theme toggle, smooth animations, and a clean, professional design.

## Features

- Dark/Light theme toggle for user preference
- Smooth animations using Framer Motion
- Responsive design for all devices
- Dynamic routing for easy navigation
- SEO optimized for better visibility
- Integrated with Vercel for fast deployment
- Contact form with Supabase integration

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account (for contact form)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dariogeorge21/personal-portfolio.git
   cd personal-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting up Supabase for Contact Form

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Create a new table called `contact_messages` with the following columns:
   - `id` (int8, primary key)
   - `name` (text)
   - `email` (text)
   - `subject` (text)
   - `message` (text)
   - `created_at` (timestamp with time zone)
4. Get your project URL and anon key from the project settings
5. Add them to your `.env.local` file

## Development

### Running the JSON Server (for blog posts)

```bash
npm run server
# or
yarn server
```

### Running both Next.js and JSON Server

```bash
npm run dev:all
# or
yarn dev:all
```

## Deployment

The site can be deployed to Vercel with the following steps:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel project settings
4. Deploy!

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS

## License

This project is licensed under the MIT License.
