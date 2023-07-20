const links: Link[] = [
  {
    title: "Liberapay",
    description: "Open source platform managed by a non-profit.",
    icon: "liberapay",
    url: "https://liberapay.com/pervoj",
    fg: "var(--clr-fg-warning)",
    bg: "var(--clr-bg-warning)",
  },
  {
    title: "Ko-fi",
    description: "Popular platform for sponsoring creators.",
    icon: "kofi",
    url: "https://ko-fi.com/pervoj",
    fg: "var(--clr-fg-destructive)",
    bg: "var(--clr-bg-destructive)",
  },
  {
    title: "PayPal",
    description: "Platform for processing various payments.",
    icon: "paypal",
    url: "https://paypal.me/pervoj",
    fg: "var(--clr-fg-accent)",
    bg: "var(--clr-bg-accent)",
  },
];

export default links;

export type Link = {
  title: string;
  description: string;
  icon: string;
  url: string;
  fg: string;
  bg: string;
};
