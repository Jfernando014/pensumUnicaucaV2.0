// Pensum Ingeniería de Sistemas – Base estructural
// Prerrequisitos y corequisitos se completarán posteriormente*

export type SubjectCategory =
| "basicas"
| "basicas_ingenieria"
| "aplicada"
| "electiva"
| "complementaria"
| "requisito_grado";


export type Subject = {
code: string;
name: string;
semester: number;
credits: number;
prerequisites: string[];
corequisites: string[];
category: SubjectCategory;
};


export const pensum: Subject[] = [
// =========================
// SEMESTRE 1
// =========================
{ code: "11465", 
name: "Cálculo I", 
semester: 1, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "11479", 
name: "Introducción a la Ingeniería de Sistemas", 
semester: 1, 
credits: 1, 
prerequisites: [], 
corequisites: [], 
category: "basicas_ingenieria" },

{ code: "11477", 
name: "Introducción a la Informática", 
semester: 1, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "basicas_ingenieria" },

{ code: "11478", 
name: "Laboratorio de Introducción a la Informática", 
semester: 1, 
credits: 1, 
prerequisites: [], 
corequisites: [], 
category: "basicas_ingenieria" },

{ code: "21505", 
name: "Lectura y Escritura", 
semester: 1, 
credits: 2, 
prerequisites: [], 
corequisites: [], 
category: "complementaria" },


// =========================
// SEMESTRE 2
// =========================
{ code: "307", 
name: "Álgebra Lineal", 
semester: 2, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "311-1", 
name: "Cálculo II", 
semester: 2, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "312-1", 
name: "Mecánica", 
semester: 2, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "318-1", 
name: "Laboratorio de Mecánica", 
semester: 2, 
credits: 1, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "SIS201", 
name: "Programación Orientada a Objetos", 
semester: 2, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS201-L"], 
category: "aplicada" },

{ code: "SIS201-L", 
name: "Laboratorio de Programación Orientada a Objetos", 
semester: 2, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS201"], 
category: "aplicada" },


// =========================
// SEMESTRE 3
// =========================
{ code: "316-1", 
name: "Cálculo III", 
semester: 3, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "317-1", 
name: "Electromagnetismo", 
semester: 3, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "329-1", 
name: "Laboratorio de Electromagnetismo", 
semester: 3, 
credits: 1, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "SIS301", 
name: "Estructuras de Datos I", 
semester: 3, 
credits: 3, 
prerequisites: [], 
corequisites: ["10153"], 
category: "aplicada" },

{ code: "10153", 
name: "Laboratorio de Estructuras de Datos I", 
semester: 3, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS301"], 
category: "aplicada" },


// =========================
// SEMESTRE 4
// =========================
{ code: "322-1", 
name: "Ecuaciones Diferenciales Ordinarias", 
semester: 4, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "323-1", 
name: "Vibraciones y Ondas", 
semester: 4, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "basicas" },

{ code: "SIS401", 
name: "Estructuras de Datos II", 
semester: 4, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS401L"], 
category: "aplicada" },

{ code: "SIS401L", 
name: "Laboratorio de Estructuras de Datos II", 
semester: 4, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS401"], 
category: "aplicada" },

{ code: "SIS402", 
name: "Bases de Datos I", 
semester: 4, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS402L"], 
category: "aplicada" },

{ code: "SIS402L", 
name: "Laboratorio de Bases de Datos I", 
semester: 4, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS402"], 
category: "aplicada" },


// =========================
// SEMESTRE 5
// =========================
{ code: "328-1", 
name: "Análisis Numérico", 
semester: 5, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "basicas_ingenieria" },

{ code: "SIS501", 
name: "Teoría de la Computación", 
semester: 5, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "basicas_ingenieria" },

{ code: "SIS502", 
name: "Arquitectura Computacional", 
semester: 5, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "aplicada" },

{ code: "SIS503", 
name: "Ingeniería de Software I", 
semester: 5, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS503L"], 
category: "aplicada" },

{ code: "SIS503L", 
name: "Laboratorio de Ingeniería de Software I", 
semester: 5, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS503"], 
category: "aplicada" },

{ code: "SIS504", 
name: "Bases de Datos II", 
semester: 5, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS504L"], 
category: "aplicada" },

{ code: "SIS504L", 
name: "Laboratorio de Bases de Datos II", 
semester: 5, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS504"], 
category: "aplicada" },


// =========================
// SEMESTRE 6
// =========================
{ code: "MAT131", 
name: "Estadística y Probabilidad", 
semester: 6, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "basicas_ingenieria" },

{ code: "SIS601", 
name: "Estructura de Lenguajes", 
semester: 6, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS601L"], 
category: "aplicada" },

{ code: "SIS601L", 
name: "Laboratorio de Estructura de Lenguajes", 
semester: 6, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS601"], 
category: "aplicada" },

{ code: "SIS602", 
name: "Ingeniería de Software II", 
semester: 6, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS602L"], 
category: "aplicada" },

{ code: "SIS602L", 
name: "Laboratorio de Ingeniería de Software II", 
semester: 6, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS602"], 
category: "aplicada" },

{ code: "SIS603", 
name: "Sistemas Operativos", 
semester: 6, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS603L"], 
category: "aplicada" },

{ code: "SIS603L", 
name: "Laboratorio de Sistemas Operativos", 
semester: 6, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS603"], 
category: "aplicada" },


// =========================
// SEMESTRE 7
// =========================
{ code: "SIS706", 
name: "Teoría y Dinámica de Sistemas", 
semester: 7, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "basicas_ingenieria" },

{ code: "SIS801", 
name: "Metodología de la Investigación", 
semester: 7, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "basicas_ingenieria" },

{ code: "333-1", 
name: "Inteligencia Artificial", 
semester: 7, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "aplicada" },

{ code: "SIS702", 
name: "Sistemas Distribuidos", 
semester: 7, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS702L"], 
category: "aplicada" },

{ code: "SIS702L", 
name: "Laboratorio de Sistemas Distribuidos", 
semester: 7, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS702"], 
category: "aplicada" },

{ code: "SIS703", 
name: "Ingeniería de Software III", 
semester: 7, 
credits: 3, 
prerequisites: [], 
corequisites: ["SIS703L"], 
category: "aplicada" },

{ code: "SIS703L", 
name: "Laboratorio de Ingeniería de Software III", 
semester: 7, 
credits: 1, 
prerequisites: [], 
corequisites: ["SIS703"], 
category: "aplicada" },


// =========================
// SEMESTRE 8
// =========================
{ code: "338", 
name: "Investigación de Operaciones", 
semester: 8, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "basicas_ingenieria" },

{ code: "346-1", 
name: "Proyecto I", 
semester: 8, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "aplicada" },

{ code: "SIS803", 
name: "Calidad de Software", 
semester: 8, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "aplicada" },

{ code: "357", 
name: "Electiva I", 
semester: 8, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "electiva" },

{ code: "360", 
name: "Electiva II", 
semester: 8, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "electiva" },

{ code: "TLM815", 
name: "Redes", 
semester: 8, 
credits: 4, 
prerequisites: [], 
corequisites: [], 
category: "aplicada" },


// =========================
// SEMESTRE 9
// =========================
{ code: "361", 
name: "Electiva III", 
semester: 9, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "electiva" },

{ code: "362", 
name: "Electiva IV", 
semester: 9, 
credits: 3, 
prerequisites: [],
corequisites: [], 
category: "electiva" },

{ code: "SIS902", 
name: "Proyecto II", 
semester: 9, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "aplicada" },

{ code: "SIS901", 
name: "Gestión de Proyectos Informáticos", 
semester: 9, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "aplicada" },

{ code: "PIS110", 
name: "Fundamentos de Economía", 
semester: 9, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "complementaria" },

{ code: "344", 
name: "Gestión Empresarial", 
semester: 9, 
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "complementaria" },

{ code: "351", 
name: "Legislación Laboral", 
semester: 9, 
credits: 1, 
prerequisites: [], 
corequisites: [], 
category: "complementaria" },


// =========================
// SEMESTRE 10
// =========================
{ code: "363", 
name: "Electiva V", 
semester: 10,
credits: 3, 
prerequisites: [], 
corequisites: [], 
category: "electiva" },

{ code: "313-9", 
name: "Ética", 
semester: 10, 
credits: 2, 
prerequisites: [], 
corequisites: [], 
category: "complementaria" },

{ code: "353", 
name: "Trabajo de Grado", 
semester: 10, 
credits: 14, 
prerequisites: [], 
corequisites: [], 
category: "requisito_grado" },
];