import {EquipmentStateKeys, EquipmentStateType} from "@/state/EquipmentState"
import {State} from "@hookstate/core"

export const combineEquipment = (equipment: State<EquipmentStateType>) => {
  return EquipmentStateKeys
    .flatMap((key) => Object.values(equipment.nested(key).get()))
}