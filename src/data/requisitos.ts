// Reglas académicas – Ingeniería de Sistemas (Unicauca)
// Incluye prerrequisitos, corequisitos y reglas globales institucionales

export type RequirementRule = {
  prerequisites?: string[];
  corequisites?: string[];
};

// =========================
// PRERREQUISITOS / COREQUISITOS POR MATERIA
// (derivados de la malla oficial)
// =========================

export const subjectRequirements: Record<string, RequirementRule> = {
  // Matemáticas, ciencias básicas y ciencias básicas de ingeniería
  "311-1": { prerequisites: ["11465"] }, // Cálculo II ← Cálculo I
  "307": { prerequisites: ["11465"] }, // Álgebra ← Cálculo I
  "312-1": { prerequisites: ["11465"] }, // Mecánica ← Cálculo I
  "318-1": { prerequisites: ["11465"], corequisites: ["312-1"] }, // Lab Mecánica ← Cálculo I, Lab Mecánica ↔ Mecánica

  "316-1": { prerequisites: ["311-1"] }, // Cálculo III ← Cálculo II
  "317-1": { prerequisites: ["311-1", "312-1"],  }, // Electro ← Cálculo II, Electro ← Mecánica

  "322-1": { prerequisites: ["316-1"] }, // EDO ← Cálculo III
  "323-1": { prerequisites: ["316-1", "317-1"] }, // VO ← Cálculo III, VO ← Electro
  "SIS501": { prerequisites: ["316-1"] }, //TC ← Cálculo III

  "329-1": { prerequisites: ["318-1", "312-1", "311-1"], corequisites: ["317-1"] }, // Electro ↔ Lab Electro ← Mecánica, Cálculo II
  
  "328-1": { prerequisites: ["322-1"] }, // Análisis Numérico ← EDO
  "MAT131": { prerequisites: ["322-1"] }, // Estadísitca y Probabildad ← EDO
  "SIS706": { prerequisites: ["322-1"] }, // TDS ← EDO

  "338": { prerequisites: ["MAT131"] }, // Investigacion de Operaciones ← Estadística y Probabilidad

  
  // Programación y estructuras y Bases de datos

  "11477": { corequisites: ["11478"] }, // Intro Informática ↔ Lab Intro Informática

  "SIS201": { prerequisites: ["11477", "11478"] }, // POO ← Intro Informática y Lab
  "SIS201-L": { prerequisites: ["11477", "11478"], corequisites: ["SIS201"] }, // POO ↔ Lab POO ← Intro Informática y Lab

  "SIS301": { prerequisites: ["SIS201", "SIS201-L"] }, // Estructuras I ← POO y Lab
  "10153": { prerequisites: ["SIS201", "SIS201-L"], corequisites: ["SIS301"] }, // Estructuras I ↔ Lab Estructuras I ← POO y Lab

  "SIS401": { prerequisites: ["SIS301", "10153"] }, // ED II ← ED I y Lab
  "SIS401L": { prerequisites: ["SIS301", "10153"], corequisites: ["SIS401"] }, // ED II ↔ Lab ED II ← ED I y Lab

  "SIS402": { prerequisites: ["SIS301", "10153"] }, // BD I ← ED I y Lab
  "SIS402L": { prerequisites: ["SIS301", "10153"], corequisites: ["SIS402"] }, // BD I ↔ Lab BD I ← ED I y Lab

  "SIS504": { prerequisites: ["SIS401", "SIS401L", "SIS402", "SIS402L"] }, // BD II ← ED II y Lab; BD I y lab
  "SIS504L": { prerequisites: ["SIS401", "SIS401L"], corequisites: ["SIS504"] }, // BD II ↔ Lab BD II ← ED II y Lab

  // Ingeniería de software
  "SIS503": { prerequisites: ["SIS401", "SIS401L"] }, // IS I ← ED II y Lab
  "SIS503L": { prerequisites: ["SIS401", "SIS401L"], corequisites: ["SIS503"] }, // IS I ↔ Lab IS I ← ED II y Lab

  "SIS602": { prerequisites: ["SIS503", "SIS503L"] }, // IS II ← IS I y Lab
  "SIS602L": { prerequisites: ["SIS503", "SIS503L"], corequisites: ["SIS602"] }, // IS II ↔ Lab IS II ← IS I y Lab

  "SIS703": { prerequisites: ["SIS602", "SIS602L"] }, // IS III ← IS II y Lab
  "SIS703L": { prerequisites: ["SIS602", "SIS602L"], corequisites: ["SIS703"] }, // IS III ↔ Lab IS III ← IS II y Lab

  // Sistemas y Lenguajes
  "SIS601": { prerequisites: ["SIS501"] }, // Estrucutra de Lenguajes ← TC
  "SIS601L": { prerequisites: ["SIS501"], corequisites: ["SIS601"] }, // Estrucutra de Lenguajes ↔ Lab Estrucutra de Lenguajes ← TC

  "SIS603": { prerequisites: ["SIS401", "SIS401L", "SIS502"] }, // SO ← ED II y Lab; Arquitectura
  "SIS603L": { prerequisites: ["SIS401", "SIS401L", "SIS502"], corequisites: ["SIS603"] }, // SO ↔ Lab SO ← ED II y Lab; Arquitectura

  "333-1": { prerequisites: ["SIS601", "SIS601L"] }, // IA ← Estructura de Lenguajes y Lab

  "SIS702": { prerequisites: ["SIS601", "SIS601L"] }, // Distribuidos ← Estructura de Lenguajes y Lab
  "SIS702L": { prerequisites: ["SIS601", "SIS601L"], corequisites: ["SIS702"] }, // Distribuidos ↔ Lab Distribuidos ← Lenguajes y Lab

  // Proyectos y calidad (trámite)
  "SIS803": { prerequisites: ["SIS703", "SIS703L"] }, // Calidad de Software ← IS III y Lab

  "346-1": { prerequisites: ["SIS703", "SIS703L"] }, // Proyecto I ← IS III y Lab
  "SIS902": { prerequisites: ["346-1"] }, // Proyecto II ← Proyecto I

  "SIS901": { prerequisites: ["SIS703", "SIS703L"] }, // Gestión de Proyectos Informaticos ← IS III y Lab

};

// =========================
// REGLAS GLOBALES (institucionales)
// =========================

export const globalRules = {
  // Regla de los 3 semestres:
  // No se puede cursar una materia si se debe alguna
  // con diferencia >= 3 semestres (excepto FISH, Inglés y Deporte)
  semesterGapLimit: 3,

  semesterGapExceptionsCategories: [
    "humanistica",       // Inglés, deporte, lectura, ética
    "requisito_grado"    // requisitos globales
  ],

  // Electivas
  electives: {
    minSemester: 7,
    requiresAllPreviousApproved: true
  }
};
