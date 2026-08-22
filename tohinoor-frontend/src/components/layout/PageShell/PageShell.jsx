import "./PageShell.css";
import "./PageShell-responsive.css";

export default function PageShell({ children }) {
  return (
    <main className="page-shell">
      <div className="page-shell__container">{children}</div>
    </main>
  );
}
