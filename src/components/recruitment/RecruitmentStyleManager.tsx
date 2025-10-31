import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Dynamically inject and remove <link> tags for recruitment module styles.
// - Loads Bootstrap CSS and a project-specific override when the recruitment
//   parent route is entered.
// - Loads per-route CSS files (if mapped) when navigating between recruitment
//   child routes.
// - Removes all recruitment-related links when unmounted.

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
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

// Map pathname -> CSS file (relative to project public/build location or served path).
// These paths assume the CSS files are served from the app (bundled). We point
// to the same relative path used in the repo so the bundler resolves them in dev
// and production. Adjust paths if your build outputs CSS under a different folder.
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
  "/recruitment/master/offer-template": "/src/components/recruitment/css/Editor.css",
};

const bootstrapHref = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
// Project-specific overrides that expect bootstrap variables / classes to exist
const overridesHref = "/src/components/recruitment/css/custom-bootstrap-overrides.css";

const RecruitmentStyleManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Mount bootstrap + overrides once when manager mounts
    addLink(HEAD_ID_PREFIX + "bootstrap", bootstrapHref);
    addLink(HEAD_ID_PREFIX + "overrides", overridesHref);

    return () => {
      // Remove all recruitment links on unmount (i.e., leaving recruitment module)
      removeLink(HEAD_ID_PREFIX + "bootstrap");
      removeLink(HEAD_ID_PREFIX + "overrides");

      // Remove any route-specific css links
      Object.keys(routeCssMap).forEach((p) => {
        const id = HEAD_ID_PREFIX + sanitizeId(p);
        removeLink(id);
      });
    };
  }, []);

  useEffect(() => {

    // Remove all previously added route-specific CSS links

    Object.keys(routeCssMap).forEach((p) => {

      const id = HEAD_ID_PREFIX + sanitizeId(p);

      removeLink(id);

    });

    // Find the first route CSS that matches the current path prefix

    const normalizedPath = location.pathname.toLowerCase().replace(/\/+$/, ""); // remove trailing slash

    const matchingRoute = Object.keys(routeCssMap).find((p) =>
      normalizedPath.startsWith(p.toLowerCase())
    );

    if (matchingRoute) {

      const id = HEAD_ID_PREFIX + sanitizeId(matchingRoute);

      addLink(id, routeCssMap[matchingRoute]);

    }

  }, [location.pathname]);


  return <>{children}</>;
};

function sanitizeId(p: string) {
  return p.replace(/[^a-z0-9_-]/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export default RecruitmentStyleManager;