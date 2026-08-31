import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Link } from "./types";

/**
 * One place to decide "which brand is this link," so Basic/Classic/Modern
 * don't each carry their own copy of the same label/url sniffing. Matches on
 * BOTH label and url — a user-edited label (e.g. "github.com/rakandouli"
 * instead of "GitHub") still resolves correctly since the url always has the
 * hostname regardless of what the label says.
 */
export function linkIconFor(link: Link): IconType {
  const hay = `${link.label} ${link.url}`.toLowerCase();
  if (hay.includes("github")) return FaGithub;
  if (hay.includes("linkedin")) return FaLinkedin;
  return FiLink;
}
