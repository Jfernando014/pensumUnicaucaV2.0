import { pensum } from "./data/pensum";
import type { Subject } from "./data/pensum";
import SubjectCard from "./components/SubjectCard";
import { useEffect, useState } from "react";
import { subjectRequirements, globalRules } from "./data/requisitos";

function App() {
  // Agrupar materias por semestre
  const semesters: Record<number, Subject[]> = {};

  pensum.forEach((subject) => {
    if (!semesters[subject.semester]) {
      semesters[subject.semester] = [];
    }
    semesters[subject.semester].push(subject);
  });

  // Carga proceso desde localStorage
  const [approvedSubjects, setApprovedSubjects] = useState<Record<string, boolean>>({});

  useEffect(() => {
  const stored = localStorage.getItem("approvedSubjects");
  if (stored) {
    setApprovedSubjects(JSON.parse(stored));
  }
  }, []);

  // Guardar progeso automaticamente
  useEffect(() => {
  localStorage.setItem("approvedSubjects", JSON.stringify(approvedSubjects));
  }, [approvedSubjects]);

  // Funcion para alternar estado
  function toggleApproved(code: string) {
  setApprovedSubjects((prev) => ({
    ...prev,
    [code]: !prev[code],
  }));
  }

  // Logica para cumplir requisitos
  // Prerequisitos
  function hasPrerequisites(subjectCode: string): boolean {
  const req = subjectRequirements[subjectCode];
  if (!req?.prerequisites) return true;

  return req.prerequisites.every(
    (code) => approvedSubjects[code]
  );
  }

  // Corequisitos
  function hasCorequisites(subjectCode: string): boolean {
  const req = subjectRequirements[subjectCode];
  if (!req?.corequisites) return true;

  return req.corequisites.every(
    (code) => approvedSubjects[code] || approvedSubjects[subjectCode]
  );
  }

  // Regla 3 semestres :(
  function violatesSemesterGap(subjectSemester: number): boolean {
  return pensum.some((s) => {
    if (
      approvedSubjects[s.code] ||
      globalRules.semesterGapExceptionsCategories.includes(s.category)
    ) {
      return false;
    }

    return subjectSemester - s.semester >= globalRules.semesterGapLimit;
  });
  }

  // Electivas >= 7°
  function violatesElectiveRule(subject: Subject): boolean {
  if (subject.category !== "electiva") return false;
  if (subject.semester < globalRules.electives.minSemester) return true;

  return pensum.some(
    (s) =>
      s.semester < globalRules.electives.minSemester &&
      !approvedSubjects[s.code]
  );
  }

  // Funcion central, está habilitada ¿?
  function isEnabled(subject: Subject): { enabled: boolean; reason?: string } {
  if (!hasPrerequisites(subject.code)) {
    return { enabled: false, reason: "No cumple prerrequisitos" };
  }

  if (violatesSemesterGap(subject.semester)) {
    return { enabled: false, reason: "Regla de los 3 semestres" };
  }

  if (violatesElectiveRule(subject)) {
    return { enabled: false, reason: "Regla especial de electivas" };
  }

  return { enabled: true };
  }

  // Funcion calculo creditos
  const totalCredits = pensum.reduce(
    (sum, subject) => sum + subject.credits,
    0
  );

  const approvedCredits = pensum.reduce((sum, subject) => {
    if (approvedSubjects[subject.code]) {
      return sum + subject.credits;
    }
    return sum;
  }, 0);

  const progressPercent =
    totalCredits === 0
      ? 0
      : Math.round((approvedCredits / totalCredits) * 100);

  // Funcion que valida si una materia puede estar aprobada
  function canRemainApproved(subject: Subject): boolean {
    return (
      hasPrerequisites(subject.code) &&
      hasCorequisites(subject.code) &&
      !violatesSemesterGap(subject.semester) &&
      !violatesElectiveRule(subject)
    );
  }

  // Efecto de limpieza cuando se desmarca
  useEffect(() => {
    setApprovedSubjects((prev) => {
      const updated = { ...prev };
      let changed = false;

      pensum.forEach((subject) => {
        if (updated[subject.code]) {
          if (!canRemainApproved(subject)) {
            delete updated[subject.code];
            changed = true;
          }
        }
      });

      return changed ? updated : prev;
    });
  }, [approvedSubjects]);

  // MARCAR/DESMARCAR
  function toggleSemester(semester: number) {
    setApprovedSubjects((prev) => {
      const updated = { ...prev };

      const subjects = pensum.filter(
        (s) => s.semester === semester
      );

      const allApproved = subjects.every(
        (s) => updated[s.code]
      );

      subjects.forEach((s) => {
        if (allApproved) {
          delete updated[s.code];
        } else {
          if (isEnabled(s).enabled) {
            updated[s.code] = true;
          }
        }
      });

      return updated;
    });
  }

  // DESMARCAR TODO
  function resetAll() {
    setApprovedSubjects({});
  }

  // Hover
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Pensum Unicauca</h1>
        <select className="program-selector">
          <option value="sistemas">Ingeniería de Sistemas</option>
          {/* Futuros programas se agregarán aquí */}
        </select>
      </header>

      <main className="main-content">
        <div className="semesters-container">
          {Object.keys(semesters)
            .map(Number)
            .sort((a, b) => a - b)
            .map((semester) => (
              <div key={semester} className="semester-col">
                <div className="semester-header">
                  <h2 className="semester-title">Semestre {semester}</h2>
                  <div 
                    className={`semester-toggle ${semesters[semester].every(s => approvedSubjects[s.code]) ? 'active' : ''}`}
                    onClick={() => toggleSemester(semester)}
                    title="Marcar todo el semestre"
                  />
                </div>
                
                <div className="subjects-list">
                  {semesters[semester].map((subject) => {
                    const status = isEnabled(subject);

                    const isPrereq =
                      hoveredSubject !== null &&
                      subjectRequirements[hoveredSubject]?.prerequisites?.includes(subject.code);

                    const isUnlockedBy =
                      hoveredSubject !== null &&
                      subjectRequirements[subject.code]?.prerequisites?.includes(hoveredSubject);

                    const isCoreq =
                      hoveredSubject !== null &&
                      (
                        subjectRequirements[hoveredSubject]?.corequisites?.includes(subject.code) ||
                        subjectRequirements[subject.code]?.corequisites?.includes(hoveredSubject)
                      );

                    return (
                      <SubjectCard
                        key={subject.code}
                        subject={subject}
                        approved={!!approvedSubjects[subject.code]}
                        onToggle={toggleApproved}
                        enabled={status.enabled}
                        reason={status.reason}
                        hoveredSubject={hoveredSubject}
                        setHoveredSubject={setHoveredSubject}
                        isPrereq={!!isPrereq}
                        isUnlockedBy={!!isUnlockedBy}
                        isCoreq={!!isCoreq}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </main>

      <footer className="app-footer">
        <div className="progress-container">
          <div className="progress-stats">
            Créditos Obtenidos: <strong>{approvedCredits}</strong> / {totalCredits}
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <button className="reset-btn" onClick={resetAll}>
          Reiniciar progreso
        </button>
      </footer>
    </div>
  );  
}

export default App;
