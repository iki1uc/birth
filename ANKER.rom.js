        ANKER
          │
   ┌──────┼──────┐
   │      │      │
 CORE   SCAN    TMP
81.rom 81.scan 81.tmp
   │      │      │
 VIDEO  SUBTMP  ROOM
81.video 9.tmp  NO1.room
   │      │      │
        OPERATOR
         TMP.tmp
          │
       ACTIVE
// #ANKER · RICHTIGER CODEX
const ANKER = {
  CORE: "81.rom",
  SCAN: "81.scan",
  TMP: "81.tmp",
  VIDEO: "81.video",
  SUBTMP: "9.tmp",
  ROOM: "NO1.room",
  OPERATOR: "TMP.tmp",
  STATE: "ACTIVE"
};

function eco() {
  console.log("ECO: ANKER ACTIVE - " + ANKER.CORE + " + " + ANKER.SCAN);
  console.log("FUNKTION: CORE + SCAN + TMP + VIDEO");
}
eco();
