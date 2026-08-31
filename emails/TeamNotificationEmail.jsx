import { Heading, Hr, Link, Section, Text } from "@react-email/components";
import EmailLayout from "./components/EmailLayout";
import { BRAND } from "./constants";

function DetailRow({ label, value, href }) {
  return (
    <Section style={detailRow}>
      <Text style={detailLabel}>{label}</Text>
      {href ? (
        <Link href={href} style={detailValueLink}>{value}</Link>
      ) : (
        <Text style={detailValue}>{value}</Text>
      )}
    </Section>
  );
}

function getFormLabels(formSource) {
  if (formSource === "quote") {
    return {
      badge: "New quote request",
      intro:
        "A new quote request was submitted through the RedSpider home page form.",
      formName: "Request a Quote",
    };
  }

  return {
    badge: "New website enquiry",
    intro:
      "A new enquiry was submitted through the RedSpider contact page form.",
    formName: "Contact Us",
  };
}

export default function TeamNotificationEmail({
  name = "",
  email = "",
  phone = "",
  subject = "",
  content = "",
  ipAddress = "Unknown",
  location = "Unknown",
  formCountry = "",
  formSource = "contact",
  logoUrl = "",
}) {
  const labels = getFormLabels(formSource);

  return (
    <EmailLayout
      preview={`${labels.badge} from ${name}: ${subject}`}
      logoUrl={logoUrl}
    >
      <Section style={badge}>{labels.badge}</Section>

      <Heading style={heading}>{subject}</Heading>

      <Text style={intro}>{labels.intro}</Text>

      <Section style={detailsCard}>
        <DetailRow label="Form" value={labels.formName} />
        <DetailRow label="Name" value={name} />
        <DetailRow label="Email" value={email} href={`mailto:${email}`} />
        <DetailRow
          label="Phone"
          value={phone}
          href={`tel:${phone.replace(/\s/g, "")}`}
        />
        <DetailRow label="Enquiry about" value={subject} />
        <DetailRow label="IP address" value={ipAddress} />
        <DetailRow label="Location" value={location} />
        {formCountry ? (
          <DetailRow label="Country selected" value={formCountry} />
        ) : null}
      </Section>

      <Hr style={divider} />

      <Text style={messageLabel}>Message</Text>
      <Section style={messageBox}>
        <Text style={messageText}>{content}</Text>
      </Section>

      <Text style={replyHint}>
        Reply directly to this email to respond to{" "}
        <Link href={`mailto:${email}`} style={inlineLink}>{name}</Link>.
      </Text>
    </EmailLayout>
  );
}

const badge = {
  backgroundColor: BRAND.red,
  borderRadius: "999px",
  color: BRAND.white,
  display: "inline-block",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.04em",
  lineHeight: "1",
  margin: "0 0 16px",
  padding: "8px 14px",
  textTransform: "uppercase",
};

const heading = {
  color: BRAND.text,
  fontSize: "22px",
  fontWeight: "700",
  lineHeight: "30px",
  margin: "0 0 12px",
};

const intro = {
  color: BRAND.muted,
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 20px",
};

const detailsCard = {
  backgroundColor: "#f9fafb",
  border: `1px solid ${BRAND.border}`,
  borderRadius: "10px",
  padding: "4px 16px",
};

const detailRow = {
  borderBottom: `1px solid ${BRAND.border}`,
  padding: "12px 0",
};

const detailLabel = {
  color: BRAND.muted,
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "0.03em",
  lineHeight: "18px",
  margin: "0 0 4px",
  textTransform: "uppercase",
};

const detailValue = {
  color: BRAND.text,
  fontSize: "15px",
  lineHeight: "22px",
  margin: "0",
};

const detailValueLink = {
  color: BRAND.red,
  fontSize: "15px",
  lineHeight: "22px",
  textDecoration: "none",
  fontWeight: "600",
};

const divider = {
  borderColor: BRAND.border,
  margin: "24px 0 16px",
};

const messageLabel = {
  color: BRAND.muted,
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "0.03em",
  lineHeight: "18px",
  margin: "0 0 8px",
  textTransform: "uppercase",
};

const messageBox = {
  backgroundColor: BRAND.white,
  border: `1px solid ${BRAND.border}`,
  borderRadius: "10px",
  padding: "16px 18px",
};

const messageText = {
  color: BRAND.text,
  fontSize: "15px",
  lineHeight: "26px",
  margin: "0",
  whiteSpace: "pre-wrap",
};

const replyHint = {
  color: BRAND.muted,
  fontSize: "13px",
  lineHeight: "22px",
  margin: "20px 0 0",
};

const inlineLink = {
  color: BRAND.red,
  textDecoration: "none",
  fontWeight: "600",
};
