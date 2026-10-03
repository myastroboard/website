"""Check that every language in static/js/translations.js matches the English reference.

For each language: same keys, same value types, same {placeholder} names as `en`, and ASCII
punctuation only (no curly quotes, en/em dashes, ellipsis character or non-breaking space).
Exits non-zero and lists every problem found.
"""

import json
import re
import sys
from pathlib import Path

TRANSLATIONS = Path(__file__).resolve().parent.parent / "static" / "js" / "translations.js"
REFERENCE = "en"
PLACEHOLDER = re.compile(r"\{(\w+)\}")
FORBIDDEN = {
    "‘": "left single quote",
    "’": "curly apostrophe",
    "“": "left double quote",
    "”": "right double quote",
    "–": "en dash",
    "—": "em dash",
    "…": "ellipsis character",
    " ": "non-breaking space",
}


def load_translations(path: Path) -> dict:
    """Parse the JSON object assigned to window.MAB_TRANSLATIONS."""
    source = path.read_text(encoding="utf-8")
    start = source.index("MAB_TRANSLATIONS")
    body = source[source.index("=", start) + 1 : source.rindex("};") + 1]
    return json.loads(body)


def flatten(tree: dict, prefix: str = "") -> dict:
    """Map dotted key paths to leaf values."""
    leaves = {}
    for key, value in tree.items():
        path = f"{prefix}.{key}" if prefix else key
        if isinstance(value, dict):
            leaves.update(flatten(value, path))
        else:
            leaves[path] = value
    return leaves


def check(translations: dict) -> list[str]:
    """Return every parity or punctuation problem, empty when the file is valid."""
    problems = []
    reference = flatten(translations[REFERENCE])
    for lang, tree in translations.items():
        leaves = flatten(tree)
        if lang != REFERENCE:
            for key in sorted(reference.keys() - leaves.keys()):
                problems.append(f"{lang}: missing key {key}")
            for key in sorted(leaves.keys() - reference.keys()):
                problems.append(f"{lang}: unknown key {key}")
        for key, value in leaves.items():
            expected = reference.get(key)
            if lang != REFERENCE and expected is not None:
                if type(value) is not type(expected):
                    got, want = type(value).__name__, type(expected).__name__
                    problems.append(f"{lang}: {key} is {got}, en is {want}")
                elif isinstance(value, str) and set(PLACEHOLDER.findall(value)) != set(
                    PLACEHOLDER.findall(expected)
                ):
                    problems.append(f"{lang}: {key} placeholders differ from en")
            if isinstance(value, str):
                for char, name in FORBIDDEN.items():
                    if char in value:
                        problems.append(f"{lang}: {key} contains a forbidden character ({name})")
    return problems


def main() -> int:
    problems = check(load_translations(TRANSLATIONS))
    for problem in problems:
        print(problem)
    if problems:
        print(f"{len(problems)} problem(s) in {TRANSLATIONS.name}")
        return 1
    print(f"{TRANSLATIONS.name}: all languages match {REFERENCE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
