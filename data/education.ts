export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  period: string;
  score: string;
  scoreType: "CGPA" | "Percentage";
  location?: string;
  details?: string[];
}

export const educationData: EducationItem[] = [
  {
    id: "ultra-college",
    institution: "Ultra College of Engineering and Technology",
    degree: "Bachelor of Technology",
    field: "Information Technology",
    period: "May 2021 – May 2025",
    score: "8.09 / 10",
    scoreType: "CGPA",
    location: "Madurai, Tamil Nadu, India",
    details: [
      "Specialized in Information Technology, Software Engineering, and Computer Networks.",
      "Graduated with 8.09 CGPA."
    ]
  },
  {
    id: "tvs-hsc",
    institution: "TVS Higher Secondary School",
    degree: "Higher Secondary Certificate (HSC)",
    period: "April 2020 – June 2021",
    score: "86.3%",
    scoreType: "Percentage",
    location: "Madurai, Tamil Nadu, India"
  },
  {
    id: "tvs-sslc",
    institution: "TVS Higher Secondary School",
    degree: "Secondary School Leaving Certificate (SSLC)",
    period: "April 2018 – April 2019",
    score: "78.4%",
    scoreType: "Percentage",
    location: "Madurai, Tamil Nadu, India"
  }
];
