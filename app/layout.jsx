export const metadata = {
  title: "Yashwant Gandham — Portfolio",
  description: "Founding Engineer · CTO · Building LLM infrastructure at production scale.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
