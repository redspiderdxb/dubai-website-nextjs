import React from "react";

import ServiceHero from "../services/ServiceHero";
import ServiceCTA from "../services/ServiceCTA";

// ============================================================
// HELPERS
// ============================================================

const valueOr = (value, fallback = "") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return value;
};
const safeArray = (value, fallback = []) => {
  if (Array.isArray(value) && value.length > 0) {
    return value;
  }

  // Agar API JSON string bhej rahi hai
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (error) {
      // fallback
    }
  }

  return fallback;
};

// ============================================================
// JSON VALUE PARSER
// ============================================================

const parseJsonValue = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  // JSON object / array hai?
  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch (error) {
      return value;
    }
  }

  return value;
};

// ============================================================
// FIELD TEXT
// ============================================================

const fieldText = (field) => {
  if (field === null || field === undefined) {
    return "";
  }

  // Normal string
  if (typeof field === "string") {
    const parsed = parseJsonValue(field);

    // Agar string ke andar JSON hai
    if (parsed !== field) {
      return fieldText(parsed);
    }

    return field.trim();
  }

  // Object
  if (typeof field === "object") {
    const possibleValues = [
      field.label,
      field.title,
      field.name,
      field.text,
      field.check,
      field.field,
      field.value,
    ];

    for (const value of possibleValues) {
      if (value === null || value === undefined || value === "") {
        continue;
      }

      const parsed = parseJsonValue(value);

      if (typeof parsed === "string") {
        const cleaned = parsed.trim();

        if (cleaned) {
          return cleaned;
        }
      }

      if (typeof parsed === "object") {
        const nestedText = fieldText(parsed);

        if (nestedText) {
          return nestedText;
        }
      }
    }
  }

  return "";
};

// ============================================================
// GET PINT FIELDS
// ============================================================

const getPintFields = (group) => {
  if (!group || typeof group !== "object") {
    return [];
  }

  return (
    group.fields ??
    group.pint_fields ??
    group.pintFields ??
    group.items ??
    group.field_list ??
    []
  );
};

// ============================================================
// SAFE FIELDS
// ============================================================

