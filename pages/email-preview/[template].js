import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const TEMPLATE_LABELS = {
  "thank-you": "Thank you email",
  "team-notification": "Team notification",
};

export default function EmailPreviewInlinePage() {
  const router = useRouter();
  const template = String(router.query.template || "");
  const label = TEMPLATE_LABELS[template] || "Email preview";

  if (process.env.NODE_ENV === "production") {
    return (
      <main style={pageStyle}>
        <p>Email preview is only available in development.</p>
      </main>
    );
  }

  if (!router.isReady) {
    return (
      <main style={pageStyle}>
        <p>Loading preview…</p>
      </main>
    );
  }

  if (!TEMPLATE_LABELS[template]) {
    return (
      <main style={pageStyle}>
        <p>Unknown template.</p>
        <Link href="/email-preview">Back to email preview</Link>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{label} · Email preview</title>
      </Head>

      <div style={toolbarStyle}>
        <Link href="/email-preview" style={backLinkStyle}>← All templates</Link>
        <span style={toolbarTitleStyle}>{label}</span>
        <a
          href={`/api/email-preview/${template}`}
          target="_blank"
          rel="noopener noreferrer"
          style={openTabStyle}
        >
          Open in new tab
        </a>
      </div>

      <iframe
        title={label}
        src={`/api/email-preview/${template}`}
        style={iframeStyle}
      />
    </>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "40px 20px",
  fontFamily: "Karla, sans-serif",
};

const toolbarStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "12px 20px",
  background: "#111827",
  color: "#ffffff",
  fontFamily: "Karla, sans-serif",
};

const backLinkStyle = {
  color: "#f9fafb",
  textDecoration: "none",
  fontSize: "14px",
};

const toolbarTitleStyle = {
  flex: 1,
  fontSize: "14px",
  fontWeight: 600,
};

const openTabStyle = {
  color: "#fca5a5",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 600,
};

const iframeStyle = {
  display: "block",
  width: "100%",
  height: "calc(100vh - 48px)",
  border: "0",
  background: "#f3f4f6",
};
