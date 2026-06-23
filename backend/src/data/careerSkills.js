export const careerSkills = Object.freeze({
  "AI Engineer": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "Statistics",
    "SQL",
    "Git",
    "DSA",
    "Docker"
  ],
  "Data Scientist": [
    "Python",
    "Statistics",
    "SQL",
    "Machine Learning",
    "Data Visualization",
    "Git"
  ],
  "Software Engineer": [
    "DSA",
    "JavaScript",
    "Git",
    "APIs",
    "System Design"
  ],
  "Cybersecurity Analyst": [
    "Networking",
    "Linux",
    "Cybersecurity Fundamentals",
    "Python"
  ],
  "UX Designer": [
    "Figma",
    "UI Design",
    "UX Research"
  ],
  "Product Manager": [
    "Communication",
    "Leadership",
    "Product Thinking",
    "Data Analysis"
  ],
  "Cloud Engineer": [
    "AWS",
    "Docker",
    "Kubernetes",
    "Linux"
  ]
});

export const careerNames = Object.keys(careerSkills);
export const allSkills = [...new Set(Object.values(careerSkills).flat())].sort();
