// ─── SEO Meta Component ───
// src/components/SEO.tsx
// Renders <title>, meta description, Open Graph, Twitter Card,
// canonical link, and optional JSON-LD structured data via Helmet.
// Requires <HelmetProvider> at the app root.

import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}

const SITE_URL = "https://themanageher.com";
const DEFAULT_IMAGE = `${SITE_URL}/M_Logo_Pink.png`;

const SEO = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = "website",
  jsonLd,
  noindex = false,
}: SEOProps) => (
  <Helmet>
    {/* Primary meta */}
    <title>{title}</title>
    <meta name="description" content={description} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}
    <link rel="canonical" href={url} />

    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="The Manage Her®" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:site" content="@themanageher" />

    {/* JSON-LD structured data */}
    {jsonLd && (
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    )}
  </Helmet>
);

export default SEO;
