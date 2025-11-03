import { useEffect } from 'react';
import TemplateEditor from "./TemplateEditor";
import '../../css/Editor.css';

export function addStylesheet(id, href) {
  if (typeof document === "undefined") return;
  // Remove if exists to ensure it's the last stylesheet
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export function removeStylesheet(id) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.remove();
}

export default function TemplateMainCompo() {
  useEffect(() => {
    const BOOTSTRAP_ID = "bootstrap-override-css";
    const BOOTSTRAP_HREF = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
    const OVERRIDES_HREF = "/src/components/recruitment/css/custom-bootstrap-overrides.css";
    
    // Load Bootstrap and overrides
    addStylesheet(BOOTSTRAP_ID, BOOTSTRAP_HREF);
    addStylesheet(`${BOOTSTRAP_ID}-overrides`, OVERRIDES_HREF);

    // Cleanup function
    return () => {
      removeStylesheet(BOOTSTRAP_ID);
      removeStylesheet(`${BOOTSTRAP_ID}-overrides`);
    };
  }, []);

  return (
    <div className="studio-wrap">
      <TemplateEditor />
    </div>
  );
}