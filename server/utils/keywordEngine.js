// List of allowed keywords for auto-approval logic
const KEYWORDS = [
  "case study",
  "research",
  "analysis",
  "court",
  "law",
  "medical",
  "business",
  "engineering",
  "report",
  "study"
];

// Keyword analysis function
function analyzeKeywords(text) {
  if (!text || typeof text !== "string") {
    return [];
  }

  const lowerText = text.toLowerCase();

  return KEYWORDS.filter(keyword =>
    lowerText.includes(keyword)
  );
}

// Export as CommonJS module
module.exports = analyzeKeywords;


