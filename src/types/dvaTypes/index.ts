import { ResolverModels } from "dva-type";
import h5_model_type from "./h5_model_type";

type Models = {
  h5_model_type: h5_model_type;
};
type StateType = ResolverModels<Models>["state"];
type ActionsType = ResolverModels<Models>["actions"];

export {
    StateType,
    ActionsType
}