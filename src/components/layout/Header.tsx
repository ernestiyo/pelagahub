import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex items-center py-4">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/logo/logopelagahub.png"
            alt="PelagaHub"
            width={601}
            height={210}
            className="h-8 w-auto"
          />
        </Link>
      </Container>
    </header>
  );
}
