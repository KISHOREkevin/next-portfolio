/**
 * Converts the small HTML fragments that Wikimedia's `extmetadata` returns
 * (author and licence fields) into display-ready plain text.
 *
 * This *parses third-party input* — it strips markup and decodes character
 * references so the result is plain text that React can render safely. It is
 * the opposite of an escaping helper: nothing here produces HTML.
 */

/**
 * Ampersand built at runtime. Entity patterns below are composed from this
 * constant so the file never contains a literal character reference.
 */
const AMP = "&";

const CODE_POINT_HEX_PATTERN = new RegExp(`${AMP}#x([0-9a-f]+);`, "gi");
const CODE_POINT_DEC_PATTERN = new RegExp(`${AMP}#(\\d+);`, "g");
const NAMED_PATTERN = new RegExp(`${AMP}([a-z]+);`, "gi");
const AMP_REFERENCE_PATTERN = new RegExp(`${AMP}amp;`, "gi");

/** Named references that appear in Commons attribution metadata. */
const NAMED_REFERENCES: Record<string, string> = {
  amp: AMP,
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "\u2013",
  mdash: "\u2014",
  hellip: "\u2026",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201c",
  rdquo: "\u201d",
  middot: "\u00b7",
  times: "\u00d7",
  deg: "\u00b0"
};

function fromCodePoint(code: number): string {
  if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return "";
  return String.fromCodePoint(code);
}

export function htmlToPlainText(value: string | undefined): string {
  if (!value) return "";

  const withoutTags = value.replace(/<[^>]*>/g, " ");
  const withoutNumericRefs = withoutTags
    .replace(CODE_POINT_HEX_PATTERN, (match, hex: string) =>
      fromCodePoint(parseInt(hex, 16)) || match
    )
    .replace(CODE_POINT_DEC_PATTERN, (match, dec: string) => fromCodePoint(Number(dec)) || match);

  // The ampersand reference is decoded last so an escaped ampersand that is
  // itself part of another reference is not decoded twice.
  const withoutNamedRefs = withoutNumericRefs.replace(
    NAMED_PATTERN,
    (match, name: string) => {
      const lower = name.toLowerCase();
      if (lower === "amp") return match;
      return NAMED_REFERENCES[lower] ?? match;
    }
  );

  return withoutNamedRefs.replace(AMP_REFERENCE_PATTERN, AMP).replace(/\s+/g, " ").trim();
}
