import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="text-2xl font-medium">MEHRAZ main</div>
      <Link href="/admin">Go to Admin Panel</Link>
    </main>
  );
}
