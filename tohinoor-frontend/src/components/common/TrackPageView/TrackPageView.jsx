import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../../api/axios";

const VISITOR_ID_KEY = "tohinoor_visitor_id";

function getVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

export default function TrackPageView() {
  const location = useLocation();

  useEffect(() => {
    // مسیر صفحه؛ پارامترهای جست‌وجو و hash ثبت نمی‌شوند.
    const path = location.pathname;

    // برای هر مسیر، فقط یک بار در هر بار ورود به آن ثبت می‌کنیم.
    const visitorId = getVisitorId();

    api.post("/page-views", {
      path,
      visitor_id: visitorId,
    }).catch((error) => {
      console.error("خطا در ثبت بازدید صفحه:", error);
    });
  }, [location.pathname]);

  return null;
}
