import { WindowProvider } from "@/components/os/WindowManager";
import { Desktop } from "@/components/os/Desktop";
import { ThemeProvider } from "@/components/os/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider><WindowProvider><Desktop /></WindowProvider></ThemeProvider>
  );
}
