import "./PageShellT.css";
import "./PageShellT-responsive.css";

export default function PageShell({ children }) {
  return (
    <main className="page-shell-t">
      <div className="page-shell-t__container">{children}</div>
    </main>
  );
}
