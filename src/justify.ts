const LINE_WIDTH = 80;

/**
 * Retourne un tableau de lignes justifiées pour un tableau de mots.
 */
export function justifyParagraph(words: string[], width = LINE_WIDTH): string[] {
  const lines: string[] = [];
  let i = 0;

  while (i < words.length) {
    let j = i;
    let lineLen = 0;

    //Cela va ajouter des mots tant que la longueur totale <= width
    while (j < words.length) {
      const wlen = words[j].length;
      const tentative = lineLen === 0 ? wlen : lineLen + 1 + wlen; // +1 pour espace
      if (tentative <= width) {
        lineLen = tentative;
        j++;
      } else break;
    }

    const lineWords = words.slice(i, j);
    const isLastLine = j >= words.length;

    if (isLastLine) {
      let line = lineWords.join(" ");
      if (line.length < width) line = line + " ".repeat(width - line.length);
      lines.push(line);
    } else {
      const totalChars = lineWords.reduce((s, w) => s + w.length, 0);
      const spacesNeeded = width - totalChars;
      const gaps = lineWords.length - 1 || 1;
      const baseSpace = Math.floor(spacesNeeded / gaps);
      let extra = spacesNeeded % gaps;

      if (lineWords.length === 1) {
        lines.push(lineWords[0] + " ".repeat(width - lineWords[0].length));
      } else {
        let line = "";
        for (let k = 0; k < lineWords.length; k++) {
          line += lineWords[k];
          if (k < lineWords.length - 1) {
            const thisGap = baseSpace + (extra > 0 ? 1 : 0);
            line += " ".repeat(thisGap);
            if (extra > 0) extra--;
          }
        }
        lines.push(line);
      }
    }

    i = j;
  }

  return lines;
}

/**
 * Justifie tout le texte, paragraphes séparés par lignes vides
 */
export function justifyText(input: string, width = LINE_WIDTH): string {
  const normalized = input.replace(/\r\n/g, "\n").replace(/\t/g, " ");
  const paragraphs = normalized.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const resParagraphs: string[] = [];

  for (const para of paragraphs) {
    const words = para.split(/\s+/).filter(Boolean);
    const lines = justifyParagraph(words, width);
    resParagraphs.push(lines.join("\n"));
  }

  return resParagraphs.join("\n\n");
}

    