const safeFields = (fields, fallback = []) => {
  const parsed = parseJsonValue(fields);

  if (Array.isArray(parsed) && parsed.length > 0) {
    return parsed;
  }

  if (typeof parsed === "string") {
    return parsed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return fallback;
};

// ============================================================
// NORMALIZE PINT GROUPS
// ============================================================

const normalizePintGroups = (groups, fallbackGroups = []) => {
  const backendGroups = safeArray(groups, []);

  // Backend se groups nahi aaye
  // to original fallback use hoga
  if (!backendGroups.length) {
    return fallbackGroups;
  }

  return backendGroups.map((group, index) => {
    const fallback = fallbackGroups[index] || {};

    const fields = safeFields(getPintFields(group), fallback.fields || []);

    return {
      ...fallback,
      ...group,

      group_number: valueOr(
        group.group_number,
        fallback.group_number || String(index + 1),
      ),

      icon: valueOr(group.icon, fallback.icon || "receipt_long"),

      title: valueOr(group.title, fallback.title || `Group ${index + 1}`),

      description: valueOr(group.description, fallback.description || ""),

      fields,

      note: valueOr(group.note, fallback.note || ""),
    };
  });
};

// ============================================================
// FALLBACK DATA
// Original HTML data is kept here.
// Backend data will override this automatically.
// ============================================================

const DEFAULT_ERP_LIST = [
  "SAP",
  "Oracle",
  "Microsoft Dynamics 365",
  "Odoo",
  "Zoho",
  "Sage",
  "Infor",
  "Custom ERP",
];

const DEFAULT_PROCESS_STEPS = [
  {
    icon: "receipt_long",
    title: "Invoice Data Created",
    description: "Your ERP or accounting system generates invoice data.",
  },

  {
    icon: "encrypted",
    title: "Secure Data Transfer",
    description: "The data is sent securely to the ZIVORA.ONE API connector.",
  },

  {
    icon: "fact_check",
    title: "Fields Checked",
    description: "Required fields and formats are checked.",
  },

  {
    icon: "data_object",
    title: "PINT AE Conversion",
    description:
      "The invoice is converted into the applicable PINT AE XML structure.",
  },

  {
    icon: "cloud_upload",
    title: "ASP Submission",
    description:
      "The document is submitted to the connected Accredited Service Provider.",
  },

  {
    icon: "settings_suggest",
    title: "Electronic Processing",
    description: "The invoice is validated and electronically processed.",
  },

  {
    icon: "sync",
    title: "Status Returned",
    description:
      "Status updates and acknowledgements are returned to your system.",
  },

  {
    icon: "account_balance",
    title: "Tax Data Reported",
    description:
      "Tax data is reported through the applicable UAE e-Invoicing process.",
  },
];

const DEFAULT_READINESS_ITEMS = [
  {
    number: "01",
    title: "ERP Capability Assessment",
    content: `
      <p>
        We review whether your ERP or accounting software can:
      </p>

      <ul class="zra-list">
        <li>Generate complete invoice information</li>
        <li>Export data through an API or another supported method</li>
        <li>Store the required seller and buyer details</li>
        <li>Manage VAT rates and tax categories</li>
        <li>Produce credit notes and other supported documents</li>
        <li>Receive validation results and status updates</li>
        <li>Maintain a reliable invoice audit trail</li>
      </ul>
    `,
  },

  {
    number: "02",
    title: "Invoice-Type Review",
    content: `
      <p>
        Our team identifies the documents created by your business,
        which may include:
      </p>

      <ul class="zra-list">
        <li>Business-to-business invoices</li>
        <li>Business-to-government invoices</li>
        <li>Export invoices</li>
        <li>Tax credit notes</li>
        <li>Commercial invoices</li>
        <li>Recurring invoices</li>
        <li>Advance-payment invoices</li>
        <li>Self-billing documents, where applicable</li>
      </ul>

      <p class="mt-3 mb-0">
        This review helps determine the fields, validation rules
        and integration flows required for each transaction type.
      </p>
    `,
  },

  {
    number: "03",
    title: "Data-Gap Analysis",
    content: `
      <p class="mb-0">
        Existing invoice templates may not contain every data
        element required under PINT AE. We compare the information
        currently stored in your system with the applicable
        e-Invoice requirements. Missing fields, incorrect formats
        and system limitations are recorded so they can be
        addressed before development begins.
      </p>
    `,
  },

  {
    number: "04",
    title: "Implementation Roadmap",
    content: `
      <p>
        After the assessment, ZIVORA.ONE provides a clear
        implementation plan covering:
      </p>

      <div class="zra-roadmap">
        <span><b>01</b>Required ERP changes</span>
        <span><b>02</b>Field mapping</span>
        <span><b>03</b>API connection requirements</span>
        <span><b>04</b>Validation rules</span>
        <span><b>05</b>Testing stages</span>
        <span><b>06</b>User responsibilities</span>
        <span><b>07</b>Estimated implementation phases</span>
        <span><b>08</b>Go-live preparation</span>
      </div>
    `,
  },
];

const DEFAULT_SYSTEM_CARDS = [
  {
    icon: "enterprise",
    title: "ERP Systems",
    description:
      "Connect enterprise platforms used to manage finance, procurement, sales and business operations.",
  },

  {
    icon: "account_balance_wallet",
    title: "Accounting Software",
    description:
      "Transfer invoice, customer, tax and payment information from your accounting platform.",
  },

  {
    icon: "receipt_long",
    title: "Billing Systems",
    description:
      "Connect subscription, utility, service or usage-based billing solutions.",
  },

  {
    icon: "extension",
    title: "Third-Party Applications",
    description:
      "Integrate industry-specific platforms, custom applications, eCommerce systems or internal business tools.",
  },
];

const DEFAULT_PINT_GROUPS = [
  {
    group_number: "1",
    icon: "receipt_long",
    title: "Invoice Details",
    description:
      "This section identifies the invoice and explains how it should be processed. It may include:",
    fields: [
      "Invoice number",
      "Invoice issue date",
      "Invoice type code",
      "Invoice currency",
      "Transaction type",
      "Payment due date",
      "Business process type",
      "Specification identifier",
      "Payment method",
    ],
    note: "Each invoice should have a unique reference so it can be traced throughout the exchange and reporting process.",
  },

  {
    group_number: "2",
    icon: "store",
    title: "Seller Details",
    description:
      "Seller information identifies the business issuing the invoice. It may include:",
    fields: [
      "Legal business name",
      "Registered address",
      "Electronic address",
      "Electronic identifier",
      "Trade licence information",
      "Tax Registration Number",
      "Tax scheme",
      "City and country",
      "Country subdivision",
      "Country code",
    ],
    note: "The information should match the company’s official registration and tax records.",
  },

  {
    group_number: "3",
    icon: "person_search",
    title: "Buyer Details",
    description:
      "Buyer information identifies the customer receiving the e-Invoice. Depending on the transaction, this may include:",
    fields: [
      "Buyer’s legal name",
      "Electronic address",
      "Electronic identifier",
      "Tax identifier",
      "Tax scheme",
      "Registered address",
      "City",
      "Country subdivision",
      "Country code",
    ],
    note: "Accurate buyer information is important because the invoice is electronically routed to the receiving business.",
  },

  {
    group_number: "4",
    icon: "calculate",
    title: "Document Totals",
    description:
      "This group explains how the final invoice value was calculated. It may contain:",
    fields: [
      "Total value of invoice lines",
      "Total amount excluding VAT",
      "Total VAT amount",
      "Total amount including VAT",
      "Allowances",
      "Additional charges",
      "Paid amount",
      "Rounding adjustment",
      "Payable amount",
    ],
    note: "The totals must match the values calculated from the invoice lines and VAT breakdown.",
  },

  {
    group_number: "5",
    icon: "percent",
    title: "Tax Breakdown",
    description:
      "The tax section provides a clear calculation for each applicable VAT category. It can include:",
    fields: [
      "Taxable amount",
      "VAT amount",
      "Tax category code",
      "VAT rate",
      "Exemption information, where relevant",
    ],
    note: "ZIVORA.ONE checks the relationship between taxable values, VAT rates and calculated tax amounts before submission.",
  },

  {
    group_number: "6",
    icon: "format_list_numbered",
    title: "Invoice Lines",
    description:
      "Every product or service is recorded as a separate invoice line. An invoice line may include:",
    fields: [
      "Line identifier",
      "Item name",
      "Item description",
      "Quantity",
      "Unit of measurement",
      "Unit price",
      "Price base quantity",
      "Net line amount",
      "Tax category",
      "VAT rate",
      "VAT amount",
      "Allowances or charges",
    ],
    note: "Structured line-level information allows invoices to be processed with less manual data entry.",
  },
];

const DEFAULT_INVOICE_FEATURES = [
  {
    icon: "domain",
    label: "Seller and buyer information",
  },

  {
    icon: "verified",
    label: "Tax Registration Numbers",
  },

  {
    icon: "receipt_long",
    label: "Invoice number and issue date",
  },

  {
    icon: "event",
    label: "Payment due date",
  },

  {
    icon: "currency_exchange",
    label: "Currency and payment details",
  },

  {
    icon: "schema",
    label: "Process and specification references",
  },

  {
    icon: "inventory_2",
    label: "Product or service details",
  },

  {
    icon: "calculate",
    label: "Quantities and prices",
  },

  {
    icon: "percent",
    label: "VAT category and rate",
  },

  {
    icon: "account_balance",
    label: "Taxable amount and VAT",
  },

  {
    icon: "payments",
    label: "Total payable amount",
  },

  {
    icon: "qr_code_2",
    label: "QR or verification reference",
  },
];

const DEFAULT_VALIDATION_CHECKS = [
  "Required fields",
  "Accepted data formats",
  "Seller and buyer identifiers",
  "Currency codes",
  "Invoice type codes",
  "VAT calculations",
  "Invoice-line totals",
  "Document totals",
  "Duplicate invoice references",
  "XML structure",
  "Applicable business rules",
];

const DEFAULT_WHY_CHOOSE = [
  {
    icon: "cloud",
    title: "Lower Initial Setup Requirements",
    description:
      "A cloud-based API connection can reduce the need for new on-premise infrastructure. The final setup cost depends on your ERP, data quality, document volume and customisation requirements.",
  },

  {
    icon: "monitoring",
    title: "Scalable Processing",
    description:
      "The service can support growing transaction volumes without requiring your team to manage a separate e-Invoicing infrastructure.",
  },

  {
    icon: "speed",
    title: "Faster Validation",
    description:
      "Invoices are checked before or during submission, helping businesses identify missing or incorrect information earlier.",
  },

  {
    icon: "visibility",
    title: "Better Visibility",
    description:
      "Finance teams can monitor invoice status, processing results and failed submissions from a central system.",
  },

  {
    icon: "automation",
    title: "Reduced Manual Work",
    description:
      "Automated data transfer can reduce repeated data entry and the risk of copying invoice information incorrectly.",
  },

  {
    icon: "account_balance",
    title: "Easier Reconciliation",
    description:
      "Consistent invoice identifiers, structured line items and returned status information can support accounting reconciliation and audit reviews.",
  },
];

// ============================================================
// COMPONENT
// ============================================================

export default function CrmTemplate({ data }) {
  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  // ==========================================================
  // BACKEND DATA + FALLBACK
  // ==========================================================

  const heroTitle = valueOr(data.hero_title, "CRM Software");

  const heroHighlight = valueOr(data.hero_highlight, "UAE e-Invoicing");

  const heroDescription = valueOr(
    data.hero_description,
    "ZIVORA.ONE helps businesses prepare their existing ERP, accounting, billing or invoicing software for UAE e Invoicing. Our API connector works as a secure bridge between your business system and a UAE Accredited Service Provider. It converts invoice data into the required structured format, validates the information and supports electronic document exchange without replacing your existing software.",
  );

  // ==========================================================
  // ABOUT / ERP INTEGRATION & COMPLIANCE
  // ==========================================================

  const aboutLabel = valueOr(data.about_label, "UAE e-Invoicing CRM Software");

  const rawAboutHeading = data?.about_heading;
  const isDefaultHeading =
    !rawAboutHeading ||
    rawAboutHeading.includes("Whether your company uses SAP");

  let aboutMainContent = null;
  let aboutNoticeAlert =
    "A PDF, scanned document, image or emailed invoice is not considered an e-Invoice.";
  let aboutNoticeDetails =
    "An e-Invoice must contain structured, machine-readable data that can be electronically exchanged and reported.";

  if (isDefaultHeading) {
    aboutMainContent = (
      <>
        Whether your company uses <strong>SAP</strong>, <strong>Oracle</strong>,{" "}
        <strong>Microsoft Dynamics 365</strong>, <strong>Odoo</strong>,{" "}
        <strong>Zoho</strong>, <strong>Sage</strong>, <strong>Infor</strong> or
        a <strong>custom ERP</strong>,{" "}
        <span className="rs-crm-highlight">ZIVORA.ONE</span> can provide a
        practical integration path.
      </>
    );
  } else {
    const cleanText = rawAboutHeading.replace(/<br\s*\/?>/gi, " ");
    const match = cleanText.match(/Important\s*:\s*([\s\S]+)/i);
    if (match) {
      const mainPart = cleanText.replace(/Important\s*:\s*[\s\S]+/i, "").trim();
      aboutMainContent = (
        <span dangerouslySetInnerHTML={{ __html: mainPart }} />
      );
      aboutNoticeAlert = match[1].trim();
      aboutNoticeDetails = "";
    } else {
      aboutMainContent = (
        <span dangerouslySetInnerHTML={{ __html: rawAboutHeading }} />
      );
      if (data.about_notice) {
        aboutNoticeAlert = data.about_notice;
        aboutNoticeDetails = data.about_notice_details || "";
      }
    }
  }

  const erpList = safeArray(data.erp_list, DEFAULT_ERP_LIST);

  // ==========================================================
  // API
  // ==========================================================

  const apiKicker = valueOr(data.api_kicker, "API as a Service");

  const apiTitle = valueOr(
    data.api_title,
    `
        Keep Your Existing ERP. Add
        <span><br/>e-Invoicing Capability.</span>
      `,
  );

  const apiDescription = valueOr(
    data.api_description,
    "The ZIVORA.ONE API-as-a-Service model allows businesses to connect their current invoicing system to the UAE e-Invoicing network through a preconfigured API connector.",
  );

  const apiDescription2 = valueOr(
    data.api_description_2,
    "Your team can continue creating invoices inside the existing ERP or accounting platform. ZIVORA.ONE receives the required invoice data, checks it and prepares it for processing through the connected Accredited Service Provider.",
  );

  const apiBenefit = valueOr(
    data.api_benefit_text,
    "This approach reduces the need for major changes to your daily operations.",
  );

  // ==========================================================
  // IMAGE FALLBACK
  // ==========================================================

  const apiImage = valueOr(
    data.api_image,
    "/assets/img/crm-img/API-system-integration.webp",
  );

  const readinessImage = valueOr(
    data.readiness_image,
    "/assets/img/crm-img/pre-requests.webp",
  );

  const systemsImage = valueOr(
    data.systems_image,
    "/assets/img/crm-img/API-system-integration.webp",
  );

  // ==========================================================
  // PROCESS
  // ==========================================================

  const processTitle = valueOr(data.process_title, "How the Integration Works");

  const processSubtitle = valueOr(
    data.process_subtitle,
    "Invoice information moves securely from your existing system through validation, conversion, processing and government reporting.",
  );

  const processSteps = safeArray(data.process_steps, DEFAULT_PROCESS_STEPS);

  // ==========================================================
  // READINESS
  // ==========================================================

  const readinessKicker = valueOr(
    data.readiness_kicker,
    "Pre-Requisite Readiness Assessment",
  );

  const readinessTitle = valueOr(
    data.readiness_title,
    `
        Know What Needs to Be Updated
        <span>Before Integration</span>
      `,
  );

  const readinessDescription = valueOr(
    data.readiness_description,
    "Every business has a different accounting setup. Before connecting the API, ZIVORA.ONE reviews your current system, invoice formats and available data.",
  );

  const readinessDescription2 = valueOr(
    data.readiness_description_2,
    "The readiness assessment helps identify technical or information gaps before implementation begins.",
  );

  const readinessItems = safeArray(
    data.readiness_items,
    DEFAULT_READINESS_ITEMS,
  );

  // ==========================================================
  // SYSTEMS
  // ==========================================================

  const systemsKicker = valueOr(
    data.systems_kicker,
    "Connect Multiple Business Systems",
  );

  const systemsTitle = valueOr(
    data.systems_title,
    `
        One Connector for Your
        <span>Invoicing Environment</span>
      `,
  );

  const systemsDescription = valueOr(
    data.systems_description,
    "The ZIVORA.ONE API can connect different systems involved in creating or managing invoices.",
  );

  const systemsNote = valueOr(
    data.systems_note,
    "Supported integration depends on the API, export capabilities and data structure available in each system.",
  );

  const systemCards = safeArray(data.system_cards, DEFAULT_SYSTEM_CARDS);

  // ==========================================================
  // PINT
  // ==========================================================

  const pintKicker = valueOr(data.pint_kicker, "PINT AE e-Invoice Format");

  const pintTitle = valueOr(
    data.pint_title,
    `
        Structured XML for
        <span>Electronic Processing</span>
      `,
  );

  const pintDescription = valueOr(
    data.pint_description,
    "PINT AE is the UAE-specific invoice data specification used to structure e-Invoice information for electronic exchange.",
  );

  const pintDescription2 = valueOr(
    data.pint_description_2,
    "Instead of sending only a visual document, the system produces structured XML data. This allows invoice information to be read, checked and processed automatically by different business platforms.",
  );

  const pintDescription3 = valueOr(
    data.pint_description_3,
    "The required information is organised into six main groups.",
  );

  const pintGroups = normalizePintGroups(data.pint_groups, DEFAULT_PINT_GROUPS);
  // ==========================================================
  // INVOICE
  // ==========================================================

  const invoiceKicker = valueOr(
    data.invoice_kicker,
    "UAE Electronic Tax Invoice",
  );

  const invoiceTitle = valueOr(
    data.invoice_title,
    `
        A Clear Business Document
        <span class="rs-red">
          Supported by Structured Data
        </span>
      `,
  );

  const invoiceDescription = valueOr(
    data.invoice_description,
    "ZIVORA.ONE can produce a readable tax invoice for business use while maintaining the structured information required for electronic processing.",
  );

  const invoiceDescription2 = valueOr(
    data.invoice_description_2,
    "A typical invoice can display:",
  );

  const invoiceFeatures = safeArray(
    data.invoice_features,
    DEFAULT_INVOICE_FEATURES,
  );

  // ==========================================================
  // VALIDATION
  // ==========================================================

  const validationTitle = valueOr(
    data.validation_title,
    `
        Invoice Validation and
        <span>Status Updates</span>
      `,
  );

  const validationDescription = valueOr(
    data.validation_description,
    "Before an invoice is processed, ZIVORA.ONE can check required information and basic calculation consistency.",
  );

  const validationChecks = safeArray(
    data.validation_checks,
    DEFAULT_VALIDATION_CHECKS,
  );

  // ==========================================================
  // WHY CHOOSE
  // ==========================================================

  const whyChooseKicker = valueOr(
    data.whychoose_kicker,
    "Why Choose ZIVORA.ONE?",
  );

  const whyChooseTitle = valueOr(
    data.whychoose_title,
    `
        Practical Integration
        <span>Without Replacing Your ERP</span>
      `,
  );

  const whyChooseDescription = valueOr(
    data.whychoose_description,
    "ZIVORA.ONE is designed to add e-Invoicing capability to the tools your business already uses.",
  );

  const whyChooseBenefits = safeArray(
    data.why_choose_benefits,
    DEFAULT_WHY_CHOOSE,
  );

  // ==========================================================
  // CTA
  // ==========================================================

  const ctaTitle = valueOr(
    data.cta_title,
    `
        Start Your
        <span>e-Invoicing Readiness Assessment</span>
      `,
  );

  const ctaDescription = valueOr(
    data.cta_description,
    "Prepare your business systems for structured electronic invoicing with a clear, manageable implementation process.",
  );

  const ctaDescription2 = valueOr(
    data.cta_description_2,
    "ZIVORA.ONE can help you assess your ERP, map invoice fields, connect the required API, test invoice data and prepare your team for implementation.",
  );

  const ctaButton1 = valueOr(
    data.cta_button_text_1,
    "Request a Readiness Assessment",
  );

  const ctaButtonUrl1 = valueOr(data.cta_button_url_1, "#");

  const ctaButton2 = valueOr(data.cta_button_text_2, "Discuss API Integration");

  const ctaButtonUrl2 = valueOr(data.cta_button_url_2, "#");

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <main className="main">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="crm-hero hero-marquee">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12" data-aos="fade-right">
              <div className="rs-process-title-sec">
                <h1 className="rs-process-title mb-3">
                  <span className="rs-process-highlight fdf">
                    {heroHighlight}

                    <svg
                      className="rs-process-underline"
                      viewBox="0 0 320 22"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M5 16 C70 8,130 20,195 13 S270 10,315 14" />
                    </svg>
                  </span>

                  {heroTitle}
                </h1>

                <p className="rs-process-text mb-3">{heroDescription}</p>

                <a
                  href={data.cta_button_link || data.cta_button_url_1 || "#"}
                  className="btn btn-animation btn-red d-inline-flex align-items-center mt-4"
                >
                  <span className="btn-title">
                    {valueOr(data.cta_button_text, "Get in Touch")}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          ABOUT / ERP INTEGRATION & COMPLIANCE
      ====================================================== */}

      <section className="rs-crm-about-section">
        <div className="container">
          <div
            className="rs-crm-about-wrapper"
            data-aos="fade-up"
            data-aos-duration="750"
          >
            <div className="row g-4 g-xl-5 align-items-center">
              {/* Left Column: Badge, Main Heading, ERP Chips */}
              <div className="col-lg-7">
                <div className="rs-crm-about-main-col">
                  <div className="rs-crm-about-badge">
                    <span className="rs-crm-badge-dot"></span>
                    <span>{aboutLabel}</span>
                  </div>

                  <h2 className="rs-crm-about-heading">{aboutMainContent}</h2>

                  <div className="rs-crm-erp-chips">
                    <span className="rs-crm-erp-label">
                      Compatible ERP Platforms:
                    </span>
                    <div className="rs-crm-chips-list">
                      {erpList.map((erp, idx) => (
                        <span key={idx} className="rs-crm-chip">
                          <span className="rs-crm-chip-check">✓</span>
                          {typeof erp === "string"
                            ? erp
                            : erp.name || erp.title || ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Important Regulatory Notice Card */}
              <div className="col-lg-5">
                <aside
                  className="rs-crm-notice-card"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  <div className="rs-crm-notice-header">
                    <span className="rs-crm-notice-icon" aria-hidden="true">
                      <span className="material-symbols-outlined">
                        warning_amber
                      </span>
                    </span>
                    <div>
                      <span className="rs-crm-notice-kicker">
                        UAE Compliance Rule
                      </span>
                      <h3 className="rs-crm-notice-title">
                        What is an e-Invoice?
                      </h3>
                    </div>
                  </div>

                  <div className="rs-crm-notice-body">
                    <p className="rs-crm-notice-alert">
                      <strong>Important:</strong> {aboutNoticeAlert}
                    </p>
                    {aboutNoticeDetails && (
                      <p className="rs-crm-notice-desc">{aboutNoticeDetails}</p>
                    )}
                  </div>

                  <div className="rs-crm-notice-footer">
                    <span className="rs-crm-notice-tag">
                      <span className="material-symbols-outlined">
                        data_object
                      </span>
                      Structured XML Data
                    </span>
                    <span className="rs-crm-notice-tag">
                      <span className="material-symbols-outlined">
                        verified
                      </span>
                      PINT AE Compliant
                    </span>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          API SERVICE
      ====================================================== */}

      <section className="rs-api-service-section">
        <div className="container rs-api-container">
          <div className="row align-items-stretch g-4 g-xl-5">
            <div
              className="col-lg-7"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="rs-api-kicker">{apiKicker}</div>

              <div
                className="rs-api-title"
                dangerouslySetInnerHTML={{
                  __html: apiTitle,
                }}
              />

              <p className="rs-api-copy">{apiDescription}</p>

              <p className="rs-api-copy">{apiDescription2}</p>

              <div className="rs-api-benefit">
                <i className="bi bi-check2-square" aria-hidden="true"></i>

                <span>{apiBenefit}</span>
              </div>
            </div>

            <div
              className="col-lg-5"
              data-aos="fade-left"
              data-aos-duration="850"
              data-aos-delay="120"
            >
              <div className="rs-api-crm-visual">
                <img
                  src={apiImage}
                  alt="ZIVORA.ONE API System Integrators software"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          {/* PROCESS */}

          <div className="rs-api-process">
            <div
              className="rs-api-process-head"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              <h2
                className="rs-api-process-title"
                dangerouslySetInnerHTML={{
                  __html: processTitle,
                }}
              />

              <p className="rs-api-process-subtitle">{processSubtitle}</p>
            </div>

            <div className="row g-3 g-lg-4">
              {processSteps.map((step, index) => (
                <div
                  className="col-md-6 col-xl-3"
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 60}
                  key={step.id || index}
                >
                  <article className="rs-api-step">
                    <div className="rs-api-icon" aria-hidden="true">
                      <span className="material-symbols-outlined">
                        {valueOr(step.icon, "receipt_long")}
                      </span>
                    </div>

                    <div>
                      <h3>{step.title}</h3>

                      <p>{step.description}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            <div
              className="rs-api-framework"
              data-aos="fade-up"
              data-aos-duration="750"
            >
              <i className="bi bi-diagram-3" aria-hidden="true"></i>

              <div>
                <strong>UAE Five-Corner Framework</strong>

                <p>
                  The UAE model uses a decentralized five-corner framework
                  involving the supplier, buyer, their Accredited Service
                  Providers and the government reporting platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          READINESS
      ====================================================== */}

      <section className="zivora-readiness-accordion">
        <div className="container">
          <div className="row g-4 g-xl-5 align-items-start">
            <div className="col-lg-5">
              <div className="zra-left" data-aos="fade-right">
                <div className="zra-kicker">{readinessKicker}</div>

                <div
                  className="zra-title"
                  dangerouslySetInnerHTML={{
                    __html: readinessTitle,
                  }}
                />

                <p className="zra-intro">{readinessDescription}</p>

                <p className="zra-intro">{readinessDescription2}</p>

                <div className="zra-image-shell">
                  <img
                    src={readinessImage}
                    className="img-fluid"
                    alt="ZIVORA.ONE pre-requisite readiness assessment and API integration model"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="accordion zra-accordion" id="readinessAccordion">
                {readinessItems.map((item, index) => {
                  const itemNumber = valueOr(
                    item.number,
                    String(index + 1).padStart(2, "0"),
                  );

                  const collapseId = `readiness${index + 1}`;

                  return (
                    <div
                      className="accordion-item"
                      data-aos="fade-left"
                      data-aos-delay={index * 70}
                      key={item.id || index}
                    >
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${
                            index === 0 ? "" : "collapsed"
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                        >
                          <span className="zra-number">{itemNumber}</span>

                          {item.title}
                        </button>
                      </h2>

                      <div
                        id={collapseId}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        data-bs-parent="#readinessAccordion"
                      >
                        <div className="accordion-body">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.content || "",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <aside className="zra-deliverable" data-aos="fade-up">
                <span className="zra-deliverable-icon">
                  <span className="material-symbols-outlined">
                    assignment_turned_in
                  </span>
                </span>

                <div>
                  <h2>Assessment Deliverable</h2>

                  <p>
                    You receive a practical{" "}
                    <strong>Readiness and Risk Report</strong> showing your
                    current position, identified gaps, recommended actions and
                    the proposed integration approach.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SYSTEMS
      ====================================================== */}

      <section className="zivora-systems-showcase">
        <div className="container zss-container">
          <div className="row align-items-stretch g-4 g-xl-5">
            <div className="col-lg-7" data-aos="fade-up">
              <div className="zss-kicker">{systemsKicker}</div>

              <div
                className="zss-title"
                dangerouslySetInnerHTML={{
                  __html: systemsTitle,
                }}
              />
            </div>

            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="100">
              <div className="zss-intro-wrap">
                <p className="zss-intro">{systemsDescription}</p>
              </div>
            </div>
          </div>

          <div className="row align-items-stretch g-4 zss-content">
            <div className="col-lg-7" data-aos="zoom-in-right">
              <figure className="zss-visual-shell mb-0">
                <div className="zss-image-window">
                  <img
                    src={systemsImage}
                    className="img-fluid"
                    alt="ZIVORA.ONE API system integration model connecting ERP, accounting, billing and third-party applications"
                  />
                </div>

                <span className="zss-visual-tag" aria-hidden="true">
                  <span className="material-symbols-outlined">hub</span>
                </span>
              </figure>
            </div>

            <div className="col-lg-5">
              <div className="zss-system-list">
                {systemCards.map((card, index) => (
                  <article
                    className="zss-system-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 70}
                    key={card.id || index}
                  >
                    <span className="zss-icon">
                      <span className="material-symbols-outlined">
                        {valueOr(card.icon, "enterprise")}
                      </span>
                    </span>

                    <h3>{card.title}</h3>

                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="zss-note" data-aos="fade-up">
            <span className="material-symbols-outlined">info</span>

            <span>{systemsNote}</span>
          </div>
        </div>
      </section>

      {/* ======================================================
          PINT AE
      ====================================================== */}

      <section className="rs-pint-section">
        <div className="container rs-pint-container">
          <div className="row g-5 rs-pint-layout">
            <div className="col-lg-5">
              <div className="rs-pint-sticky">
                <div className="rs-pint-heading" data-aos="fade-up">
                  <div className="rs-pint-kicker">{pintKicker}</div>

                  <div
                    className="rs-pint-title"
                    dangerouslySetInnerHTML={{
                      __html: pintTitle,
                    }}
                  />

                  <p className="rs-pint-copy">{pintDescription}</p>

                  <p className="rs-pint-copy">{pintDescription2}</p>

                  <p className="rs-pint-copy">{pintDescription3}</p>
                </div>

                {/* XML WINDOW */}

                <div className="rs-xml-window" data-aos="fade-right">
                  <div className="rs-xml-top">
                    <span className="rs-xml-file">
                      <span className="material-symbols-outlined">
                        data_object
                      </span>
                      invoice.xml
                    </span>

                    <span className="rs-xml-status">
                      <span className="rs-xml-dot"></span>
                      Structured data
                    </span>
                  </div>

                  <div className="rs-xml-code">
                    <span className="rs-code-line">&lt;Invoice&gt;</span>

                    {pintGroups.map((group, index) => (
                      <React.Fragment key={group.id || index}>
                        <span
                          className="rs-code-line rs-code-indent"
                          data-code={group.group_number || index + 1}
                        >
                          &lt;
                          {String(group.title || `Group${index + 1}`).replace(
                            /\s+/g,
                            "",
                          )}
                          /&gt;
                        </span>
                      </React.Fragment>
                    ))}

                    <span className="rs-code-line">&lt;/Invoice&gt;</span>
                  </div>

                  <span className="rs-xml-progress"></span>
                </div>

                <div className="rs-xml-caption">
                  <span className="material-symbols-outlined">automation</span>

                  <span>
                    Structured XML allows invoice data to be validated,
                    exchanged and processed automatically.
                  </span>
                </div>
              </div>
            </div>

            {/* PINT GROUPS */}

            <div className="col-lg-7">
              <div className="rs-group-list">
                {pintGroups.map((group, index) => {
                  const fields = safeFields(
                    getPintFields(group),
                    DEFAULT_PINT_GROUPS[index]?.fields || [],
                  );
                  return (
                    <article
                      className="rs-data-group"
                      data-group={group.group_number || index + 1}
                      key={group.id || index}
                    >
                      <div className="rs-group-head">
                        <span className="rs-group-icon">
                          <span className="material-symbols-outlined">
                            {valueOr(
                              group.icon,
                              DEFAULT_PINT_GROUPS[index]?.icon ||
                                "receipt_long",
                            )}
                          </span>
                        </span>

                        <div>
                          <span className="rs-group-number">
                            Group{" "}
                            {valueOr(
                              group.group_number,
                              String(index + 1).padStart(2, "0"),
                            )}
                          </span>

                          <h2 className="rs-group-title">
                            {valueOr(
                              group.title,
                              DEFAULT_PINT_GROUPS[index]?.title ||
                                `Group ${index + 1}`,
                            )}
                          </h2>
                        </div>
                      </div>

                      <p className="rs-group-copy">
                        {valueOr(
                          group.description,
                          DEFAULT_PINT_GROUPS[index]?.description,
                        )}
                      </p>

                      <ul className="rs-field-grid">
                        {fields.map((field, fieldIndex) => {
                          const text = fieldText(field);

                          if (!text) {
                            return null;
                          }

                          return (
                            <li key={field.id || fieldIndex}>
                              <span className="material-symbols-outlined">
                                check
                              </span>

                              {text}
                            </li>
                          );
                        })}
                      </ul>

                      <p className="rs-group-note">
                        {valueOr(group.note, DEFAULT_PINT_GROUPS[index]?.note)}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          UAE ELECTRONIC INVOICE
      ====================================================== */}

      <section className="rs-uae-invoice-section">
        <span className="rs-orb rs-orb-one"></span>

        <span className="rs-orb rs-orb-two"></span>

        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="rs-content">
                <div className="rs-kicker">{invoiceKicker}</div>

                <div
                  className="rs-title"
                  dangerouslySetInnerHTML={{
                    __html: invoiceTitle,
                  }}
                />

                <p className="rs-lead">{invoiceDescription}</p>

                <p className="rs-lead">{invoiceDescription2}</p>

                <div className="row g-2 rs-feature-grid">
                  {invoiceFeatures.map((feature, index) => (
                    <div className="col-sm-6" key={feature.id || index}>
                      <div className="rs-feature">
                        <span className="material-symbols-outlined">
                          {valueOr(feature.icon, "check_circle")}
                        </span>

                        {valueOr(feature.label || feature.title, "")}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rs-note">
                  <span className="material-symbols-outlined">hub</span>

                  <span>
                    The visual invoice helps people review the transaction,
                    while the structured XML carries the machine-readable
                    information used for validation, exchange and reporting.
                  </span>
                </div>
              </div>
            </div>

            {/* INVOICE VISUAL */}

            <div className="col-lg-6">
              <div
                className="rs-visual"
                aria-label="Illustration of a UAE electronic tax invoice and its structured XML data"
              >
                <div className="rs-data-ring"></div>

                <span className="rs-data-chip rs-chip-one">
                  &lt;SellerParty&gt;
                </span>

                <span className="rs-data-chip rs-chip-two">
                  &lt;TaxTotal&gt;
                </span>

                <span className="rs-data-chip rs-chip-three">
                  &lt;InvoiceLine&gt;
                </span>

                <span className="rs-data-chip rs-chip-four">
                  &lt;PayableAmount&gt;
                </span>

                <div className="rs-invoice-wrap">
                  <div className="rs-invoice">
                    <div className="rs-invoice-head">
                      <div className="rs-brand">
                        ZIVORA
                        <span>.ONE</span>
                      </div>

                      <div className="rs-invoice-label">
                        <strong>TAX INVOICE</strong>

                        <small>فاتورة ضريبية</small>
                      </div>
                    </div>

                    <div className="rs-meta">
                      <div>
                        <small>Seller</small>

                        <strong>
                          ZIVORA.ONE Solutions
                          <br />
                          TRN 100000000000003
                        </strong>
                      </div>

                      <div>
                        <small>Buyer</small>

                        <strong>
                          Example Trading LLC
                          <br />
                          Dubai, United Arab Emirates
                        </strong>
                      </div>

                      <div>
                        <small>Invoice No.</small>

                        <strong>ZV-INV-2026-0812</strong>
                      </div>

                      <div>
                        <small>Issue / Due Date</small>

                        <strong>12 Aug / 11 Sep 2026</strong>
                      </div>
                    </div>

                    <div className="rs-table-head">
                      <span>Description</span>

                      <span>Qty</span>

                      <span>VAT</span>

                      <span>Total</span>
                    </div>

                    <div className="rs-table-row">
                      <strong>API Integration Service</strong>

                      <span>1</span>

                      <span>5%</span>

                      <span>AED 4,200</span>
                    </div>

                    <div className="rs-table-row">
                      <strong>Validation &amp; Setup</strong>

                      <span>1</span>

                      <span>5%</span>

                      <span>AED 800</span>
                    </div>

                    <div className="rs-totals">
                      <div className="rs-total-row">
                        <span>Subtotal</span>

                        <b>AED 5,000</b>
                      </div>

                      <div className="rs-total-row">
                        <span>VAT 5%</span>

                        <b>AED 250</b>
                      </div>

                      <div className="rs-total-row rs-due">
                        <span>Total Due</span>

                        <b>AED 5,250</b>
                      </div>
                    </div>

                    <div className="rs-invoice-foot">
                      <div className="rs-xml-ref">
                        PINT-AE / XML
                        <br />
                        Electronic Ref: AE-ZV-80261
                      </div>

                      <div
                        className="rs-qr"
                        aria-label="QR verification placeholder"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          VALIDATION
      ====================================================== */}

      <section className="zivora-invoice-status">
        <div className="container">
          <div className="row align-items-end g-4 zis-heading-row">
            <div className="col-lg-6" data-aos="fade-up">
              <div
                className="zis-title"
                dangerouslySetInnerHTML={{
                  __html: validationTitle,
                }}
              />
            </div>

            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
              <p className="zis-intro">{validationDescription}</p>
            </div>
          </div>

          <div className="zis-shell" data-aos="fade-up" data-aos-delay="140">
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="zis-label">
                  <span className="zis-label-icon">
                    <span className="material-symbols-outlined">
                      fact_check
                    </span>
                  </span>
                  Validation may cover:
                </div>

                <div className="zis-check-grid">
                  {validationChecks.map((check, index) => {
                    const text = fieldText(check);

                    if (!text) {
                      return null;
                    }

                    return (
                      <div
                        className="zis-check"
                        data-aos="zoom-in"
                        data-aos-delay={180 + index * 40}
                        key={check.id || index}
                      >
                        <span className="material-symbols-outlined">
                          check_circle
                        </span>

                        {text}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-lg-5">
                <div
                  className="zis-status-side"
                  data-aos="fade-left"
                  data-aos-delay="250"
                >
                  <div className="zis-flow" aria-hidden="true">
                    <div className="zis-flow-icon">
                      <span className="material-symbols-outlined">
                        description
                      </span>
                    </div>

                    <div className="zis-flow-line">
                      <span></span>
                    </div>

                    <div className="zis-flow-icon">
                      <span className="material-symbols-outlined">
                        published_with_changes
                      </span>
                    </div>
                  </div>

                  <div className="zis-response-symbols" aria-hidden="true">
                    <span className="zis-response-symbol">
                      <span className="material-symbols-outlined">
                        task_alt
                      </span>
                    </span>

                    <span className="zis-response-symbol">
                      <span className="material-symbols-outlined">error</span>
                    </span>
                  </div>

                  <p className="zis-outro">
                    After submission, the system can receive and display
                    processing acknowledgements or error responses. This helps
                    your finance team correct rejected documents without relying
                    on manual follow-up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          WHY CHOOSE
      ====================================================== */}

      <section className="zivora-why-choose">
        <span className="zwc-shape" aria-hidden="true"></span>

        <div className="container">
          <div className="row g-4 g-xl-5 align-items-start">
            <div className="col-lg-5">
              <div className="zwc-intro" data-aos="fade-right">
                <div className="zwc-eyebrow">{whyChooseKicker}</div>

                <div
                  className="zwc-title"
                  dangerouslySetInnerHTML={{
                    __html: whyChooseTitle,
                  }}
                />

                <p className="zwc-description">{whyChooseDescription}</p>

                <div className="zwc-orbit" aria-hidden="true">
                  <span className="zwc-orbit-dot"></span>

                  <div className="zwc-orbit-core">
                    <span className="material-symbols-outlined">hub</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div
                className="zwc-benefits"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <div className="zwc-line" aria-hidden="true">
                  <span className="zwc-line-fill"></span>
                </div>

                {whyChooseBenefits.map((benefit, index) => (
                  <article
                    className="zwc-benefit"
                    data-aos="fade-up"
                    data-aos-delay={120 + index * 50}
                    key={benefit.id || index}
                  >
                    <div className="zwc-icon">
                      <span className="material-symbols-outlined">
                        {valueOr(benefit.icon, "cloud")}
                      </span>
                    </div>

                    <div>
                      <h3>{benefit.title}</h3>

                      <p>{benefit.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="zivora-readiness-split">
        <div className="container zrs-container">
          <div className="zrs-card" data-aos="fade-up" data-aos-duration="800">
            <div className="row g-0 align-items-stretch">
              <div
                className="col-lg-5"
                data-aos="fade-right"
                data-aos-delay="80"
              >
                <div
                  className="zrs-visual"
                  role="img"
                  aria-label="Dubai skyline"
                ></div>
              </div>

              <div className="col-lg-7">
                <div className="zrs-content">
                  <span
                    className="zrs-marker"
                    aria-hidden="true"
                    data-aos="zoom-in"
                  ></span>

                  <div
                    className="zrs-title"
                    dangerouslySetInnerHTML={{
                      __html: ctaTitle,
                    }}
                  />

                  <p
                    className="zrs-lead"
                    data-aos="fade-up"
                    data-aos-delay="70"
                  >
                    {ctaDescription}
                  </p>

                  <p
                    className="zrs-description"
                    data-aos="fade-up"
                    data-aos-delay="130"
                  >
                    {ctaDescription2}
                  </p>

                  <div
                    className="zrs-actions"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <a href={ctaButtonUrl1} className="zrs-btn zrs-btn-primary">
                      {ctaButton1}
                    </a>

                    <a
                      href={ctaButtonUrl2}
                      className="zrs-btn zrs-btn-secondary"
                    >
                      {ctaButton2}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <span className="zrs-accent" aria-hidden="true"></span>
          </div>
        </div>
      </section>
    </main>
  );
}
