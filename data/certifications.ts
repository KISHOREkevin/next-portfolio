export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
}

export const certificationsData: CertificationItem[] = [
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner",
    issuer: "AWS Training"
  },
  {
    id: "linux-server-admin",
    title: "Linux Server Administration",
    issuer: "Cisco NDG"
  },
  {
    id: "fullstack-development",
    title: "Fullstack Development",
    issuer: "Krutanic Solutions"
  }
];
