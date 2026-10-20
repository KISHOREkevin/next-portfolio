#!/usr/bin/env python3
"""
Professional ATS-Friendly Resume Generator for A. Kishore
Generates an ATS-optimized, recruiter-ready 2-page PDF resume using ReportLab.
Outputs to:
  - public/A_Kishore_Resume.pdf
  - public/resume.pdf
"""

import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether,
    PageBreak,
)
from reportlab.pdfgen import canvas
import pypdf

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and render total page count
    in the running footer (e.g., 'Page 1 of 2').
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#475569"))
        
        # Subtle footer divider
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(36, 26, letter[0] - 36, 26)
        
        # Running footer text
        page_num_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 36, 16, page_num_str)
        self.drawString(36, 16, "A. Kishore  |  Full Stack Developer & AI Systems Engineer  |  kishorekevin3289@gmail.com  |  +91 7904702577")
        
        self.restoreState()


def create_resume_pdf(output_path: str):
    # Page setup: Letter size with 36pt (0.5 in) margins
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32,
    )

    # Base stylesheet & palette
    styles = getSampleStyleSheet()
    
    PRIMARY = colors.HexColor("#0F172A")    # Deep Slate / Navy
    SECONDARY = colors.HexColor("#1E293B")  # Dark Slate
    ACCENT = colors.HexColor("#0369A1")     # Professional Sapphire Accent
    MUTED = colors.HexColor("#475569")      # Slate Muted
    BODY = colors.HexColor("#1E293B")       # High-contrast body text
    BORDER = colors.HexColor("#94A3B8")     # Clean separator line

    # Custom Typography Styles
    name_style = ParagraphStyle(
        "CandidateName",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=21,
        leading=23,
        textColor=PRIMARY,
        alignment=1,  # Centered
    )

    title_style = ParagraphStyle(
        "CandidateTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=13,
        textColor=ACCENT,
        alignment=1,  # Centered
    )

    contact_bar_style = ParagraphStyle(
        "ContactBar",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11.5,
        textColor=MUTED,
        alignment=1,  # Centered
    )

    section_heading = ParagraphStyle(
        "SectionHeading",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.5,
        leading=11.5,
        textColor=PRIMARY,
        spaceBefore=0,
        spaceAfter=0,
        keepWithNext=True,
    )

    item_title_style = ParagraphStyle(
        "ItemTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=11.5,
        textColor=SECONDARY,
    )

    item_meta_style = ParagraphStyle(
        "ItemMeta",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11.5,
        textColor=MUTED,
        alignment=2,  # Right-aligned
    )

    body_style = ParagraphStyle(
        "BodyTextCustom",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11,
        textColor=BODY,
    )

    bullet_style = ParagraphStyle(
        "BulletText",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11,
        textColor=BODY,
        leftIndent=11,
        firstLineIndent=-11,
    )

    skill_label_style = ParagraphStyle(
        "SkillLabel",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11,
        textColor=SECONDARY,
    )

    skill_value_style = ParagraphStyle(
        "SkillValue",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11,
        textColor=BODY,
    )

    story = []

    # Helper function for Section Headers
    def build_section_header(title_text):
        p = Paragraph(f"<b>{title_text.upper()}</b>", section_heading)
        line = HRFlowable(width="100%", thickness=0.8, color=BORDER, spaceBefore=2, spaceAfter=3.5)
        return [p, line]

    # Helper function for Role / Experience Entry
    def role_entry(company, role, period, location, bullets):
        elements = []
        top_row = [
            Paragraph(f"<b>{company}</b> — <i>{role}</i>", item_title_style),
            Paragraph(f"{period} | {location}", item_meta_style)
        ]
        t = Table([top_row], colWidths=[355, 185])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0.5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ]))
        elements.append(t)
        for b in bullets:
            elements.append(Paragraph(f"• {b}", bullet_style))
        elements.append(Spacer(1, 3))
        return elements

    # Helper function for Project Entry. Keep the project title/link on one row
    # and place the technology stack on its own line to prevent cramped headings.
    project_stack_style = ParagraphStyle(
        "ProjectStack", parent=styles["Normal"], fontName="Helvetica-Oblique",
        fontSize=7.8, leading=9.2, textColor=MUTED, spaceAfter=1,
    )

    def project_entry(name, tech_stack, link_text, link_url, bullets):
        elements = []
        link_part = (f"<a href='{link_url}'><u>{link_text}</u></a>"
                     if link_url else (f"<i>{link_text}</i>" if link_text else ""))
        top_row = [Paragraph(f"<b>{name}</b>", item_title_style),
                   Paragraph(link_part, item_meta_style)]
        table = Table([top_row], colWidths=[350, 190])
        table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        elements.append(table)
        elements.append(Paragraph(tech_stack, project_stack_style))
        for bullet in bullets:
            elements.append(Paragraph(f"• {bullet}", bullet_style))
        elements.append(Spacer(1, 3))
        return elements

    # =========================================================
    # PAGE 1: HEADER, SUMMARY, SKILLS, CORE PRODUCTION ROLES
    # =========================================================

    # 1. HEADER (Centered, authoritative, clean ATS layout)
    story.append(Paragraph("<b>A. KISHORE</b>", name_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("Full Stack Developer &amp; AI Systems Engineer", title_style))
    story.append(Spacer(1, 2.5))

    contact_line_1 = (
        "Madurai, Tamil Nadu, India  |  Phone: +91 7904702577  |  "
        "Email: <a href='mailto:kishorekevin3289@gmail.com'><u>kishorekevin3289@gmail.com</u></a>"
    )
    contact_line_2 = (
        "Portfolio: <a href='https://kishorekevin.netlify.app/'><u>kishorekevin.netlify.app</u></a>  |  "
        "GitHub: <a href='https://github.com/KISHOREkevin'><u>github.com/KISHOREkevin</u></a>"
    )
    story.append(Paragraph(contact_line_1, contact_bar_style))
    story.append(Paragraph(contact_line_2, contact_bar_style))
    story.append(HRFlowable(width="100%", thickness=1.1, color=PRIMARY, spaceBefore=3.5, spaceAfter=5))

    # 2. PROFESSIONAL SUMMARY
    story.extend(build_section_header("Professional Summary"))
    summary_text = (
        "<b>Results-driven Full Stack Developer &amp; AI Systems Engineer</b> with production experience designing and "
        "deploying high-reliability web applications, scalable backend microservices, financial trading platforms, and Applied AI systems. "
        "Hands-on expertise in <b>React.js, Node.js, Fastify, Python, FastAPI, Django, PostgreSQL, and MongoDB</b>. Production "
        "background engineering cryptocurrency deposit and withdrawal workflows with blockchain wallet integrations (<b>Ethers.js, Alchemy</b>), "
        "MetaTrader 5 (<b>MT5</b>) trading platform integrations, high-security multi-vendor authenticated APIs, and local LLM / "
        "Retrieval-Augmented Generation (<b>RAG</b>) pipelines using <b>LangChain, Ollama, and vector databases</b>. Founder of Codex Arch "
        "(custom minimal Linux OS) with proven expertise in Linux systems administration, workflow automation, and cloud deployments."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # 3. TECHNICAL SKILLS
    story.extend(build_section_header("Technical Skills"))
    skills_rows = [
        ("Programming Languages:", "Python, JavaScript (ES6+), TypeScript, Rust, C, Java, Lua, Bash"),
        ("Frontend Technologies:", "React.js, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap, React Native, Expo, Redux, GTK, Qt"),
        ("Backend & APIs:", "Node.js, Fastify, Express.js, Django, FastAPI, REST API Development, Microservices, Asynchronous Programming"),
        ("Databases & ORMs:", "PostgreSQL, MongoDB, Redis, SQL, NoSQL, Sequelize ORM, SQLAlchemy, Pydantic"),
        ("AI / LLM Engineering:", "Large Language Models (LLMs), RAG, LangChain, LangGraph, Ollama, Local LLMs, Vector Databases, Semantic Search"),
        ("Blockchain & Trading:", "Ethers.js, Alchemy (Webhooks & Monitoring), Blockchain Wallets, Crypto Deposits/Withdrawals, MT5 Integration, Order Books"),
        ("DevOps, Cloud & Systems:", "Docker, AWS (EC2, Deployments), Linux Server Administration, Git, GitHub, CI/CD, Networking Protocols, System Design"),
    ]

    skill_table_data = []
    for label, val in skills_rows:
        skill_table_data.append([
            Paragraph(f"<b>{label}</b>", skill_label_style),
            Paragraph(val, skill_value_style)
        ])

    skills_table = Table(skill_table_data, colWidths=[130, 410])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 4))

    # 4. PROFESSIONAL EXPERIENCE (Core Production Roles on Page 1)
    story.extend(build_section_header("Professional Experience"))

    # Role 1: Wealwin Technologies
    story.extend(role_entry(
        company="Wealwin Technologies",
        role="Full Stack Developer",
        period="Nov 2025 – Present",
        location="Madurai, Tamil Nadu, India",
        bullets=[
            "Architect and deploy production full-stack web applications and microservices using <b>React.js, Node.js, Fastify, Sequelize</b>, and <b>PostgreSQL</b>.",
            "Contribute to <b>Dopamine</b> trading platform infrastructure, engineering cryptocurrency deposit and withdrawal workflows integrated with blockchain wallets via <b>Ethers.js</b> and <b>Alchemy</b> webhooks for real-time transaction monitoring.",
            "Engineer <b>MetaTrader 5 (MT5)</b> and <b>NTrader</b> trading platform integrations across Finowiz and Regulus, coordinating copy-trading, account management, and affiliate commission distribution.",
            "Develop high-security multi-vendor REST APIs with API-key verification and cryptographic signature validation for institutional clients.",
            "Execute relational PostgreSQL schema migrations and maintain robust backend microservices with FastAPI and Python."
        ]
    ))

    # Role 2: Hashcodex
    story.extend(role_entry(
        company="Hashcodex / Hashcodexperts Infoservices",
        role="Full Stack Developer",
        period="Jul 2025 – Oct 2025",
        location="India",
        bullets=[
            "Built and scaled fintech, cryptocurrency, and trading web applications leveraging the <b>MERN Stack (MongoDB, Express.js, React.js, Node.js)</b>.",
            "Contributed to the <b>Bitget</b> trading module, connecting interactive trading charts with order matching, execution, and order-closing lifecycles.",
            "Implemented secure authentication and consumed high-throughput financial REST APIs supporting real-time trading operations.",
            "Debugged production codebases and enhanced core features, significantly boosting transaction reliability and code modularity."
        ]
    ))

    # Role 3: Krutanic Solutions
    story.extend(role_entry(
        company="Krutanic Solutions",
        role="Fullstack Developer Intern",
        period="Nov 2024 – Jan 2025",
        location="India",
        bullets=[
            "Built 3+ high-performance <b>Django REST APIs</b> for real-world projects, cutting backend response times by <b>25%</b>.",
            "Collaborated within an engineering team to construct a cloud-deployed job portal using <b>Node.js, React, and AWS</b>."
        ]
    ))

    # Role 4: Shrika Institute
    story.extend(role_entry(
        company="Shrika Institute of Creative Technology",
        role="Web Developer",
        period="Sep 2023 – May 2025",
        location="India",
        bullets=[
            "Developed and maintained 5+ full-stack production platforms (job portals, food ordering, transcription) using MERN and Django deployed on <b>AWS</b>.",
            "Engineered a Video Editor Suite with real-time collaboration features (increasing user engagement by <b>80%</b>) and parallelized <b>FFmpeg</b> processing (slashing render duration by <b>60%</b>).",
            "Integrated speech-to-text AI/ML APIs into an automated audio transcription tool, reducing manual transcription effort by <b>90%</b>."
        ]
    ))

    # =========================================================
    # PAGE BREAK TO PAGE 2 (Clean, deliberate, balanced split)
    # =========================================================
    story.append(PageBreak())

    # 5. PROFESSIONAL EXPERIENCE (CONTINUED) on Page 2
    story.extend(build_section_header("Professional Experience (Continued)"))

    # Role 5: Linux Server Administration
    story.extend(role_entry(
        company="Linux Server Administration",
        role="Linux Server Administrator Intern",
        period="Jun 2023 – Jan 2024",
        location="India",
        bullets=[
            "Administered high-uptime Linux servers, monitoring processes, logs, and resource health using <b>top, ps, journalctl</b>, and system diagnostics.",
            "Secured remote access protocols (<b>SSH, SFTP</b>) and troubleshot network configurations, subnets, routing, and DNS records (<b>netstat, ss, dig, traceroute</b>).",
            "Automated system maintenance routines, scheduled backups, and log rotations using modular <b>Bash</b> scripts."
        ]
    ))

    # Role 6: Codex Arch
    story.extend(role_entry(
        company="Codex Arch",
        role="Founder & Community Educator",
        period="Jan 2025 – Present",
        location="Open Source Community",
        bullets=[
            "Developed a customized keyboard-centric Linux OS based on <b>Qtile, Python, and Bash</b>, adopted as the primary workstation OS by 10+ beta testers.",
            "Automated system updates and environment dotfiles via shell scripts and Git, reducing fresh deployment setup time from hours to under <b>5 minutes</b>.",
            "Published technical tutorials and conducted workshops on Linux administration, self-hosting, and workflow automation."
        ]
    ))

    # 6. FEATURED TECHNICAL PROJECTS
    story.extend(build_section_header("Featured Technical Projects"))

    # Projects
    story.extend(project_entry(
        name="Finowiz — MT5 Trading Platform",
        tech_stack="MERN Stack, MetaTrader 5, Microservices, HMAC Auth",
        link_text="Live: finowizprime.com",
        link_url="https://www.finowizprime.com/",
        bullets=[
            "Developed trading workflows integrating MT5 with copy-trading functionality, affiliate tracking, and automated commission distribution.",
            "Engineered multi-vendor REST APIs secured with API keys and cryptographic HMAC signature validation for external institutional integrations."
        ]
    ))

    # Project 4: Metiers
    story.extend(project_entry(
        name="Metiers — Multi-Provider Service Marketplace",
        tech_stack="Node.js, Fastify, Sequelize ORM, PostgreSQL, REST APIs",
        link_text="Live: metiers.cd",
        link_url="https://metiers.cd/",
        bullets=[
            "Architected backend microservices and high-throughput REST endpoints for a multi-vendor on-demand home service marketplace.",
            "Engineered relational PostgreSQL schemas and Sequelize ORM models to manage provider dispatch, customer ordering, and status lifecycles."
        ]
    ))

    

    story.extend(project_entry(
            name="Dopamine — Trading Platform",
            tech_stack="Rust, Node.js, Express, MongoDB, Ethers.js, Alchemy, Web3",
            link_text="Wealwin Technologies Product",
            link_url="",
            bullets=[
                "Contributed to core cryptocurrency deposit and withdrawal workflows, integrating blockchain wallets via <b>Ethers.js</b>.",
                "Configured <b>Alchemy</b> webhooks and automated transaction monitoring to track real-time on-chain events.",
                "Integrated with a high-performance <b>Rust</b>-powered trade engine supporting order book management and trade execution."
            ]
    ))

    story.extend(project_entry(
            name="AI-Powered Job Matching System",
            tech_stack="Python, LangChain, Ollama, Vector DB, RAG, Semantic Search",
            link_text="github.com/KISHOREkevin/job-matcher",
            link_url="https://github.com/KISHOREkevin/job-matcher",
            bullets=[
                "Built a RAG-based job-matching system that parses resumes and job postings into structured representations for automated candidate evaluation, returning a focused <b>top-3</b> match shortlist.",
                "Engineered document ingestion, data normalization, deduplication, and vector-embedding pipelines, including scheduled <b>daily job ingestion</b> for semantic similarity search.",
                "Executed local LLM inference via Ollama for zero-cost, privacy-preserving candidate matching with structured output generation."
            ]
        ))

    
    # Project 5: Codex Arch
    story.extend(project_entry(
        name="Codex Arch — Custom Minimal Linux OS",
        tech_stack="Linux, Qtile, Python, Bash, GTK, System Automation, Git",
        link_text="github.com/KISHOREkevin",
        link_url="https://github.com/KISHOREkevin",
        bullets=[
            "Engineered a lightweight keyboard-centric Linux environment with custom Qtile tiling workflows and GTK/Qt utilities, bringing together <b>20+ open-source tools</b>.",
            "Automated system dotfiles, environment synchronization, and package maintenance via Bash scripts, reducing setup time to under <b>5 minutes</b>."
        ]
    ))

    # 7. EDUCATION
    story.extend(build_section_header("Education"))
    
    edu_row_1 = [
        Paragraph("<b>Ultra College of Engineering and Technology</b> — <i>B.Tech in Information Technology</i>", item_title_style),
        Paragraph("May 2021 – May 2025 | Madurai, India", item_meta_style)
    ]
    t_edu_1 = Table([edu_row_1], colWidths=[355, 185])
    t_edu_1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_edu_1)
    story.append(Paragraph("• <b>CGPA: 8.09 / 10</b> | Specialization: Software Engineering, Data Structures &amp; Algorithms, Computer Networks, Operating Systems", bullet_style))
    story.append(Spacer(1, 2))

    edu_row_2 = [
        Paragraph("<b>TVS Higher Secondary School</b> — <i>Higher Secondary Certificate (HSC) &amp; SSLC</i>", item_title_style),
        Paragraph("Madurai, Tamil Nadu, India", item_meta_style)
    ]
    t_edu_2 = Table([edu_row_2], colWidths=[355, 185])
    t_edu_2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_edu_2)
    story.append(Paragraph("• HSC (Class XII): <b>86.3%</b> (2020–2021)  |  SSLC (Class X): <b>78.4%</b> (2018–2019)", bullet_style))
    story.append(Spacer(1, 3))

    # 8. CERTIFICATIONS
    story.extend(build_section_header("Certifications"))
    cert_items = (
        "• <b>AWS Cloud Practitioner</b> (AWS Training)  |  "
        "• <b>Linux Server Administration</b> (Cisco NDG)  |  "
        "• <b>Fullstack Development</b> (Krutanic Solutions)"
    )
    story.append(Paragraph(cert_items, body_style))

    # Build the document using NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated resume: {output_path}")


