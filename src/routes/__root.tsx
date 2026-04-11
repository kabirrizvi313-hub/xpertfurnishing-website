import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Best Curtains & Home Furnishing in Gurgaon | Xpert Furnishing',
      },
      {
        name: 'description',
        content:
          'Looking for the best curtains and home furnishing in Gurgaon? Xpert Furnishing offers custom curtains, sofa repair, blinds and complete home decor solutions. Call now!',
      },
      {
        name: 'keywords',
        content:
          'Curtains in Gurgaon, Sofa Repair Gurgaon, Home Furnishing Gurgaon, Custom Curtains Gurgaon, blinds installation Gurgaon, sofa upholstery Gurgaon',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
