# WeCare Counseling Website

A premium, high-performance counseling website built with Next.js 15, optimized for static export and Namecheap shared hosting.

## 🌿 Features

- **Modern Sage Green Design**: Calming color palette with cream backgrounds
- **Scroll-Linked Animations**: Smooth Framer Motion animations as sections enter viewport
- **Mobile Optimized**: Responsive design with slide-out navigation
- **Static Export Ready**: Configured for deployment on Namecheap shared hosting
- **Premium UI/UX**: Professional design with smooth interactions

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

This generates a static export in the `out/` folder, ready for upload to your hosting provider.

## 📁 Project Structure

```
WeCare-CounselingSite/
├── app/
│   ├── page.tsx          # Main page with all sections
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── next.config.ts        # Static export configuration
├── tailwind.config.ts    # Sage green color palette
└── package.json          # Dependencies
```

## 🎨 Sections

1. **Hero**: Eye-catching introduction with CTA button
2. **About**: Professional bio with credentials
3. **Services**: Interactive cards for therapy offerings
4. **Contact**: Beautiful form UI (ready for Formspree integration)

## 📮 Contact Form Integration

The contact form is configured to work with Formspree. To configure your custom form:

1. Sign up at [Formspree.io](https://formspree.io) (free tier available)
2. Create a new form and copy your Form ID
3. Set it in `.env.local` (local development) or in your hosting provider's environment variables (production):
   ```env
   NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id
   ```

Alternative services: Netlify Forms, Basin, FormSubmit

## 🌐 Deployment to Namecheap

1. Run `npm run build` to generate the `out/` folder
2. Upload contents of the `out/` folder to your public_html directory via FTP/cPanel
3. Ensure `.htaccess` is configured for proper routing (if needed)

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript

## 📝 Customization

- **Colors**: Modify the sage palette in `tailwind.config.ts`
- **Content**: Edit sections in `app/page.tsx`
- **Fonts**: Update font family in Tailwind config

## 📄 License

Private project for WeCare Counseling.
