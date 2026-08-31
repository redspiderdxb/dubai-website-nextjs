import Head from "next/head";
import Link from "next/link";

const TEMPLATES = [
  {
    id: "thank-you",
    title: "Thank you email",
    description: "Sent to the user after they submit a contact form.",
  },
  {
    id: "team-notification",
    title: "Team notification",
    description: "Sent to your team when a new enquiry is received.",
  },
];

export default function EmailPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <main style={pageStyle}>
        <p>Email preview is only available in development.</p>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Email template preview · RedSpider</title>
      </Head>

      <main style={pageStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>Email template preview</h1>
          <p style={subtitleStyle}>
            Preview branded Resend templates with sample data. Run{" "}
            <code style={codeStyle}>npm run dev</code> and open each template below.
          </p>
        </header>

        <div style={gridStyle}>
          {TEMPLATES.map((template) => (
            <section key={template.id} style={cardStyle}>
              <h2 style={cardTitleStyle}>{template.title}</h2>
              <p style={cardTextStyle}>{template.description}</p>

              <div style={actionsStyle}>
                <Link
                  href={`/api/email-preview/${template.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={primaryButtonStyle}
                >
                  Open in new tab
                </Link>

                <Link href={`/email-preview/${template.id}`} style={secondaryButtonStyle}>
                  Preview inline
                </Link>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f3f4f6",
  padding: "40px 20px",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const headerStyle = {
  maxWidth: "960px",
  margin: "0 auto 32px",
};

const titleStyle = {
  margin: "0 0 8px",
  fontSize: "28px",
  color: "#111827",
};

const subtitleStyle = {
  margin: 0,
  color: "#6b7280",
  lineHeight: 1.6,
};

const codeStyle = {
  background: "#e5e7eb",
  borderRadius: "6px",
  padding: "2px 6px",
  fontSize: "14px",
};

const gridStyle = {
  maxWidth: "960px",
  margin: "0 auto",
  display: "grid",
  gap: "20px",
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "24px",
};

const cardTitleStyle = {
  margin: "0 0 8px",
  fontSize: "20px",
  color: "#111827",
};

const cardTextStyle = {
  margin: "0 0 20px",
  color: "#6b7280",
  lineHeight: 1.6,
};

const actionsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
};

const primaryButtonStyle = {
  display: "inline-block",
  background: "#d42b2b",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "8px",
  padding: "10px 16px",
  fontWeight: 600,
  fontSize: "14px",
};

const secondaryButtonStyle = {
  display: "inline-block",
  background: "#ffffff",
  color: "#d42b2b",
  textDecoration: "none",
  border: "1px solid #fecaca",
  borderRadius: "8px",
  padding: "10px 16px",
  fontWeight: 600,
  fontSize: "14px",
};
