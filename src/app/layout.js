import { Inter } from "next/font/google";
import "./theme/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from './theme';
import { UserProvider } from './context/UserContext';
import { GetProvider } from "@/lib/getFirebase";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IC BUFFET",
  description: "IC Buffet - Reservas online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <GetProvider>
              {children}
            </GetProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
