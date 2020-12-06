import { TFTL } from "../../config.js";
import { RollData } from "../../dice/RollData.js";

export default class TftlActorPcSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 800,
      height: 600,
      classes: ["tftl", "sheet", "pc"],
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description",
        },
      ],
    });
  }

  constructor(...args) {
    super(...args);
  }

  get template() {
    return "systems/foundry-tftl/templates/sheets/actors/pc-sheet.hbs";
  }

  getData() {
    const sheetData = super.getData();
    sheetData.config = CONFIG.TFTL;
    this._setComputedValuesData(sheetData);
    return sheetData;
  }

  onSkillRoll(actor, attribute, skill) {
    const actorAttribute = actor.attributes[attribute];
    const actorSkill = actorAttribute.skills[skill];
    const rollData = new RollData();
    rollData.isExhausted = actor.conditions.exhausted;
    rollData.isInjured = actor.conditions.injured;
    rollData.isScared = actor.conditions.scared;
    rollData.isUpset = actor.conditions.upset;
    rollData.isBroken = actor.conditions.broken;
    rollData.nbDice = actorAttribute.current + actorSkill.value;
    const roll = rollData.getRoll();
    roll.roll();
    roll.toMessage(
      {
        speaker: ChatMessage.getSpeaker(),
        messageData: {
          special: false,
          text: "LANCER",
          flavor: roll.result,
          color: 0x000000,
        }
      },
      {
        rollMode: rollData.rollMode,
      }
    );
  }

  _setComputedValuesData(sheetData) {
    sheetData.conditions = Object.entries(sheetData.actor.data.conditions).map(
      ([key, value]) => {
        return {
          name: key,
          label: TFTL.conditions[key],
          isChecked: value,
        };
      }
    );

    sheetData.attributes = Object.entries(sheetData.actor.data.attributes).map(
      ([key, attribute]) => {
        return {
          name: key,
          label: TFTL.attributes[key],
          value: attribute.current,
          skills: Object.entries(attribute.skills).map(([skillKey, skill]) => {
            return {
              name: skillKey,
              label: TFTL.skills[skillKey],
              value: skill.value,
              max: skill.max,
            };
          }),
        };
      }
    );
  }

  activateListeners(html) {
    super.activateListeners(html);
    const attributesTable = html.find(".pc-sheet__attributes");
    // attributesTable.on("click", ".skill-roll",(evt) => console.log(evt));
    attributesTable.on("click", ".skill-roll", (evt) =>
      this.onSkillRoll(
        this.object.data.data,
        evt.currentTarget.attributes[2].value,
        evt.currentTarget.attributes[3].value
      )
    );
  }
}
