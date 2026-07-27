import type { Subject } from "../data/pensum";
import "./SubjectCard.css";

type Props = {
  subject: Subject;
  approved: boolean;
  inProgress: boolean;
  enabled: boolean;
  reason?: string;
  onToggle: (code: string) => void;
  hoveredSubject: string | null;
  setHoveredSubject: (code: string | null) => void;
  isPrereq: boolean;
  isUnlockedBy: boolean;
  isCoreq: boolean;
};

function SubjectCard({ subject, approved, inProgress, enabled, reason, onToggle, hoveredSubject, setHoveredSubject,
                        isPrereq, isUnlockedBy, isCoreq }: Props) {
    const isBlocked = !enabled && !approved;
    const isHovered = hoveredSubject === subject.code;
    
    // Determinar las clases a aplicar
    const classNames = ["subject-card"];
    if (approved) classNames.push("status-approved");
    else if (inProgress) classNames.push("status-in-progress");

    if (isBlocked) classNames.push("status-blocked");
    
    if (isHovered) {
        classNames.push("highlight-focus");
    } else if (isPrereq || isUnlockedBy || isCoreq) {
        classNames.push("highlight-related");
    }
    
    return (
        <div
            className={classNames.join(" ")}
            onClick={() => enabled && onToggle(subject.code)}
            onMouseEnter={() => setHoveredSubject(subject.code)}
            onMouseLeave={() => setHoveredSubject(null)}
        >
            <div className="card-header">
                <span className="subject-code">{subject.code}</span>
                {!approved && !inProgress && enabled && (
                    <span className="badge badge-available">DISPONIBLE</span>
                )}
                {!approved && inProgress && (
                    <span className="badge badge-encurso">EN CURSO</span>
                )}
                {isBlocked && (
                    reason === "No cumple prerrequisitos" ? (
                        <span className="badge badge-locked-reason">🔒 NO CUMPLE PRERREQUISITOS</span>
                    ) : (
                        <span className="badge badge-locked">🔒</span>
                    )
                )}
            </div>
            
            <div className="subject-name">{subject.name}</div>
            <div className="subject-credits">{subject.credits} {subject.credits === 1 ? 'crédito' : 'créditos'}</div>
        </div>
    );
}

export default SubjectCard;
