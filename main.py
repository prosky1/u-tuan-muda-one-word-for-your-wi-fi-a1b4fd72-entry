#!/usr/bin/env python3
"""One Word for Your Wi-Fi — entry program.

Writes a single word describing the entrant's Wi-Fi to /output/entry.txt.
The word is the whole entry: one word, no explanation, no extra text.
"""

import os

WORD = "gaslighting"


def validate(word: str) -> str:
    """The gate accepts UTF-8 text of 1 to 20 characters, not only whitespace,
    and the bounty asks for exactly one word — enforce both here so a bad
    word can never reach /output/entry.txt."""
    if not 1 <= len(word) <= 20:
        raise ValueError(f"word must be 1-20 characters, got {len(word)}")
    if not word.strip() or len(word.split()) != 1:
        raise ValueError("entry must be exactly one word")
    return word


def main() -> None:
    out_dir = os.environ.get("OUTPUT_DIR", "/output")
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, "entry.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(validate(WORD))


if __name__ == "__main__":
    main()
