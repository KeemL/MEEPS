import { FC, useState } from "react";
import { Tooltip } from "@mui/material";
import { useFilterSet } from "./FilterSetProvider";

const riskExplanations: Record<string, string> = {
  Pollen: "Pollen can trigger seasonal allergies and respiratory issues.",
  "Air Pollution":
    "Air pollution contains harmful substances that can affect respiratory and cardiovascular health.",
  "Noise Pollution":
    "Noise pollution can lead to stress, hearing issues, and disrupted sleep.",
};

const InfoToolbar: FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const { filterSet } = useFilterSet();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: expanded ? 300 : 50,
        backgroundColor: "black",
        boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        transition: "width 0.3s ease-in-out",
        overflow: "hidden",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tooltip
        title="Click the arrow to expand this panel for more information"
        arrow
        placement="left"
        open={showTooltip}
      >
        <button
          onClick={() => {
            setExpanded(!expanded);
            setShowTooltip(false);
          }}
          style={{
            alignSelf: "flex-start",
            margin: "8px",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            color: "white",
          }}
        >
          {expanded ? "<" : ">"}
        </button>
      </Tooltip>
      {expanded && (
        <div style={{ padding: "16px", color: "white" }}>
          <h3 className="text-xl font-bold mb-5">Your Risks</h3>
          {Array.from(filterSet).map((risk) => (
            <div key={risk} style={{ marginBottom: "12px" }}>
              <h2 className="text-lg mb-5" style={{ margin: 0 }}>
                {risk}
              </h2>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                {riskExplanations[risk]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoToolbar;