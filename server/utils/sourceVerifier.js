const OFFICIAL_DOMAINS = [
  ".gov",
  ".edu",
  ".org",
  "who.int",
  "un.org",
  "nic.in",
  "ac.in"
];

function isOfficialSource(link) {
  if (!link) return false;
  return OFFICIAL_DOMAINS.some(domain => link.includes(domain));
}

module.exports = isOfficialSource;
