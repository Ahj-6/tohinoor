import "./NotFound.css";
import "./NotFound-responsive.css";

import { Link } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
        <section className="not-found">
            <div className="not-found__code">404</div>

            <h1 className="not-found__title">
            صفحه مورد نظر یافت نشد
            </h1>

            <p className="not-found__message">
            آدرس وارد شده معتبر نیست یا صفحه مورد نظر وجود ندارد
            </p>

            <Link to="/" className="not-found__button">
                بازگشت به صفحه اصلی
            </Link>
        </section>
    </PageShell>
  );
}