def verify_pdf(pdf_path: str):
    """Verify that the generated PDF exists, has exactly 2 pages, and has searchable text."""
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found at {pdf_path}")
    
    file_size = os.path.getsize(pdf_path)
    reader = pypdf.PdfReader(pdf_path)
    page_count = len(reader.pages)
    
    print(f"\n--- Verification for {pdf_path} ---")
    print(f"File Size: {file_size / 1024:.2f} KB")
    print(f"Total Pages: {page_count}")
    
    full_text = ""
    for idx, page in enumerate(reader.pages):
        text = page.extract_text()
        full_text += f"\n--- Page {idx + 1} ---\n" + text
        print(f"Page {idx + 1} text character count: {len(text)}")
    
    # Assertions
    assert page_count == 2, f"Expected exactly 2 pages, got {page_count}!"
    assert "A. KISHORE" in full_text, "Candidate name not found in extracted text"
    assert "Wealwin Technologies" in full_text, "Wealwin Technologies not found"
    assert "Dopamine" in full_text, "Dopamine not found in extracted text"
    assert "Ethers.js" in full_text, "Ethers.js not found in extracted text"
    assert "Hashcodex" in full_text, "Hashcodex not found"
    assert "Ultra College of Engineering and Technology" in full_text, "Education not found"
    assert "AI-Powered Job Matching System" in full_text, "Projects not found"
    assert "AWS Cloud Practitioner" in full_text, "Certifications not found"
    print("All ATS text validation checks PASSED successfully!\n")
    return page_count, file_size


def main():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    public_dir = os.path.join(root_dir, "public")
    os.makedirs(public_dir, exist_ok=True)
    
    target_primary = os.path.join(public_dir, "A_Kishore_Resume.pdf")
    target_secondary = os.path.join(public_dir, "resume.pdf")
    
    # Generate primary resume
    create_resume_pdf(target_primary)
    verify_pdf(target_primary)
    
    # Also create the alias resume.pdf for the web portfolio download route
    create_resume_pdf(target_secondary)
    verify_pdf(target_secondary)
    
    print(f"Completed! Resumes available at:\n1. {target_primary}\n2. {target_secondary}")

if __name__ == "__main__":
    main()
