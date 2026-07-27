import type { Subject } from "../data/pensum";

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

const categoryColors: Record<string, string> = {
  complementaria: "rgba(100, 191, 255, 1)",       // azul 
  aplicada: "rgba(122, 184, 128, 1)",             // verde 
  electiva: "rgba(73, 177, 84, 1)",               // verde opaco
  basicas: "rgba(255, 204, 123, 1)",              // naranja amarilloso
  basicas_ingenieria: "rgba(167, 112, 175, 1)",   // morado 
  requisito_grado: "rgba(243, 110, 96, 1)",       // rojo 
};



function SubjectCard({ subject, approved, enabled, reason, onToggle, setHoveredSubject,
                        isPrereq, isUnlockedBy, isCoreq }: Props) {
    const isBlocked = !enabled && !approved;
    const baseColor = categoryColors[subject.category];
    
    return (
        <div
        onClick={() => enabled && onToggle(subject.code)}

        onMouseEnter={() => setHoveredSubject(subject.code)}
        onMouseLeave={() => setHoveredSubject(null)}

        style={{
            position: "relative",

            background: baseColor,

            opacity: approved ? 0.30 : isBlocked ? 0.60 : 1,

            border: approved
            ? "3px solid rgba(46, 125, 50, 1)"
            : isBlocked
            ? "1px dashed rgba(183, 28, 28, 1)"
            : "2px solid rgba(85, 85, 85, 1)",
            

            filter: isBlocked ? "grayscale(50%)" : "none",

            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            cursor: enabled ? "pointer" : "not-allowed",

            boxShadow: isPrereq
                ? "0 0 0 3px rgba(30,136,229,0.8)"   // azul: prerrequisito
                : isUnlockedBy
                ? "0 0 0 3px rgba(46,125,50,0.8)"    // verde: desbloquea
                : isCoreq
                ? "0 0 0 3px rgba(123,31,162,0.85)"   // morado (coreq)
                : "none",
        }}
        >
        <strong>{subject.name}</strong>
        <div style={{ fontSize: "12px", opacity: 0.7 }}>
            Código: {subject.code}
        </div>
            <div style={{ fontSize: "12px" }}></div>
            {subject.credits} créditos
            <div style={{ fontSize: "12px", marginTop: "4px" }}>
            {!approved && enabled && "Disponible"}
            {isBlocked && `Bloqueada: ${reason}`}
            </div>
            {!enabled && (
            <div style={{ fontSize: "11px", marginTop: "4px", color: "rgba(0, 0, 0, 1)" }}>
                🔒 {reason}
            </div>
            )}
        </div>
    );
}

export default SubjectCard;
