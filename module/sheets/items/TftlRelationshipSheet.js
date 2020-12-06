export default class TftlRelationshipSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 500,
            height: 300,
            classes: ["tftl","sheet","item"]
        })
    }

    get template(){
        return "systems/foundry-tftl/templates/sheets/items/relationship-sheet.hbs"
    }
}