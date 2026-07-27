import type { Subject } from "../data/pensum";
import "./SubjectCard.css";

type Props = {
  subject: Subject;
  approved: boolean;
  enabled: boolean;
  reason?: string;
  onToggle: (code: string) => void;
  hoveredSubject: string | null;
  setHoveredSubject: (code: string | null) => void;
  isPrereq: boolean;
  isUnlockedBy: boolean;
  isCoreq: boolean;
};

// Mapeo de categorías a variables CSS (definidas en index.css)
const categoryVariables: Record<string, string> = {
  complementaria: "var(--cat-complementaria)",       
  aplicada: "var(--cat-aplicada)",             
  electiva: "var(--cat-electiva)",               
  basicas: "var(--cat-basicas)",              
  basicas_ingenieria: "var(--cat-basicas_ingenieria)",   
  requisito_grado: "var(--cat-requisito_grado)",       
};

function SubjectCard({ subject, approved, enabled, reason, onToggle, setHoveredSubject,
                        isPrereq, isUnlockedBy, isCoreq }: Props) {
    const isBlocked = !enabled && !approved;
    const baseColor = categoryVariables[subject.category];
    
    // Determinar las clases a aplicar
    const classNames = ["subject-card"];
    if (approved) classNames.push("status-approved");
    if (isBlocked) classNames.push("status-blocked");
    
    if (isPrereq) classNames.push("highlight-prereq");
    if (isUnlockedBy) classNames.push("highlight-unlockedBy");
    if (isCoreq) classNames.push("highlight-coreq");
    
    return (
        <div
            className={classNames.join(" ")}
            onClick={() => enabled && onToggle(subject.code)}
            onMouseEnter={() => setHoveredSubject(subject.code)}
            onMouseLeave={() => setHoveredSubject(null)}
            style={{ "--card-color": baseColor } as React.CSSProperties}
        >
            <span className="subject-code">{subject.code}</span>
            <div className="subject-name">{subject.name}</div>
            <div className="subject-credits">{subject.credits} créditos</div>
            
            {!approved && enabled && (
                <div className="subject-badge badge-available">Disponible</div>
            )}
            
            {isBlocked && (
                <div className="subject-badge badge-blocked">
                    🔒 {reason}
                </div>
            )}
        </div>
    );
}

export default SubjectCard;
