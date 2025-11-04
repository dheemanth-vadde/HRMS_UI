import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEAD_ID_PREFIX = "recruitment-style-";

function addLink(id: string, href: string) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function removeLink(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

const routeCssMap: Record<string, string> = {
  "/recruitment/job-postings": "/src/components/recruitment/css/JobPosting.css",
  "/recruitment/candidate-shortlist": "/src/components/recruitment/css/Recruitment.css",
  "/recruitment/interviews": "/src/components/recruitment/css/Calender.css",
  "/recruitment/bulk-upload": "/src/components/recruitment/css/bulkUpload.css",
  "/recruitment/master/skill": "/src/components/recruitment/css/Skill.css",
  "/recruitment/master/location": "/src/components/recruitment/css/Location.css",
  "/recruitment/master/department": "/src/components/recruitment/css/Department.css",
  "/recruitment/master/job-grade": "/src/components/recruitment/css/JobGrade.css",
  "/recruitment/master/position": "/src/components/recruitment/css/Position.css",
  "/recruitment/master/template": "/src/components/recruitment/css/Editor.css",
};

const bootstrapHref = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
const overridesHref = "/src/components/recruitment/css/custom-bootstrap-overrides.css";

const RecruitmentStyleManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const inRecruitment =
      path.startsWith("/recruitment") || path.startsWith("/recruitment/master");

    // 🧹 Always clean before applying new styles
    Object.keys(routeCssMap).forEach((p) =>
      removeLink(HEAD_ID_PREFIX + sanitizeId(p))
    );
    removeLink(HEAD_ID_PREFIX + "bootstrap");
    removeLink(HEAD_ID_PREFIX + "overrides");

    if (inRecruitment) {
      // Add bootstrap + overrides
      addLink(HEAD_ID_PREFIX + "bootstrap", bootstrapHref);
      addLink(HEAD_ID_PREFIX + "overrides", overridesHref);

      // Add page-specific CSS
      const normalizedPath = path.replace(/\/+$/, "");
      const matchingRoute = Object.keys(routeCssMap).find((p) =>
        normalizedPath.startsWith(p.toLowerCase())
      );
      if (matchingRoute) {
        addLink(
          HEAD_ID_PREFIX + sanitizeId(matchingRoute),
          routeCssMap[matchingRoute]
        );
      }
    } else {
      // 🧼 Hard reset to ensure Tailwind fully re-applies
      requestAnimationFrame(() => {
        document.body.style.cssText = ""; // remove inline bootstrap resets
        document.querySelectorAll("style, link").forEach((el) => {
          if (
            el.id.startsWith(HEAD_ID_PREFIX) ||
            (el instanceof HTMLLinkElement &&
              el.href.includes("bootstrap"))
          ) {
            el.remove();
          }
        });

        // Force reflow to re-trigger Tailwind cascade
        void document.body.offsetHeight;
      });
    }
  }, [location.pathname]);

  return <div className="recruitment-module">{children}</div>;
};

function sanitizeId(p: string) {
  return p.replace(/[^a-z0-9_-]/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export default RecruitmentStyleManager;
