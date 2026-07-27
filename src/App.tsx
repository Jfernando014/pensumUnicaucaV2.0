import { pensum } from "./data/pensum";
import type { Subject } from "./data/pensum";
import SubjectCard from "./components/SubjectCard";
import { useEffect, useState, useRef } from "react";
import { subjectRequirements, globalRules } from "./data/requisitos";
import "./App.css";

function App() {
  // Agrupar materias por semestre
  const semesters: Record<number, Subject[]> = {};

  pensum.forEach((subject) => {
    if (!semesters[subject.semester]) {
      semesters[subject.semester] = [];
    }
    semesters[subject.semester].push(subject);
  });

  // Modos de interaccion
  const [interactionMode, setInteractionMode] = useState<"approve" | "inProgress">("approve");

  // Carga proceso desde localStorage
  const [approvedSubjects, setApprovedSubjects] = useState<Record<string, boolean>>({});
  const [inProgressSubjects, setInProgressSubjects] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedApp = localStorage.getItem("approvedSubjects");
    if (storedApp) {
      setApprovedSubjects(JSON.parse(storedApp));
    }
    const storedInProg = localStorage.getItem("inProgressSubjects");
    if (storedInProg) {
      setInProgressSubjects(JSON.parse(storedInProg));
    }
  }, []);

  // Guardar progeso automaticamente
  useEffect(() => {
    localStorage.setItem("approvedSubjects", JSON.stringify(approvedSubjects));
  }, [approvedSubjects]);

  useEffect(() => {
    localStorage.setItem("inProgressSubjects", JSON.stringify(inProgressSubjects));
  }, [inProgressSubjects]);

  // Funcion para alternar estado
  function toggleApproved(code: string) {
    if (interactionMode === "approve") {
      setApprovedSubjects((prev) => {
        const next = { ...prev, [code]: !prev[code] };
        // Si apruebo, quitar de en curso automáticamente
        if (next[code]) {
          setInProgressSubjects(p => {
            const np = { ...p };
            delete np[code];
            return np;
          });
        }
        return next;
      });
    } else {
      setInProgressSubjects((prev) => {
        // No permitir poner en curso si ya está aprobada
        if (approvedSubjects[code]) return prev;
        return { ...prev, [code]: !prev[code] };
      });
    }
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

  // Efecto Confeti al llegar al 100%
  useEffect(() => {
    if (progressPercent === 100) {
      const fireConfetti = () => {
        const duration = 4 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          (window as any).confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });
          (window as any).confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });
        }, 250);
      };

      if ((window as any).confetti) {
        fireConfetti();
      } else {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
        script.onload = fireConfetti;
        document.body.appendChild(script);
      }
    }
  }, [progressPercent]);

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
            // Quitamos de en curso si existía
            setInProgressSubjects(p => {
              const np = { ...p };
              delete np[s.code];
              return np;
            });
          }
        }
      });

      return updated;
    });
  }

  // DESMARCAR TODO
  function resetAll() {
    setApprovedSubjects({});
    setInProgressSubjects({});
  }

  // Hover
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  // Scroll horizontal
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Si el desplazamiento es puramente vertical, lo convertimos a horizontal
      // Esto permite que el mouse wheel normal desplace los semestres de lado a lado
      if (e.deltaY !== 0 && e.deltaX === 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand-container">
          <img src="/logo.png" alt="Logo Unicauca" className="app-logo" />
          <h1 className="app-title">Pensum Unicauca</h1>
        </div>
        {/* Dos botones para desktop */}
        <div className="mode-toggle desktop-only">
          <button
            className={`mode-btn ${interactionMode === 'approve' ? 'active' : ''}`}
            onClick={() => setInteractionMode('approve')}
          >
            Aprobando
          </button>
          <button
            className={`mode-btn ${interactionMode === 'inProgress' ? 'active' : ''}`}
            onClick={() => setInteractionMode('inProgress')}
          >
            Cursando
          </button>
        </div>
        {/* Botón único toggle para móvil */}
        <button
          className={`mode-btn-single mobile-only ${interactionMode === 'approve' ? 'approve' : 'in-progress'}`}
          onClick={() => setInteractionMode(interactionMode === 'approve' ? 'inProgress' : 'approve')}
        >
          {interactionMode === 'approve' ? 'Aprobando' : 'Cursando'}
        </button>
        <select className="program-selector">
          <option value="sistemas">Ingeniería de Sistemas</option>
          {/* Futuros programas se agregarán aquí */}
        </select>
      </header>

      <main className="main-content">
        <div className="semesters-container" ref={scrollRef}>
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
                        inProgress={!!inProgressSubjects[subject.code]}
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
            {progressPercent === 100 ? (
              <span className="celebration-text">🎉 ¡Has completado el pensum! 🎓🏆</span>
            ) : (
              <>Créditos Obtenidos: <strong>{approvedCredits}</strong> / {totalCredits}</>
            )}
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="progress-percent-text">{progressPercent}%</span>
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
