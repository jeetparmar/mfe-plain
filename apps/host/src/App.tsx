import { lazy, Suspense } from "react";

const Header = lazy(() => import("header/Header"));
const Content = lazy(() => import("content/Content"));

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Header />
      <Content />
      <footer>
        <p>This footer is in the host app (port 3000).</p>
      </footer>
    </Suspense>
  );
}
