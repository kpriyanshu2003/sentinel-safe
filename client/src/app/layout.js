import "./globals.css";

export const metadata = {
  title: "SentinelSafe",
  description:
    "A web app targetting  community to access safe roads and a overall alert community in times of need ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
