import { Button } from "@/shared/ui/button";
import { Header } from "@/widgets/header/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button>Test button</Button>
      </main>
    </>
  );
}
