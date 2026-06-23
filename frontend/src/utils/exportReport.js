const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(new Date(date));

const downloadBlob = (content, filename, type) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export function exportAnalysisAsJson(analysis) {
  downloadBlob(
    JSON.stringify(analysis, null, 2),
    `pathfinder-${analysis.targetCareer.toLowerCase().replaceAll(" ", "-")}.json`,
    "application/json"
  );
}

export async function exportAnalysisAsPdf(analysis) {
  const { jsPDF } = await import("jspdf");
  const document = new jsPDF();
  const left = 18;
  let y = 20;

  const addLine = (text, options = {}) => {
    const { size = 11, bold = false, color = [30, 41, 59], gap = 7 } = options;
    document.setFont("helvetica", bold ? "bold" : "normal");
    document.setFontSize(size);
    document.setTextColor(...color);
    const lines = document.splitTextToSize(text, 174);

    if (y + lines.length * gap > 280) {
      document.addPage();
      y = 20;
    }

    document.text(lines, left, y);
    y += lines.length * gap;
  };

  addLine("PathFinder Skill Gap Report", {
    size: 20,
    bold: true,
    color: [23, 23, 44],
    gap: 9
  });
  addLine(`${analysis.targetCareer} • ${formatDate(analysis.createdAt)}`, {
    color: [71, 85, 105],
    gap: 10
  });
  addLine(`Career readiness: ${analysis.readinessScore}%`, {
    size: 16,
    bold: true,
    color: [37, 99, 235],
    gap: 10
  });
  addLine(`Level: ${analysis.readinessCategory}`, { bold: true, gap: 10 });
  addLine(`Matched skills: ${analysis.matchedSkills.join(", ") || "None"}`, {
    gap: 9
  });
  addLine(`Missing skills: ${analysis.missingSkills.join(", ") || "None"}`, {
    gap: 12
  });
  addLine("Personalized recommendations", { size: 14, bold: true, gap: 9 });
  analysis.recommendations.forEach((item) => addLine(`• ${item}`));
  y += 4;
  addLine("Learning roadmap", { size: 14, bold: true, gap: 9 });
  analysis.roadmap.forEach((item) =>
    addLine(`Month ${item.month}: ${item.title} — ${item.description}`)
  );
  y += 4;
  addLine("Recommended resources", { size: 14, bold: true, gap: 9 });
  analysis.resources.forEach((item) => {
    addLine(`${item.skill}`, { bold: true });
    addLine(`Free: ${item.free.title}`);
    addLine(`Paid: ${item.paid.title}`, { gap: 9 });
  });

  document.save(
    `pathfinder-${analysis.targetCareer.toLowerCase().replaceAll(" ", "-")}.pdf`
  );
}
