import type { Locale } from "@/i18n/ui";

interface SkillGroup {
  title: string;
  items: string[];
}

/** Home "What I can do" columns. Source: the CV's skills section. */
export const skills: Record<Locale, SkillGroup[]> = {
  pt: [
    {
      title: "Hardware",
      items: [
        "Design de PCBs (KiCad, EasyEDA)",
        "Esquemas elétricos",
        "Sensores e drivers de motor",
        "Soldadura e montagem",
      ],
    },
    {
      title: "Embebidos",
      items: [
        "C para microcontroladores",
        "Teensy 4.0, Arduino",
        "Controlo de trajetória em tempo real",
        "MQTT",
      ],
    },
    {
      title: "Software",
      items: ["Python", "PHP", "SQL / MySQL", "Web (portal B2B em equipa)"],
    },
    {
      title: "Dados e gestão",
      items: [
        "Análise de dados e regressão",
        "Programação linear (MILP)",
        "Modelação 3D e prototipagem",
        "Gestão de projetos (MS Project, Scrum)",
      ],
    },
  ],
  en: [
    {
      title: "Hardware",
      items: [
        "PCB design (KiCad, EasyEDA)",
        "Schematics",
        "Sensors and motor drivers",
        "Soldering and assembly",
      ],
    },
    {
      title: "Embedded",
      items: [
        "C for microcontrollers",
        "Teensy 4.0, Arduino",
        "Real-time trajectory control",
        "MQTT",
      ],
    },
    {
      title: "Software",
      items: ["Python", "PHP", "SQL / MySQL", "Web (team-built B2B portal)"],
    },
    {
      title: "Data and management",
      items: [
        "Data analysis and regression",
        "Linear programming (MILP)",
        "3D modelling and prototyping",
        "Project management (MS Project, Scrum)",
      ],
    },
  ],
};
