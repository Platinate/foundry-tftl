import { TFTL } from "./module/config.js";
import TftlActorPcSheet from "./module/sheets/actors/TftlActorPcSheet.js";
import TftlItemSheet from "./module/sheets/items/TftlItemSheet.js";
import TftlRelationshipSheet from "./module/sheets/items/TftlRelationshipSheet.js";

Hooks.once("init", () => {
  console.log("Tftl | Initializing Tales from the loop System");

  CONFIG.TFTL = TFTL;

  //ITEMS
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("tftl", TftlRelationshipSheet, {
    types: ["relationship"],
    makeDefault: true,
  });
  Items.registerSheet("tftl", TftlItemSheet, {
    types: ["item"],
    makeDefault: true,
  });

  //ACTORS
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("tftl", TftlActorPcSheet, {
    types: ["pc"],
    makeDefault: true,
  });
});
