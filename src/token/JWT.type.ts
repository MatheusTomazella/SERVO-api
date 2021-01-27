import { ComponentType } from "../types/Component.type";
import { DatabaseIndex } from "../types/Database.type";

export type TokenPayload = {_id:DatabaseIndex, type?:ComponentType};