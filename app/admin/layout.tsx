import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Morocco Grove Naturals",
  description: "From the heart of Morocco to the soul of your beauty.",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;
